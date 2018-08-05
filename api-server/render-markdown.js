'use strict';

const { Parser } = require('commonmark');
const Renderer = require('commonmark-react-object-renderer');

const codeBlockRenderer = require('./code-block-renderer');
const htmlBlockRenderer = require('./html-block-renderer');


const parser = new Parser();
const renderer = new Renderer({
  renderers: {
    code_block: codeBlockRenderer,
    html_block: htmlBlockRenderer,
  },
});

module.exports = function renderMarkdown(markdown) {
  const ast = parser.parse(markdown);
  return renderer.render(ast);
};
