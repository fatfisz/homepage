'use strict';

const { oneLine, stripIndent } = require('common-tags');


exports.date = '2018.08.05';
exports.title = 'Dual-mode React components with getDerivedStateFromProps';

exports.excerpt = oneLine`
  Over the past year React received a few new features that make developing apps easier.
  One of them is the getDerivedStateFromProps method, a replacement for componentWillReceiveProps.
  I don't need it 95% of the time, but when I do, I follow this pattern...
`;

exports.body = stripIndent`
  Over the past year React received a few new features that make developing apps easier.
  One of them is the \`getDerivedStateFromProps\` method, a replacement \`componentWillReceiveProps\`.
  I don't need it [95% of the time](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html), but when I do, I follow this pattern:

  1. \`props.value\`
  1. \`state.value\`
  1. \`props.defaultValue\`
  1. A fallback value

  I presented it in a tweet some time ago, but I didn't provide too much context back then:

  <blockquote class="twitter-tweet" data-lang="pl"><p lang="en" dir="ltr">When using getDerivedStateFromProps I found this order to be the best:<br><br>1. props.value - it&#39;s highest priority<br>2. state.value<br>3. props.defaultValue - feeds state.value only initially<br>4. fallback default - not required, but sometimes helps (e.g. an empty string or false)</p>&mdash; FatFisz (@FatFisz) <a href="https://twitter.com/FatFisz/status/1004851714430767107?ref_src=twsrc%5Etfw">7 czerwca 2018</a></blockquote>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

  How did I get there?
  Let me go back a few months...

  ### Dual mode components with componentWillReceiveProps

  One of the first things you learn in React is that components can receive data through props, and that they can also manage an internal state.
  After that you learn about \`<input>\` and then things become interesting:
  it turns out that \`<input>\` can work both with props (in the controlled mode) or without them, only by keeping a state (uncontrolled mode).

  One day I needed to build a component with the same capability;
  in the basic version it would take care of itself by using state, and optionally there would be a way to control it through props.
  To simplify things, the component would always use state and props would only update state when they are updated.
  It sounds nice, but how can we do that with React?

  Before \`getDerivedStateFromProps\` the only sensible method was \`componentWillReceiveProps\`, for two reasons.
  First, it was **the** method of setting the state in reaction to prop changes.
  Second, the other method called on updates before render, \`componentWillUpdate\`, couldn't contain calls to \`setState\`.
  This was all described in the React docs.

  Taking it all into consideration, I wrote something like this:

  \`\`\`js
  class Foo extends Component {

    state = {
      value: this.props.value,
    };

    componentWillReceiveProps({ value }) {
      if (value != null) {
        this.setState({ value });
      }
    }

    ...

    handleChange = value => {
      if (this.props.value == null) {
        this.setState({ value });
      }

      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }
  \`\`\`

  ... and it worked 😉
  Let's take a moment to understand why.

  In the **uncontrolled mode** the value in props is always \`undefined\`, so \`componentWillReceiveProps\` will do nothing.
  When \`handleChange\` is called, \`setState\` schedules a state update - and that's it.
  \`onChange\` may or may not be called, but we don't care since value won't be passed through props anyway.

  In the **controlled mode**, first \`value\` is taken from the props - \`componentWillReceiveProps\` is not called at mount time, so \`value\` needs to be set manually.
  Then, when props change, the value in the state is updated.
  When \`handleChange\` is called, state is not changed; \`onChange\` should be used to pass the new value through props.

  This code works, but there are some obvious drawbacks:

  * There are two pipelines for props feeding into state: on construction and when the props change (because \`componentWillReceiveProps\` is only called on updates)
  * There are two conditions which make the code more complicated (checking if the value in props is nullish)
  * The conditions are similar, but have reversed signs (\`==\` and \`!=\`), making it easier to make a mistake

  ### Enter getDerivedStateFromProps

  The new lifecycle method, \`getDerivedStateFromProps\`, was introduced to avoid the pitfalls of \`componentWillReceiveProps\`.
  It so happens that it can greatly simplify dual-mode components.
  Let me throw some code at you:

  \`\`\`js
  class Foo extends Component {

    static getDerivedStateFromProps(props, state) {
      // I'm using nullish-coalescing operator here for brevity:
      // https://github.com/tc39/proposal-nullish-coalescing
      return {
        value: props.value ?? state.value,
      };
    }

    state = {};

    ...

    handleChange = value => {
      this.setState({ value });

      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }
  \`\`\`

  This code behaves the same as the \`componentWillReceiveProps\` version, but it looks so muich cleaner!

  The best change in my opinion is that now the state gets value from only one place.

  > \`getDerivedStateFromProps\` is invoked right before calling the render method, both on the initial mount and on subsequent updates.
  > ([source](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops))

  Because \`getDerivedStateFromProps\` is the only source of truth for \`state.value\`, it's also easier to extend it - which we'll do in a minute.

  The second change is that now the annoying conditions are gone; there's only one straightforward condition in the expression \`props.value ?? state.value\`,
  but there's no need to have it in \`handleChange\` anymore.
  Why? Because if the state is changed unnecessarily, \`getDerivedStateFromProps\` will always correct it.

  So that's how we get to the order of the first two elements on my list.
  The value in props is always the most important one because we wouldn't want props to be ignored.
  The value in state is used as a fallback mechanism - when the component is not controlled \`state.value\` is just set to itself and reacts to \`setState\` properly.

  ### Extending the list

  The pattern I suggest has two more elements: \`props.defaultValue\` and also "a fallback value".
  Here's an example code for that:

  \`\`\`js
  class Foo extends Component {

    static getDerivedStateFromProps(props, state) {
      return {
        value: (
          props.value ??
          state.value ??
          props.defaultValue ??
          '' // this can be any other value, e.g. 0, false
        ),
      };
    }

    state = {};

    ...
  }
  \`\`\`

  Let's take a look at \`props.defaultValue\`.
  During the mounting phase, when no value is passed through the props, \`state.value\` is still \`undefined\`.
  That's why just before the first render \`state.value\` will be equal to \`props.defaultValue\`.
  On subsequent renders \`state.value\` will be used, and \`props.defaultValue\` will become dormant.

  In situation when neither \`value\` nor \`defaultValue\` are in the props, I tend to provide an appropriate value, like an empty string or a zero, as a fallback.
  This has two benefits:

  1. It silences warnings when using \`<input>\` and switching between the controlled/uncontrolled mode.
  1. It ensures that the value in state will always be defined and non-null, which may simplify the logic of component's methods.

  That's it!

  ### Final thoughts

  Don't use \`getDerivedStateFromProps\` unless you really need to.
  Even though with this method you can make a dual-mode component easily, in most cases there's just no need.
  I only do that for some reusable components, and not before I **need** them to handle both modes.

  While the order of values in \`getDerivedStateFromProps\` has significance, I don't always use all of them.
  Usually \`props.value\`, \`state.value\`, and a fallback value are sufficient.
  Again, add what you need **when** you need it, don't overcomplicate the component at the beginning.

  Thanks for reading, please share your thoughts on this in the comments!
`;
