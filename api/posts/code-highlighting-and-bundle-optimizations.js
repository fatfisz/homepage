import { oneLine, stripIndent } from 'common-tags';

export const date = '2017.07.18';
export const title = 'Code highlighting and bundle optimizations';

export const excerpt = oneLine`
  In this post I'll describe my experience with some of the existing code highlighting tools.
  I'll also add something extra about removing libraries from the script bundle while retaining their functionality.
`;

export const body = stripIndent`
  ### TL;DR

  In this post I'll describe my experience with some of the existing code highlighting tools.
  I'll also add something extra about removing libraries from the script bundle while retaining their functionality.

  ### Disclaimer

  I'm writing about the state of a few open source tools, and in some cases they are not satisfying my needs.
  This doesn't mean that I'm discouraging you from trying out those tools - by all means do try them, and contribute to them if you have the time.
  The maintainers of those tools are often unsung heroes who donate a lot their time for free - I'm not blaming them for the missing features.
  Rather I'm feeling a little guilty that I didn't make time for improving the tools myself.

  ### Where it all started

  Around February 2017 I was working on a pattern library tool for [Codility](https://codility.com/).
  From the beginning, one of the requirements I had for the new project was to have code examples accompanying the example components.
  And code examples equals... code highlighting.

  The solution couldn't be a third-party embed, like a Gist - it had to be something more flexible.
  Instead I decided to find a JS library that could do the job.
  The main requirement: proper JSX highlighting.

  ### First exhibit: Prism

  [Prism](http://prismjs.com/) was the first tool I decided to give a try.
  I don't remember the other tools I've checked out before it, but what I liked about Prism the most was the minimal API.
  Here's a slightly modified example code from the Prism homepage:

  \`\`\`js
  import Prism from 'prismjs';

  const html = Prism.highlight(code, Prism.languages.javascript);

  // Isn't that simple?
  \`\`\`

  Before I even began to choose the tool, I've already produced a lot of code examples, so I had an extensive test suite for the code highlighting.
  Unfortunately, I quickly found a problem with this particular piece of code:

  \`\`\`jsx
  <Tab name="Only the first word" />
  \`\`\`

  You can't see it here, but Prism only highlighted the first word in the string prop (only "Only").
  [I created an issue](https://github.com/PrismJS/prism/issues/1103), and the problem was fixed quite fast.
  However, this is still not released at the time of writing this article - I hope that changes soon!

  As I couldn't use Prism at the time, and I needed something working right away, I began looking for a replacement.
  Sure enough, I found one:

  ### Second exhibit: CodeMirror

  [CodeMirror](https://codemirror.net/) is not really a code highlighting tool, it's a full-fledged code editor.
  It's even used in [some of the browsers' dev tools](http://codemirror.net/doc/realworld.html)!
  Still, the first thing I noticed on its homepage was working code highlighting, so I set out to find a way of using it.

  After some time looking around the docs I managed to find the API - the only problem being that it was hidden away and not as nice as Prism's.
  In fact, using CodeMirror for highlighting requires adapting [a code of a CLI tool](https://github.com/codemirror/CodeMirror/blob/master/bin/source-highlight).
  There are at least two wrappers that do just that: [codemirror-highlight](https://www.npmjs.com/package/codemirror-highlight) and [highlight-codemirror](https://www.npmjs.com/package/highlight-codemirror).

  \`\`\`js
  import highlight from 'highlight-codemirror';

  const html = highlight(code, 'javascript');
  \`\`\`

  Another obstacle is the size of the thing - even after trimming away the editor part which requires some hacks, the size is in 100s of kilobytes.
  It's ok for internal tools like a pattern library, but using it on a client-facing website, where the size and performance matter, requires some workarounds.
  More on that later!

  Apart from that, CodeMirror is actively maintained and has around 1 release per month - which is the most often out of all the libs I tried.
  Also it handles JSX the best, which is a deciding factor for me.

  ### Third exhibit: highlight.js

  I don't really remember how I found out about [highlight.js](https://highlightjs.org/), but I know I was looking for a lighter alternative to CodeMirror.
  I wanted to use it on my homepage, then still in making; this of course meant making the script bundle as small as possible.

  This tool has a nice API, comparable to Prism's:

  \`\`\`js
  import hljs from 'highlight.js';

  const { value: html } = hljs.highlight('js', code);
  \`\`\`

  I successfully used it for my first two posts, but then came the third one, which contained a JSX example.
  As it turns out, [JSX is still not supported properly](https://github.com/isagalaev/highlight.js/issues/931) by highlight.js.
  I was forced to change the tool to something that I knew has worked - CodeMirror.

  ### Using CodeMirror without having a big bundle

  At the time of writing [my last post](https://fatfisz.com/blog/i-made-a-thing-babel-plugin-jsx-svg-inject) I had a code highlighting tool included in the bundle.
  I also had a tool for [rendering Markdown in React](react-markdown), and was serving Markdown to the client side, where it was parsed.
  The performance of this was probably suboptimal (parsing the text and the examples), but I didn't think too much of this at the time.

  Then the moment came, when I decided to switch to CodeMirror.
  Around that time the topic of [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) was hot, so I decided to use it on my homepage (here is an [example of using it with Next.js](https://github.com/zeit/next.js/tree/master/examples/with-webpack-bundle-analyzer) that I used, as my homepage is powered by it).
  What I saw exceeded my expectations - while highlight.js added around 5 kB after gzipping, CodeMirror was... let's just say it was huge.
  I panicked a bit, because I really wanted to release the post already, and so I first started looking for a way to trim down the unnecessary bits.

  As it turned out, it was just not possible - no matter what I did, it was still oversized for my standards.
  After walking around in circles I decided to try another way - the way of server-side rendering.
  Or rather server-side prerendering.
  This idea, when implemented, finally allowed me to **use minimal code (~0.1 kB gzipped)** to transform prerendered posts on the client side, and **remove the two big packages** (for Markdown and the code highlighting) from the bundle completely.

  As I didn't want to send HTML just to put it inside \`dangerouslySetInnerHTML\`, I had to find some other format that I could easily turn into a React component.
  I dealt with that using the two tools that I've recently published:

  * [commonmark-react-object-renderer](https://www.npmjs.com/package/commonmark-react-object-renderer) for rendering the Markdown content,
  * [react-from-object](https://www.npmjs.com/package/react-from-object) for rendering the prerendered content as a React component.

  I've set up a custom "code block" renderer for the Markdown content that passes the code through CodeMirror and also returns the object form of the React element.

  All in all, I've trimmed down the size of the bundle while also slightly improving the performance of showing the post (no Markdown parsing on the client side anymore).

  ### Closing thoughts

  I have to say, I was a bit surprised about the poor state of support for JSX in code highlighting; after all JSX seems to be quite popular in the front-end world.
  I'd definitely like to help improve the mentioned tools someday, but maybe there's already another solution specialised in code highlighting that Just Works™ with JSX?
  If you're using such a tool, please leave a comment!

  ---

  Prerendering on the server side is gaining popularity, which is good - utilizing this technique means that not only less processing happens on the client side, but also fewer libraries have to be sent over the wire.
  Be sure to check out these tools:

  * [prepack](https://github.com/facebook/prepack), which optimizes the bundle by precalculating whatever it can and replacing whole expressions with computed values,
  * [babel-plugin-preval](https://github.com/kentcdodds/babel-plugin-preval), which allows you to select the code you want to precalculate yourself, and even allows you to do things like reading from the filesystem and including the results into the script at the compilation time.

  As always, thanks for reading!
`;
