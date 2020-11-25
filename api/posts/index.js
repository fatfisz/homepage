import { renderMarkdown } from 'api/render-markdown';
import { slugify } from 'api/slugify';

const postsContext = require.context('.', false, /\.js$/);

export const posts = postsContext
  .keys()
  .filter((key) => key !== './index.js')
  .map(postsContext)
  .sort((a, b) => -a.date.localeCompare(b.date))
  .map((post) =>
    Object.assign({}, post, {
      id: slugify(post.title),
      body: JSON.stringify(renderMarkdown(post.body)),
    }),
  );
