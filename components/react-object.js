import { createElement } from 'react';

import CodeExample from 'components/code-example';


const renderers = {
  pre({ 'data-info': language, children }) {
    return <CodeExample type={language}>{children}</CodeExample>
  },
};

function nodeToElement(node) {
  if (!node.type) {
    return node;
  }

  if (node['data-is-rendered'] && renderers[node.type]) {
    return renderers[node.type](node);
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
