import { oneLine, stripIndent } from 'common-tags';

export const date = '2017.06.04';
export const title = 'Using .babelrc.js today';

export const excerpt = oneLine`
  You don't have to wait for Babel 7 in order to use the full power of JS for configuration!
  In this post I suggest a way of configuring that will require a minimum amount of work when upgrading to Babel 7.
`;

export const body = stripIndent`
  ### TL;DR

  You don't have to wait for Babel 7 in order to use the full power of JS for configuration!
  In this post I suggest a way of configuring that will require a minimum amount of work when upgrading to Babel 7.

  ### Handling different scenarios in Babel 6 config

  Configuring Babel 6 may not be easy when you need to deal with different environments.
  The Babel team provided us with the \`"env"\` option, but it has a serious limitation:
  it can only add new presets or plugins, but not change the config of the ones declared for all the environments.
  This can be irritating to find out (it was for me 😉) when working with 3rd-party presets.
  Story time!

  I'm using [Next.js](https://github.com/zeit/next.js) at work and for this very website.
  It comes with its own \`next/babel\` preset, which explicitly has module transformation turned off (for [Webpack](https://webpack.js.org/)).
  At [Codility](https://codility.com/) we were using [Mocha](https://mochajs.org) for tests and it didn't handle \'import\` statements at the time.
  We still needed to use the presets and plugins from \'next/babel\', so the first attempt at making this work looked like this:

  \`\`\`json
  {
    "env": {
      "testing": {
        "presets": [
          "latest",
          "react"
        ],
        "plugins": [
          "...",
          "all the plugins declared in next/babel",
          "..."
        ]
      },
      "development": {
        "presets": ["next/babel"]
      },
      "production": {
        "presets": ["next/babel"]
      }
    }
  }
  \`\`\`

  The culprit there is the \`babel-preset-latest\`, which in \`next/babel\` has an option \`modules: false\`.

  This not only looks poorly, but it also makes it harder to upgrade Next.js, as the presets and plugins have to stay in sync.

  ### The hope

  I started looking for an alternative that would allow me to switch just the option I was interested in.
  Finally I stumbled upon [this PR for adding \`.babelrc.js\` support](https://github.com/babel/babel/pull/4892) that would solve the problem!
  Unfortunately I couldn't use it yet (and as of time of writing this it's still not possible):

  > you'll need to use 7.0 (alpha), or wait ([source](https://github.com/babel/babel/pull/4892#issuecomment-290560014))

  As I didn't really want to use the alpha version of Babel and there would be no backport, I decided to wait.

  ### The breakthrough

  I was working on "something" a week ago when it suddenly has occurred to me that \`next/babel\` is actually a JS file!
  It was not really a surprise for me, because I had to look inside that file previously.
  But what surprised me was that I didn't connect the dots before, as this is kind of obvious -
  all this time I could create my own "preset" in JS and use it in \`.babelrc\`.

  _Because presets consist of other presets and plugins, they are basically a more powerful version of \`.babelrc\`._

  So I created a \`.babelrc.js\` file (that is future-compatible) that looks like this:

  \`\`\`js
  'use strict';

  const nextPreset = require('next/babel');


  if (process.env.NODE_ENV === 'testing') {
    const envPreset = nextPreset.presets.find(preset => (
      Array.isArray(preset) &&
      preset[0].includes('babel-preset-env')
    ));
    if (envPreset) {
      // Use the default CJS transform
      delete envPreset[1].modules;
    }
  }

  module.exports = {
    presets: [nextPreset],
  };
  \`\`\`

  The last step was to configure \`.babelrc\` properly:

  \`\`\`json
  {
    "presets": ["./.babelrc.js"]
  }
  \`\`\`

  ### Summary

  It seems like it was possible to have \`.babelrc.js\` all along!
  Unfortunately it looks like a hack and the sooner Babel 7 comes out, the better 🙂

  Thanks for reading!
`;
