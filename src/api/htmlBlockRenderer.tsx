import { Node } from 'commonmark';
import { RendererElement } from 'commonmark-react-object-renderer';

export function htmlBlockRenderer(html: Node): RendererElement {
  return {
    type: 'div',
    props: {
      dangerouslySetInnerHTML: { __html: html.literal as string },
    },
  };
}
