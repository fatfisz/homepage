'use strict';

const slugify = require('../../utils/slugify');
const markdownToReactObject = require('../markdown-to-react-object');


const posts = [
  require('./i-made-a-thing-babel-plugin-jsx-svg-inject'),
  require('./using-babelrc-js-today'),
  require('./color-as-a-background-image'),
];

const postsWithId = posts.map((post) => Object.assign({}, post, {
  id: slugify(post.title),
  body: JSON.stringify(markdownToReactObject(post.body)),
}));

module.exports = postsWithId;
