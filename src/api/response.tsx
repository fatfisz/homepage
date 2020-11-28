import { NextApiResponse } from 'next';

export function respond(res: NextApiResponse, data: unknown): void {
  if (data) {
    res.status(200).json({ data });
  } else {
    res.status(404).json({ errors: 'Not found' });
  }
}
