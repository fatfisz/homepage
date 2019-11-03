import Head from 'next/head';
import Link from 'next/link';

import Body from 'components/body';
import Title from 'components/title';

function BlogLink({ children, id }) {
  return (
    <Link href="/blog/[id]" as={`/blog/${id}`}>
      {children}
    </Link>
  );
}

export default function PostList({ posts }) {
  return (
    <Body>
      <Title>Blog</Title>
      <Head>
        <meta name="og:url" content="https://fatfisz.com/blog" />
        <meta name="og:description" content="Welcome to FatFisz's blog, where you can read about front-end adventures and stuff." />
      </Head>

      {posts.map(({ id, date, title, excerpt }) =>
        <div key={id} className="post-list-item">
          <h5>{date}</h5>
          <h4>
            <BlogLink id={id}>
              <a>{title}</a>
            </BlogLink>
          </h4>
          {excerpt}
          <h5>
            <BlogLink id={id}>
              <a>Read more</a>
            </BlogLink>
          </h5>
        </div>
      )}

      <style jsx>{`
        .post-list-item + .post-list-item {
          margin-top: 4rem;
        }
      `}</style>
    </Body>
  );
}

PostList.getQuery = () => `
  {
    posts {
      id
      date
      title
      excerpt
    }
  }
`;
