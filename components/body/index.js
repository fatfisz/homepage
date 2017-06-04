import Head from 'next/head';

import GlobalStyles from 'components/body/global-styles';
import Header from 'components/body/header';
import Container from 'components/container';
import Title from 'components/title';


export default function Body({ children }) {
  return (
    <div>
      <Title />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.gravatar.com/avatar/dcc938049e3618d715d4e45eeb2cc314" />
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
