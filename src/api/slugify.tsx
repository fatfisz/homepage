import baseSlugify from 'slugify';

baseSlugify.extend({
  '.': ' ',
  ':': ' ',
});

export function slugify(string: string): string {
  return baseSlugify(string).toLowerCase();
}
