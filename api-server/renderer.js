'use strict';

const selfClosingTypes = ['linebreak', 'softbreak', 'thematic_break'];

module.exports = class Renderer {
  constructor(options = {}) {
    this.options = options;
  }

  isParagraphInList() {
    return (
      this.node.type === 'paragraph' &&
      this.node.parent.parent &&
      this.node.parent.parent.type === 'list'
    );
  }

  isSelfClosing() {
    return selfClosingTypes.includes(this.node.type);
  }

  pushText(text) {
    const { children } = this.element;
    const { length } = children;

    if (length > 0 && typeof children[length - 1] === 'string') {
      children[length - 1] += text;
    } else {
      children.push(text);
    }
  }

  currentNodeToElement(element = {}) {
    const { node } = this;

    if (this.options.renderers && this.options.renderers[node.type]) {
      return this.options.renderers[node.type](node);
    }

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

  * walk(ast) {
    const walker = ast.walker();

    for (;;) {
      const event = walker.next();
      if (event) {
        yield event;
      } else {
        break;
      }
    }
  }

  get element() {
    return this.stack[this.stack.length - 1];
  }

  get parent() {
    return this.stack[this.stack.length - 2];
  }

  render(ast) {
    this.stack = [{ children: [] }];

    for (const event of this.walk(ast)) {
      this.node = event.node;

      if (this.isParagraphInList()) {
        continue;
      }

      if (!event.entering) {
        this.stack.pop();
        continue;
      }

      if (this.node.isContainer) {
        this.stack.push(this.currentNodeToElement({ children: [] }));
        this.parent.children.push(this.element);
        continue;
      }

      if (!this.isSelfClosing()) {
        if (this.node.type === 'text') {
          this.pushText(this.node.literal);
        } else {
          this.element.children.push(this.currentNodeToElement());
        }
        continue;
      }

      if (this.node.type === 'softbreak') {
        this.pushText(' ');
        continue;
      }

      this.element.children.push(this.currentNodeToElement());
    }

    return this.element.children[0];
  }
};
