import { renderMarkdown } from './renderMarkdown';
import { slugify } from './slugify';
import { ApiPostContent, ApiShortPost } from './types';

const postsContext = require.context('./posts', false, /\.tsx$/);

export const posts = postsContext
  .keys()
  .map<ApiPostContent>(postsContext)
  .sort((a, b) => -a.date.localeCompare(b.date))
  .map((post) => ({
    ...post,
    id: slugify(post.title),
    body: JSON.stringify(renderMarkdown(post.body)),
  }));

export const shortPosts: ApiShortPost[] = posts.map(({ body, ...post }) => post);
