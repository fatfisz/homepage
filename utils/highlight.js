import hljs from 'highlight.js';


export default function highlight(type, code) {
  return hljs.highlight(type, code).value;
}
