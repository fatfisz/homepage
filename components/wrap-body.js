import Head from 'next/head';

import Container from 'components/container';
import Header from 'components/header';
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

        <Header {...props} />

        <main>
          <Container>
            <WrappedComponent {...props} />
          </Container>
        </main>

        <style jsx global>{`
          * {
            box-sizing: border-box;
          }

          html {
            font-family: Lato, sans-serif;
          }

          body {
            color: #424242;
            margin: 0;
          }

          main {
            margin: 4rem 0;
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
