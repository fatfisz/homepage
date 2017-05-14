import { stripIndent } from 'common-tags';
import Link from 'next/link';

import Body from 'components/body';
import CodeExample from 'components/code-example';
import Title from 'components/title';


export default function Post() {
  return (
    <Body>
      <Title>Color as a background image</Title>

      <h5>
        2017.05.13
      </h5>
      <h2>
        Color as a background image
      </h2>
      <h3>
        Introduction
      </h3>
      <p>
        Hi, welcome to my blog!
        I will be writing mostly about the front-end stuff, JS in general, and also a bit about what I do outside of work.
        I like to eat outside sometimes, so you can expect some posts with photos about places to eat in Warsaw.
        In this post, however, I won't be writing about food.
      </p>
      <h3>
        The problem
      </h3>
      <p>
        When I was working on this website I found myself needing a non-trivial background.
        It had to consist of a pattern that covers the whole viewport, and a single-color overlay beneath the text.
        The purpose of the overlay was to make the text more clear - otherwise the pattern was introducing too much noise.
      </p>
      <p>
        In the first version the overlay was only surrounding the text, but the idea was discarded after consulting with one of the wonderful designers I have a pleasure working with at <a href="https://codility.com">Codility</a>.
        Instead I was supposed to make the overlay take the whole height of the viewport.
      </p>
      <p>
        I had previously created a similar background for another website (which is no more, unfortunately), so I knew a way of achieving the desired effect.
        It was based on having an element that would have the height of <em>at least</em> the viewport - if there was more content, it should grow accordingly.
        This solution, while it certainly works, involves setting the (min-)height of all of the parent elements to 100% - up to <code>body</code> and <code>html</code>.
        It is as cumbersome as it sounds, so I decided to look for something else.
      </p>
      <h3>
        Multiple backgrounds to the rescue
      </h3>
      <p>
        I observed that what I need is something similar to the existing pattern background - with the difference being the overlay pattern has to be 1px × 1px and stretch to different widths depending on the size of the screen.
        The solution would require less code and be more easy to work with than the <code>height: 100%</code> one.
        The only problem was how to make that image.
      </p>
      <p>
        One option is to have a separate image served - I didn't pursue this one, because an additional request for such a small thing is too unreasonable for me.
      </p>
      <p>
        Another option is to use a data URI.
        It's a known technique for inlining images in the stylesheets.
        Though <a href="https://csswizardry.com/2017/02/base64-encoding-and-performance/">it is not always recommended</a>, there's no problem with using it for one small image.
        Usually the image is base64-encoded, but then it's hard to tweak the color.
        For that reason I also discarded binary formats.
        Then I tried inlining a one pixel svg:
      </p>
      <CodeExample type="css">{stripIndent`
        body {
          background-image:
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect fill="rgba(255, 255, 255, 0.85)" x="0" y="0" width="1" height="1" /></svg>'),
            url(/static/background.svg);
        }
      `}</CodeExample>
      <p>
        <em>
          Take note of the order of the images: the top-most one on the page should be first in the declaration.
          This doesn't seem to be most intuitive, so I'm just leaving this here.
        </em>
      </p>
      <p>
        This solution is not the most sublime, but I was prepared to live with it.
        That is, until I found out it is not working in Edge 15, no matter what I do.
      </p>
      <p>
        I turned to my good friend, <a href="https://developer.mozilla.org/en/docs/Web/CSS/background-image">the MDN docs</a>, to see what are the other options for the background image.
        There I found what I ultimately used - the linear gradient!
        The idea is so simple, yet I had to jump through many hoops in order to arrive at this solution.
        Maybe it's because I didn't think of one pixel as a gradient material?
        Anyway, that's what I came up with:
      </p>
      <CodeExample type="css">{stripIndent`
        body {
          background-image:
            linear-gradient(0deg, \${overlayColor}, \${overlayColor}),
            url(/static/background.svg);
        }
      `}</CodeExample>
      <p>
        The <code>{'${overlayColor}'}</code> bit is there because I have the styles declared inside a <a href="https://github.com/zeit/styled-jsx">styled-jsx</a> block.
        Anyway, this means I can easily tweak the color, which was one of my goals.
        By the way, there was another requirement - different widths depending on the screen size.
        Here's the code that takes care of that:
      </p>
      <CodeExample type="css">{stripIndent`
        body {
          background-position: center top;
          background-repeat: repeat-y, repeat;
          background-size: 100% 1px, 400px;
        }
        @media (min-width: 576px) {
          body {
            background-size: 540px 1px, 400px;
          }
        }
        @media (min-width: 768px) {
          body {
            background-size: 720px 1px, 400px;
          }
        }
        @media (min-width: 992px) {
          body {
            background-size: 960px 1px, 400px;
          }
        }
        @media (min-width: 1200px) {
          body {
            background-size: 1140px 1px, 400px;
          }
        }
      `}</CodeExample>
      <p>
        Setting <code>repeat-y</code> for the pixel is crucial, otherwise the whole viewport would be covered.
      </p>
      <h3>
        Summary
      </h3>
      <p>
        The linear gradient solution was not the first one that came to my mind when I was tackling the background problem.
        It is however simple, straightforward, and works in all browsers that support multiple backgrounds (all modern ones, IE 9+) and the gradient (all modern ones, IE 10+).
      </p>
      <p>
        That's all for this post, I hope you find it useful.
        Thanks for reading!
      </p>
    </Body>
  );
}
