import Head from 'next/head';

import Container from 'components/container';
import GlobalStyles from 'components/global-styles';
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

        <GlobalStyles />

        <Header />

        <Container>
          <div className="main-container">
            <main className="main">
              <WrappedComponent {...props} />
            </main>
          </div>
        </Container>

        <style jsx>{`
          .main-container {
            background-color: rgba(255, 255, 255, 0.9);
          }
          .main-container:before,
          .main-container:after {
            content: '';
            display: table;
          }

          .main {
            margin: 4rem 0;
            padding: 0 1rem;
          }
        `}</style>
      </div>
    );
  }

  Body.getInitialProps = WrappedComponent.getInitialProps;

  return Body;
}
