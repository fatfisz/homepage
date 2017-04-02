import Head from 'next/head';

import Title from 'components/title';


export default WrappedComponent => {
  function Body(props) {
    return (
      <div>
        <Title />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700" />
        </Head>

        <main className="main-container">
          <WrappedComponent {...props} />
        </main>

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

        <style jsx global>{`
          html {
            font-family: Lato, sans-serif;
          }

          body {
            color: #212121;
            margin: 0;
          }

          p {
            margin: 1rem 0;
          }
        `}</style>
      </div>
    );
  }

  Body.getInitialProps = WrappedComponent.getInitialProps;

  return Body;
}
