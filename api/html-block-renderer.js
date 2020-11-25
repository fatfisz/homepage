export function htmlBlockRenderer(html) {
  return {
    type: 'div',
    props: {
      dangerouslySetInnerHTML: { __html: html.literal },
    },
  };
}
