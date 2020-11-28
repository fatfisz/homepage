import { posts } from 'api/posts';
import { respond } from 'api/response';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiShortPost } from 'types';

const shortPosts: ApiShortPost[] = posts.map(({ body, ...post }) => post);

export default (req: NextApiRequest, res: NextApiResponse): void => respond(res, shortPosts);
