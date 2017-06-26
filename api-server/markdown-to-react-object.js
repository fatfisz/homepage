'use strict';

const { Parser } = require('commonmark');


const parser = new Parser();

function isParagraphInList(node) {
  return (
    node.type === 'paragraph' &&
    node.parent.parent &&
    node.parent.parent.type === 'list'
  );
}

const selfClosingTypes = ['linebreak', 'softbreak', 'thematic_break'];

function isSelfClosing(type) {
  return selfClosingTypes.includes(type);
}

function pushText(children, text) {
  const { length } = children;

  if (length > 0 && typeof children[length - 1] === 'string') {
    children[length - 1] += text;
  } else {
    children.push(text);
  }
}

function withAttributes(node, element = {}) {
  switch (node.type) {
    case 'block_quote':
      element.type = 'blockquote';
      break;

    case 'code_block':
      element.type = 'pre';
      element['data-is-rendered'] = true;
      if (node.info) {
        element['data-info'] = node.info;
      }
      break;

    case 'document':
      element.type = 'div';
      break;

    case 'emph':
      element.type = 'em';
      break;

    case 'heading':
      element.type = `h${node.level}`;
      break;

    case 'image':
      element.type = 'img';
      element.src = node.destination;
      if (node.title) {
        element.title = node.title;
      }
      break;

    case 'item':
      element.type = 'li';
      break;

    case 'linebreak':
      element.type = 'br';
      break;

    case 'link':
      element.type = 'a';
      element.href = node.destination;
      if (node.title) {
        element.title = node.title;
      }
      break;

    case 'list':
      element.type = node.listType === 'bullet' ? 'ul' : 'ol';
      break;

    case 'paragraph':
      element.type = 'p';
      break;

    case 'thematic_break':
      element.type = 'hr';
      break;

    case 'code':
    case 'strong':
      element.type = node.type;
      break;

    default:
      throw new Error(`Markdown element ${node.type} is not handled!`);
  }

  if (node.literal) {
    element.children = node.literal;
  }

  return element;
}

function simplifyChildren(element) {
  switch (element.children.length) {
    case 0:
      delete element.children;
      break;

    case 1:
      element.children = element.children[0];
  }
}

function exitElement(element) {
  const { parent } = element;
  delete element.parent;
  simplifyChildren(element);
  return parent;
}

function renderNodes(block) {
  const walker = block.walker();
  let element = { children: [] };

  for (;;) {
    const event = walker.next();
    if (!event) {
      break;
    }

    const { entering, node } = event;

    if (!entering) {
      if (isParagraphInList(node)) {
        continue;
      }
      element = exitElement(element);
      continue;
    }

    if (node.isContainer) {
      if (isParagraphInList(node)) {
        node.skip = true;
        continue;
      }
      const containerElement = withAttributes(node, { children: [], parent: element });
      element.children.push(containerElement);
      element = containerElement;
      continue;
    }

    if (!isSelfClosing(node.type)) {
      if (node.type === 'text') {
        pushText(element.children, node.literal);
      } else {
        element.children.push(withAttributes(node));
      }
      continue;
    }

    if (node.type === 'softbreak') {
      pushText(element.children, ' ');
      continue;
    }

    element.children.push(withAttributes(node));
  }

  return element.children[0];
}

module.exports = function markdownToReactObject(markdown) {
  const ast = parser.parse(markdown);
  return renderNodes(ast);
};
