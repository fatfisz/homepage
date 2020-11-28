import { Parser } from 'commonmark';
import Renderer from 'commonmark-react-object-renderer';

import { codeBlockRenderer } from './codeBlockRenderer';
import { htmlBlockRenderer } from './htmlBlockRenderer';

const parser = new Parser();
const renderer = new Renderer({
  renderers: {
    code_block: codeBlockRenderer,
    html_block: htmlBlockRenderer,
  },
});

export function renderMarkdown(markdown: string): string {
  const ast = parser.parse(markdown);
  return renderer.render(ast);
}
