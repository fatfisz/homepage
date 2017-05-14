import Head from 'next/head';

import Container from 'components/container';
import Title from 'components/title';
import GlobalStyles from './global-styles';
import Header from './header';


export default function Body({ children }) {
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
        <main>
          {children}
        </main>
      </Container>
    </div>
  );
}
