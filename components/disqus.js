import disqusShortname from 'const/disqus-shortname';
import PropTypes from 'prop-types';
import { Component } from 'react';

function getDisqusConfigFunction({ id, url }) {
  return function () {
    this.page.url = `https://fatfisz.com${url}`;
    this.page.identifier = id;
    this.callbacks.onNewComment = [
      () => {
        if (window.DISQUSWIDGETS) {
          window.DISQUSWIDGETS.getCount(id);
        }
      },
    ];
  };
}

function addDisqus(props) {
  window.disqus_config = getDisqusConfigFunction(props);

  const script = window.document.createElement('script');
  script.src = `https://${disqusShortname}.disqus.com/embed.js`;
  script.dataset.timestamp = Date.now();
  window.document.head.appendChild(script);
}

function resetDisqus(props) {
  window.DISQUS.reset({
    reload: true,
    config: getDisqusConfigFunction(props),
  });
}

export default class Disqus extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };

  componentDidMount() {
    if (window.DISQUS) {
      resetDisqus(this.props);
    } else {
      addDisqus(this.props);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="disqus_thread" style={{ marginTop: '3rem' }} />;
  }
}
