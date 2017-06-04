'use strict';

const slugify = require('slugify');


slugify.extend({
  '.': ' ',
});

module.exports = function slugifyUtil(...args) {
  return slugify(...args).toLowerCase();
};
