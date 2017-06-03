'use strict';

const { makeExecutableSchema } = require('graphql-tools');

const posts = require('./posts');


const typeDefs = `
  interface PostMeta {
    id: String!
    date: String!
    title: String!
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
};

module.exports = function getSchema() {
  return makeExecutableSchema({ typeDefs, resolvers });
};
