import { makeExecutableSchema } from 'graphql-tools';

import posts from './posts';

const typeDefs = `
  interface PostMeta {
    id: String!
    date: String!
    title: String!
    excerpt: String!
  }

  type PostListItem implements PostMeta {
    id: String!
    date: String!
    title: String!
    excerpt: String!
  }

  type Post implements PostMeta {
    id: String!
    date: String!
    title: String!
    excerpt: String!
    body: String!
  }

  type Query {
    posts: [PostListItem]!
    post(id: String!): Post
  }
`;

const resolvers = {
  Query: {
    posts() {
      return posts;
    },

    post(obj, { id }) {
      return posts.find((post) => post.id === id);
    },
  },

  PostMeta: {
    __resolveType() {
      return null;
    },
  },
};

module.exports = function getSchema() {
  return makeExecutableSchema({ typeDefs, resolvers });
};
