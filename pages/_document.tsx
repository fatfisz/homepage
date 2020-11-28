import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';

export default class extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
