import Document, { Head, Main, NextScript } from 'next/document';


export default class extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <style>{`
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
          <div className="main-container">
            <Main />

            <style jsx>{`
              .main-container {
                height: 100%;
                left: 0;
                overflow-x: auto;
                position: fixed;
                top: 0;
                width: 100%;
              }
            `}</style>
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}
