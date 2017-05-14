import Head from 'next/head';
import PropTypes from 'prop-types';

import highlight from 'utils/highlight';


export default function CodeExample({ children, type }) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/static/highlight.css" />
      </Head>

      <pre
        className="hljs"
        dangerouslySetInnerHTML={{ __html: highlight(type, children) }}
      />
    </div>
  );
}

CodeExample.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
