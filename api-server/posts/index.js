'use strict';

const slugify = require('../../utils/slugify');
const renderMarkdown = require('../render-markdown');


const posts = [
  require('./dual-mode-react-components-with-getderivedstatefromprops'),
  require('./solving-z-index-forever-with-styled-components'),
  require('./code-highlighting-and-bundle-optimizations'),
  require('./i-made-a-thing-babel-plugin-jsx-svg-inject'),
  require('./using-babelrc-js-today'),
  require('./color-as-a-background-image'),
];

module.exports = posts.map((post) => Object.assign({}, post, {
  id: slugify(post.title),
  body: JSON.stringify(renderMarkdown(post.body)),
}));
