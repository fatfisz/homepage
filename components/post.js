import Head from 'next/head';
import PropTypes from 'prop-types';
import reactFromObject from 'react-from-object';

import Body from 'components/body';
import Disqus from 'components/disqus';
import CodeExampleStyles from 'components/code-example-styles';
import DisqusLink from 'components/disqus-link';
import Title from 'components/title';


export default function Post({ body, date, excerpt, id, title }) {
  const href = `/blog/${id}`;

  return (
    <Body>
      <Title>{title}</Title>
      <Head>
        <meta name="og:url" content={`https://fatfisz.com${href}`} />
        <meta name="og:description" content={excerpt} />
      </Head>

      <h5 className="date-header">
        <div className="date">
          {date}
        </div>
        <DisqusLink href={href} id={id} />
      </h5>

      <h2>{title}</h2>

      <CodeExampleStyles />
      {reactFromObject(JSON.parse(body))}

      <Disqus url={href} id={id} />

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

Post.propTypes = {
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Post.getQuery = (id) => `
  {
    post(id: ${JSON.stringify(id)}) {
      id
      date
      title
      excerpt
      body
    }
  }
`;
