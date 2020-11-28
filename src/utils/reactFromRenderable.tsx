import { RendererElement } from 'commonmark-react-object-renderer';
import { createElement, ReactNode } from 'react';

export function reactFromRenderable(node: string | RendererElement): ReactNode {
  if (typeof node === 'string') {
    return node;
  }
  const { type, props, children } = node;
  return Array.isArray(children)
    ? createElement(type, props, ...children.map(reactFromRenderable))
    : children
    ? createElement(type, props, reactFromRenderable(children))
    : createElement(type, props);
}
