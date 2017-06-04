import PropTypes from 'prop-types';

import CodeExampleStyles from 'components/code-example/styles';
import highlight from 'utils/highlight';


export default function CodeExample({ children, type }) {
  return (
    <div>
      <CodeExampleStyles />

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
