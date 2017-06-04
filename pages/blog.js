import Link from 'next/link';

import Body from 'components/body';
import Title from 'components/title';
import fetchApi from 'utils/fetch-api';


function BlogLink({ children, id }) {
  return (
    <Link href={`/blog/${id}`} prefetch>
      {children}
    </Link>
  );
}

export default function Blog({ posts }) {
  return (
    <Body>
      <Title>Blog</Title>

      {posts.map(({ id, date, title, excerpt }) =>
        <div key={id}>
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
    </Body>
  );
}

Blog.getInitialProps = async ({ req }) => {
  const isServer = Boolean(req);
  const { posts } = await fetchApi('{ posts { id date title excerpt } }', isServer);
  return { posts };
};
