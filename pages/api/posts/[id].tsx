import { posts } from 'api/posts';
import { respond } from 'api/response';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void =>
  respond(
    res,
    posts.find((post) => post.id === (req.query.id as string)),
  );
