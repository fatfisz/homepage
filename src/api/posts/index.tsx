import { renderMarkdown } from 'api/renderMarkdown';
import { slugify } from 'api/slugify';
import { ApiPostContent } from 'types';

const postsContext = require.context('.', false, /\.tsx$/);

export const posts = postsContext
  .keys()
  .filter((key) => !key.startsWith('./index.'))
  .map<ApiPostContent>(postsContext)
  .sort((a, b) => -a.date.localeCompare(b.date))
  .map((post) => ({
    ...post,
    id: slugify(post.title),
    body: JSON.stringify(renderMarkdown(post.body)),
  }));
