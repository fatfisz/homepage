import { ReactElement } from 'react';

export function CodeExampleStyles(): ReactElement {
  return (
    <style jsx global>{`
      .code-example {
        background-color: #212121;
        color: #89ddff;
        display: block;
        font-size: 0.9rem;
        line-height: 1.5;
        overflow-x: auto;
        padding: 0.5em;
      }
      .cm-atom,
      .cm-def {
        color: #82aaff;
      }
      .cm-comment {
        color: #545454;
        font-style: italic;
      }
      .cm-keyword {
        color: #c792ea;
      }
      .cm-number {
        color: #f07178;
      }
      .cm-property,
      .cm-variable,
      .cm-variable-2 {
        color: #eeffff;
      }
      .cm-string,
      .cm-string-2 {
        color: #c3e88d;
      }
      .cm-tag {
        color: #eb606b;
      }
      .cm-tag.cm-bracket {
        color: #89ddff;
      }
      .cm-attribute {
        color: #c792ea;
        font-style: italic;
      }
    `}</style>
  );
}
