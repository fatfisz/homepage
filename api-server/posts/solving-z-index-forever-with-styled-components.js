'use strict';

const { oneLine, stripIndent } = require('common-tags');


exports.date = '2018.05.01';
exports.title = 'Solving z-index with styled-components';

exports.excerpt = oneLine`
  Follow these simple steps if you don't want to guess the right z-index value ever again.
`;

exports.body = stripIndent`
  ### CSS is ok-ish now

  CSS is known for some quirks that have been driving people mad since they started creating web "apps" (as opposed to just documents with hyperlinks).
  For example there's \`z-index\`, which usually gets a random value that conflicts with another one in your app (you just haven't noticed it yet 😉).
  There's \`vertical-align\` that rarely works as you'd want it to (fortunately we have Flexbox).
  There's also... wait, is that all?

  Lately it seems I don't have too much beef with CSS.
  Most of the basic layouting problems can be solved with Flexbox.
  A lot of problems around scoping and modules can be solved with one of the many CSS-in-JS tools.
  Speaking of which, as a React user, I had to give them a try.

  The first one was [styled-jsx](https://github.com/zeit/styled-jsx), which is quite handy because it retains the CSS syntax while adding scoping and a few extra things on top.
  Then came [styled-components](https://github.com/styled-components/styled-components), which had a useful feature styled-jsx only gained in v2 - the ability to use props in styles.
  I also like how it composes seamlessly with every other component in the app - you only need to pass \`className\` prop and it just works!

  Anyway, it seems to me that these days the only problems I encounter are the previously mentioned \`vertical-align\` and some [browser quirks](https://github.com/philipwalton/flexbugs) here and there.
  Even \`z-index\` is not scary anymore!
  In this post I want to show you how I tamed that property thanks to the power of components.

  ### Why z-index is far from perfect

  The first problem with \`z-index\` you'll encounter is that you don't have an idea what is the "right" value for this property.
  In my experience, coming up with a value that will work in all situations is never simple, because there are many things to consider:
  * You're picking a number that [doesn't have a meaning on its own](https://en.wikipedia.org/wiki/Magic_number_(programming))
  * You need to know about other elements with \`z-index\` set
  * Sooner or later you need to learn what [a stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) is

  While \`z-index\` is not too much of a problem when the website is simple, as the app scales it will become more and more annoying.
  Are you thinking of using a 3rd-party component library?
  It might get even worse, because now you have to deal with values of \`z-index\` that were not set by you and they seem even more random.

  Now that the image I've painted is black enough, I can lay out my solution to some of those problems.

  ### Step one: get rid of the numbers!

  If you're using some form of CSS variables (native, LESS, SASS), then the first thing you can do is to set up some constants.
  By doing so you'll hide all the magic behind understandable labels.
  Of course using names like \`level1\`, \`level2\`, ... and so on is rather redundant,
  so what you should do instead is think of the types of components that you have in your website and how you want them to be displayed together.

  As we started build a library of components at [Codility](https://codility.com/), I added a definition like this:

  \`\`\`js
  import { fromPairs } from 'lodash';

  // This is a magic value that loosely depends on the current website
  const minZIndex = 1000;

  function zIndexify(labels) {
    return fromPairs(
      labels.map((label, index) => [label, minZIndex + index]),
    );
  }

  export const zIndex = zIndexify(['topBar', 'modal']);

  /**
   * This creates an object like this:
   * {
   *   topBar: 1000,
   *   modal: 1001,
   * }
   */
  \`\`\`

  which could then be used like so:

  \`\`\`js
  const Modal = styled.div\`
    z-index: $\{zIndex.modal};
  \`;
  \`\`\`

  That meant anyone who wanted to use \`z-index\` could think of it in terms of named layers rather than some abstract numbers.

  This approach proved to be plenty useful for a long time, until we needed to add a tooltip component to our component library.
  Because having tooltips next to a target element in the actual DOM can be problematic, all of them are instead appended to the document body and are positioned absolutely (thanks to [Popper.js](https://popper.js.org/) for computing the right position).
  And so a decision had to be made: do tooltips go before the modal, or after?

  Consider those situations:
  * A tooltip inside a modal should have a higher \`z-index\` value, so the order should&nbsp;be: \`['modal', 'tooltip']\`.
  * Given a button with a tooltip on hover and a modal appearing on click, the order should be \`['tooltip', 'modal']\` so that the hiding tooltip does not appear on top of the appearing modal.

  It was impossible to set this with the approach we were using.
  What it lacked was the notion of a context - every \`z-index\` value was defined in a 1-dimensional array, which doesn't work in scenarios such as the one above.
  It was time to go 2D.

  ### Step two: add some context and go 2D!

  Don't worry, it's not about building 2-dimensional arrays.
  We're not monsters.
  It's only about slightly shifting the way to think about \`z-index\`.

  The idea is this: we start with a base level on which the order of components is determined - this is the same as the previous approach.
  But once we are inside a z-indexed component (a modal, a pop-up, etc.), we go one "level" up.
  On that level the components have the same order, but all of them appear on top of components from the level below.

  That's how we arrived at this piece of code:

  \`\`\`js
  import { fromPairs } from 'lodash';

  const types = [
    'topBar',
    'draggable',
    'popup',
    'tooltip',
    'modal',
    'notifications',
  ];

  const zIndexMap = fromPairs(types.map((label, index) => [label, index]));

  // This is a magic value that is loosely based on the current website
  const baseValue = 10000;

  export function getLevelIndex(level, value = 0) {
    return level * baseValue + value;
  }
  \`\`\`

  *Notice how in the meantime we increased the "base value" from 1000 to 10000, courtesy of some 3rd party component.*

  Now getting the right value works like so: \`getLevelIndex(1, zIndexMap.modal)\`, \`getLevelIndex(2, zIndexMap.tooltip)\`,
  so even if tooltips are hidden behind modals when used on the same level, tooltips from inside the modal will be displayed correctly.

  ... wait a minute, this seems overly complicated!
  Now the API is not that friendly, because we have to keep track of the level somehow.
  But you already know we are going to deal with this, and that's where styled-components come in.

  ### Step three: put everything in a component!

  The styled-components library comes with a very powerful tool: [themes](https://www.styled-components.com/docs/advanced#theming).
  Inside every "styled" component you get an additional prop: \`theme\`, which carries the context provided by some component above.
  This is made possible because of React context - a well-hidden gem of this library which recently received [an API upgrade](https://reactjs.org/docs/context.html).

  You can "provide" two types of things in themes: a plain object with some values, or a function that returns such an object.
  As a bonus, the function is called with the previous theme (set by providers that are higher in the component tree).

  Now that we know this, we can add some wrappers for our code:

  #### The setter

  First we need to provide the right theme value.
  We do this by generating the current \`z-index\` value for a given type and incrementing the previous level by 1.

  \`\`\`js
  import { get } from 'lodash';

  function getNextLevel(level, type) {
    return {
      levelUp: {
        level,
        value: getLevelIndex(level, zIndexMap[type]),
      },
    };
  }

  export function getTheme(type) {
    return prevTheme => ({
      ...prevTheme,
      ...getNextLevel(
        get(prevTheme, 'levelUp.level', 0) + 1,
        type,
      ),
    });
  }
  \`\`\`

  The component that uses it is quite simple:

  \`\`\`jsx
  import PropTypes from 'prop-types';
  import { ThemeProvider } from 'styled-components';

  export default function LevelUp({ children, type }) {
    const theme = getTheme(type);

    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  }

  LevelUp.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(types).isRequired,
  };
  \`\`\`

  Both \`types\` and \`getTheme\` are the values we defined before: the array of labels and the function that gets the theme based on the type.

  #### The getter

  After the value is set, we need to use it somehow.
  Remember, "styled" components get the \`theme\` prop:

  \`\`\`js
  import { get } from 'lodash';

  function zIndex(props) {
    return get(props.theme, 'levelUp.value', 0);
  }
  \`\`\`

  ... and that's it!

  ### Step four: PROFIT

  Now that we have the means to lift our other components onto the next level, let's try using them:

  \`\`\`jsx
  import LevelUp, { zIndex } from 'components/LevelUp';

  const ModalWrapper = styled.div\`
    z-index: $\{zIndex};
  \`;

  function Modal(props) {
    return (
      <LevelUp type="modal">
        <ModalWrapper>
          {/* Do some stuff that modals do */}
        </ModalWrapper>
      </LevelUp>
    );
  }
  \`\`\`

  Notice how easy setting the value of \`z-index\` is: it's always just \`zIndex\` ❤

  And providing the value is also simple: just wrap components that use \`z-index\` in this one: \`<LevelUp type={type}>\`, where \`type\` is one of the defined types.

  ---

  After implementing these ideas \`z-index\` is not causing any problems for us.
  Granted, because we use reusable components, we don't have to set it that often.
  The only maintenance this needs is adding a new layer type from time to time.
  But for a few months now this system has worked without problems and it seems pretty solid.

  Even if you're not using React or styled-components I hope you'll find something useful here;
  the pattern shouldn't be hard to adopt in another tool.
  In any case, what are your experiences with \`z-index\`?
  How did you handle the problems encountered when using this property?
  Share your solution in a comment!
`;
