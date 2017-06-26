'use strict';

const { Parser } = require('commonmark');
const Renderer = require('./renderer');


const parser = new Parser();
const renderer = new Renderer();

module.exports = function renderMarkdown(markdown) {
  const ast = parser.parse(markdown);
  return renderer.render(ast);
};
