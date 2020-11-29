import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

import { Background } from './Background';
import { Container } from './Container';
import { GlobalStyles } from './GlobalStyles';
import { Header } from './Header';
import { Title } from './Title';

export function Body({ children }: { children: ReactNode }): ReactElement {
  return (
    <>
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
        <meta name="og:description" content="FatFisz's homepage." />
      </Head>

      <GlobalStyles />

      <Header />

      <Container>
        <main>{children}</main>
      </Container>

      <Background />
    </>
  );
}
