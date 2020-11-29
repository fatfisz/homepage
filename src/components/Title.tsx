import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

const baseTitle = "FatFisz's homepage";

export function Title({ children = '' }: { children?: ReactNode }): ReactElement {
  const separator = children ? ' - ' : '';
  const title = `${children}${separator}${baseTitle}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="og:title" content={title} />
    </Head>
  );
}
