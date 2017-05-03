import Head from 'next/head';

import Container from 'components/container';
import Header from 'components/header';
import GlobalStyles from 'components/global-styles';
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

        <GlobalStyles />
      </div>
    );
  }

  Body.getInitialProps = WrappedComponent.getInitialProps;

  return Body;
}
