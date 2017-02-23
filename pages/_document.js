import Document, { Head, Main, NextScript } from 'next/document';


export default class extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <style>{`
            html, body, #__next, [data-reactroot] {
              height: 100%;
            }

            html {
              font-family: sans-serif;
            }

            body {
              color: #212121;
              margin: 0;
            }

            p {
              margin: 1rem 0;
            }
          `}</style>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
