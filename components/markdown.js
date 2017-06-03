import { stripIndent } from 'common-tags';
import ReactMarkdown from 'react-markdown';

import CodeExample from 'components/code-example';


const renderers = {
  CodeBlock({ language, literal }) {
    return <CodeExample type={language}>{stripIndent([literal])}</CodeExample>
  },
};

export default function Markdown({ source }) {
  return <ReactMarkdown source={source} renderers={renderers} />;
}
