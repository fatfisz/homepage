import baseSlugify from 'slugify';

baseSlugify.extend({
  '.': ' ',
  ':': ' ',
});

export function slugify(...args) {
  return baseSlugify(...args).toLowerCase();
}
