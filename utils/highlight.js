import hljs from 'highlight.js/lib/highlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';


hljs.registerLanguage('css', css);
hljs.registerLanguage('js', js);
hljs.registerLanguage('json', json);

export default function highlight(type, code) {
  return hljs.highlight(type, code).value;
}
