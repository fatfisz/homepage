'use strict';

const { Parser } = require('commonmark');

const codeBlockRenderer = require('./code-block-renderer');
const Renderer = require('./renderer');


const parser = new Parser();
const renderer = new Renderer({
  renderers: {
    code_block: codeBlockRenderer,
  },
});

module.exports = function renderMarkdown(markdown) {
  const ast = parser.parse(markdown);
  return renderer.render(ast);
};
