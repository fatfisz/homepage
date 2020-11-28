declare module 'commonmark-react-object-renderer' {
  import { Node, NodeType } from 'commonmark';
  import { ReactDOM } from 'react';

  export interface RendererElement<Type extends keyof ReactDOM = string> {
    type: Type;
    props?: HTMLAttributes<Type>;
    children?: string | RendererElement | (string | RendererElement)[];
  }

  const Renderer: {
    new (options?: {
      renderers: Partial<Record<NodeType, (node: Node, element: unknown) => RendererElement>>;
    });
  };

  export default Renderer;
}
