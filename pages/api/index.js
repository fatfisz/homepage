import { graphql } from 'graphql';

import getSchema from 'api/get-schema';

const schema = getSchema();

function setCORS(res) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  res.setHeader('access-control-allow-origin', 'http://localhost:3000');
  res.setHeader('access-control-allow-headers', 'content-type');
}

export default async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200);
    setCORS(res);
    return res.end();
  }
  if (req.method === 'POST') {
    if (req.headers['content-type'] !== 'application/graphql') {
      res.status(406);
      return res.end();
    }
    try {
      const response = await graphql({ schema, source: req.body });
      setCORS(res);
      return res.json(response);
    } catch (error) {
      res.status(500);
      if (process.env.NODE_ENV === 'production') {
        console.error(error);
        return res.end();
      } else {
        return res.end(error.stack);
      }
    }
  }

  res.status(405);
  res.end();
};
