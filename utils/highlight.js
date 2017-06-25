import hljs from 'highlight.js/lib/highlight';
import css from 'highlight.js/lib/languages/css';
import django from 'highlight.js/lib/languages/django';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import ruby from 'highlight.js/lib/languages/ruby';
import xml from 'highlight.js/lib/languages/xml';


hljs.registerLanguage('css', css);
hljs.registerLanguage('django', django);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('xml', xml);

export default function highlight(type, code) {
  return hljs.highlight(type, code).value;
}
