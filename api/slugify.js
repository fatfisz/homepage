import slugify from 'slugify';

slugify.extend({
  '.': ' ',
  ':': ' ',
});

module.exports = function slugifyUtil(...args) {
  return slugify(...args).toLowerCase();
};
