// This needs to be imported first to change node's require cache
import CodeMirror from 'codemirror/addon/runmode/runmode.node';

import 'codemirror/mode/meta';
import 'codemirror/mode/django/django';
import 'codemirror/mode/htmlembedded/htmlembedded';
import 'codemirror/mode/jsx/jsx';

const whitespaceRegExp = /\s+/g;

function styleToClassName(style) {
  return style
    .split(whitespaceRegExp)
    .map((part) => `cm-${part}`)
    .join(' ');
}

function highlight(language, code) {
  const mode = CodeMirror.findModeByMIME(language) || CodeMirror.findModeByName(language);

  if (!mode) {
    throw new Error(`Couldn't find a mode for "${language}"`);
  }

  if (!CodeMirror.modes[mode.mode]) {
    throw new Error(`Mode ${mode.mode} is not supported, did you forget to pre-require it?`);
  }

  const children = [];
  let style = null;
  let acc = '';

  function flush() {
    if (style) {
      children.push({
        type: 'span',
        props: {
          className: styleToClassName(style),
        },
        children: acc,
      });
    } else if (acc) {
      children.push(acc);
    }
  }

  CodeMirror.runMode(code, mode.mime, (text, nextStyle) => {
    if (nextStyle !== style) {
      flush();
      style = nextStyle;
      acc = text;
    } else {
      acc += text;
    }
  });
  flush();

  return children;
}

module.exports = function codeBlockRenderer({ info, literal }) {
  return {
    type: 'pre',
    props: {
      className: 'code-example',
    },
    children: highlight(info, literal),
  };
};
