'use strict';

const slugify = require('slugify');


const posts = [
  require('./color-as-a-background-image'),
];

const postsWithId = posts.map((post) => Object.assign({}, post, {
  id: slugify(post.title).toLowerCase(),
}));

module.exports = postsWithId;
