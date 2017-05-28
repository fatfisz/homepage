import Head from 'next/head';
import PropTypes from 'prop-types';
import { Component } from 'react';

import disqusShortname from 'constants/disqus-shortname';


const listeners = new Set();

function installDisqusCount() {
  window.DISQUSWIDGETS = {
    getCount(id) {
      const script = document.createElement('script');
      script.src = `https://${disqusShortname}.disqus.com/count-data.js?1=${encodeURIComponent(id)}&${Date.now()}`;
      document.head.appendChild(script);
    },

    displayCount(...args) {
      listeners.forEach(listener => listener(...args));
    },
  };
}

export default class DisqusLink extends Component {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  state = {
    text: '',
  };

  componentDidMount() {
    listeners.add(this.update);

    if (!window.DISQUSWIDGETS) {
      installDisqusCount();
    }

    window.DISQUSWIDGETS.getCount(this.props.id);
  }

  componentWillUnmount() {
    listeners.delete(this.update);
  }

  render() {
    return (
      <a
        href={`${this.props.href}#disqus_thread`}
        data-disqus-identifier={this.props.id}
      >
        {this.state.text}
      </a>
    );
  }

  update = ({ counts, text: { comments: { zero, one, multiple } } }) => {
    counts.forEach(({ comments: count, id }) => {
      if (id !== this.props.id) {
        return;
      }

      const text = (
        count === 0 ? zero :
        count === 1 ? one :
        multiple.replace('{num}', count)
      );

      this.setState({ text });
    });
  };
}
