import Head from 'next/head';
import Link from 'next/link';

import Title from 'components/title';
import wrapBody from 'components/wrap-body';


const posts = [
  {
    date: '2017.05.13',
    href: '/blog-color-as-a-background-image',
    title: 'Color as a background image',
    excerpt:
      <p>
        Hi, welcome to my blog!
        I will be writing mostly about the front-end stuff, JS in general, and also a bit about what I do outside of work.
        I like to eat outside sometimes, so you can expect some posts with photos about places to eat in Warsaw.
        In this post, however, I won't be writing about food.
      </p>,
  },
];

function Blog() {
  return (
    <div>
      <Title>Blog</Title>

      {posts.map(({ date, href, title, excerpt }) =>
        <div key={href}>
          <h5>{date}</h5>
          <h4>
            <Link href={href} prefetch>
              <a>{title}</a>
            </Link>
          </h4>
          {excerpt}
          <h5>
            <Link href={href} prefetch>
              <a>Read more</a>
            </Link>
          </h5>
        </div>
      )}
    </div>
  );
}

export default wrapBody(Blog);
