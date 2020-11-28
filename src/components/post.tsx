import Head from 'next/head';
import { ReactElement } from 'react';
import { Post } from 'types';

import { Body } from './Body';
import { CodeExampleStyles } from './CodeExampleStyles';
import { Title } from './Title';

export function PostView({ body, date, excerpt, id, title }: Post): ReactElement {
  const href = `/blog/${id}`;
  return (
    <Body>
      <Title>{title}</Title>
      <Head>
        <meta name="og:url" content={`https://fatfisz.com${href}`} />
        <meta name="og:description" content={excerpt} />
      </Head>

      <h5 className="date-header">
        <div className="date">{date}</div>
      </h5>

      <h2>{title}</h2>

      <CodeExampleStyles />
      {body}

      <style jsx>{`
        .date-header {
          display: flex;
        }

        .date {
          flex: 1 1 auto;
        }
      `}</style>
    </Body>
  );
}
