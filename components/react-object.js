import { createElement } from 'react';


function nodeToElement(node) {
  if (!node.type) {
    return node;
  }

  const { type, children, ...props } = node;
  let properChildren;

  if (Array.isArray(children)) {
    properChildren = children.map(nodeToElement);
  } else if (children) {
    properChildren = nodeToElement(children);
  }

  return createElement(type, { ...props, children: properChildren });
}

export default function ReactObject({ node }) {
  return nodeToElement(node);
}
