declare module 'codemirror/addon/runmode/runmode.node' {
  interface Mode {
    name: string;
    mode: string;
    mime?: string;
    mimes?: string[];
    ext?: string[];
    alias?: string[];
  }

  const CodeMirror: {
    findModeByMIME(mime: string): Mode;
    findModeByName(name: string): Mode;
    modes: Record<string, string>;
    runMode(
      text: string,
      modespec,
      callback: (text: string, style?: string | null) => void,
      options?: { tabSize?: number; state?: unknown },
    ): void;
  };

  export default CodeMirror;
}
