import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, ReactNode } from 'react';
import { ApiShortPost } from 'types';

import { Body } from './Body';
import { Title } from './Title';

function PostLink({ children, id }: { children: ReactNode; id: string }): ReactElement {
  return <Link href={`/blog/${id}`}>{children}</Link>;
}

export function PostList({ posts }: { posts: ApiShortPost[] }): ReactElement {
  return (
    <Body>
      <Title>Posts</Title>
      <Head>
        <meta name="og:url" content="https://fatfisz.com/blog" />
        <meta
          name="og:description"
          content="Welcome to FatFisz's blog, where you can read about front-end adventures and stuff."
        />
      </Head>

      {posts.map(({ id, date, title, excerpt }) => (
        <div key={id} className="post-list-item">
          <h5>{date}</h5>
          <h4>
            <PostLink id={id}>
              <a>{title}</a>
            </PostLink>
          </h4>
          {excerpt}
          <h5>
            <PostLink id={id}>
              <a>Read more</a>
            </PostLink>
          </h5>
        </div>
      ))}

      <style jsx>{`
        .post-list-item + .post-list-item {
          margin-top: 4rem;
        }
      `}</style>
    </Body>
  );
}
