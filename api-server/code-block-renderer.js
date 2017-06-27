'use strict';

// This needs to be imported first to change node's require cache
const CodeMirror = require('codemirror/addon/runmode/runmode.node');

require('codemirror/mode/css/css');
require('codemirror/mode/django/django');
require('codemirror/mode/htmlembedded/htmlembedded');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/xml/xml');


const whitespaceRegExp = /\s+/g;

function styleToClassName(style) {
  return style
    .split(whitespaceRegExp)
    .map(part => `cm-${part}`)
    .join(' ');
}

const typeToMIME = {
  css: 'css',
  django: 'django',
  erb: 'application/x-erb',
  js: 'javascript',
  jsx: 'jsx',
  json: 'application/json',
  xml: 'xml',
};

function highlight(type, code) {
  const children = [];
  let style = null;
  let acc = '';

  function flush() {
    if (style) {
      children.push({
        type: 'span',
        className: styleToClassName(style),
        children: acc,
      });
    } else if (acc) {
      children.push(acc);
    }
  }

  CodeMirror.runMode(code, typeToMIME[type], (text, nextStyle) => {
    if (nextStyle !== style) {
      flush();
      style = nextStyle;
      acc = text;
    } else {
      acc += text;
    }
  });
  flush();

  return children;
}

module.exports = function codeBlockRenderer({ info, literal }) {
  return {
    type: 'pre',
    className: 'code-example',
    children: highlight(info, literal),
  };
};
