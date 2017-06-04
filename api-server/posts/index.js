'use strict';

const slugify = require('../../utils/slugify');


const posts = [
  require('./using-babelrc-js-today'),
  require('./color-as-a-background-image'),
];

const postsWithId = posts.map((post) => Object.assign({}, post, {
  id: slugify(post.title),
}));

module.exports = postsWithId;
