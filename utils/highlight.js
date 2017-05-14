import hljs from 'highlight.js/lib/highlight';
import css from 'highlight.js/lib/languages/css';


hljs.registerLanguage('css', css);

export default function highlight(type, code) {
  return hljs.highlight(type, code).value;
}
