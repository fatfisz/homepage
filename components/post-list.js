import Link from 'next/link';

import Body from 'components/body';
import Title from 'components/title';


function BlogLink({ children, id }) {
  return (
    <Link href={{ url: 'blog', query: { id } }} as={`/blog/${id}`} prefetch>
      {children}
    </Link>
  );
}

export default function PostList({ posts }) {
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