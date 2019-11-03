import { Parser } from 'commonmark';
import Renderer from 'commonmark-react-object-renderer';

import codeBlockRenderer from './code-block-renderer';
import htmlBlockRenderer from './html-block-renderer';

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
