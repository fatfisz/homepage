import { GlobalStyles } from 'components/body/global-styles';
import { Header } from 'components/body/header';
import { Container } from 'components/container';
import { Title } from 'components/title';
import Head from 'next/head';
import { Fragment } from 'react';

export function Body({ children }) {
  return (
    <Fragment>
      <Title />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@fatfisz" />
        <meta name="og:type" content="website" />
        <meta
          name="og:image"
          content="https://www.gravatar.com/avatar/dcc938049e3618d715d4e45eeb2cc314"
        />
        <meta name="og:description" content="FatFisz's humble homepage." />
      </Head>

      <GlobalStyles />

      <Header />

      <Container>
        <main>{children}</main>
      </Container>
    </Fragment>
  );
}
