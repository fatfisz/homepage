import { Body } from 'components/Body';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ReactElement } from 'react';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Body>
      <Component {...pageProps} />
    </Body>
  );
}
