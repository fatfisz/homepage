import Head from 'next/head';

import Container from 'components/container';
import Title from 'components/title';
import GlobalStyles from './global-styles';
import Header from './header';


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

        <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
          <main>
            <WrappedComponent {...props} />
          </main>
        </Container>
      </div>
    );
  }

  Body.getInitialProps = WrappedComponent.getInitialProps;

  return Body;
}
