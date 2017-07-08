import { createElement } from 'react';


export default function reactFromObject(node) {
  if (!node.type) {
    return node;
  }

  const { type, props, children } = node;
  let processedChildren;

  if (Array.isArray(children)) {
    processedChildren = children.map(reactFromObject);
  } else if (children) {
    processedChildren = reactFromObject(children);
  }

  return createElement(type, props, ...processedChildren);
}
