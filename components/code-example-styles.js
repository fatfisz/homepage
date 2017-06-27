export default function CodeExampleStyles() {
  return (
    <style jsx global>{`
      .code-example {
        background-color: #263238;
        color: #80cbc4;
        display: block;
        font-size: 0.875rem;
        overflow-x: auto;
        padding: 0.5em;
      }

      .cm-atom { color: #6699cc }
      .cm-comment { color: #546e7a }
      .cm-def { color: #6699cc }
      .cm-keyword { color: #c594c5 }
      .cm-number { color: #ffeb95 }
      .cm-property { color: #cdd3de }
      .cm-string { color: #c3e88d }
      .cm-tag { color: #eb606b }
      .cm-tag.cm-bracket { color: #80cbc4 }
      .cm-variable { color: #cdd3de }
      .cm-variable-2 { color: #6699cc }
    `}</style>
  );
}

