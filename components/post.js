import PropTypes from 'prop-types';

import Body from 'components/body';
import Disqus from 'components/disqus';
import DisqusLink from 'components/disqus-link';
import Markdown from 'components/markdown';
import Title from 'components/title';


export default function Post({ body, date, id, title }) {
  const href = `/blog/${id}`;

  return (
    <Body>
      <Title>{title}</Title>

      <h5 className="date-header">
        <div className="date">
          {date}
        </div>
        <DisqusLink href={href} id={id} />
      </h5>

      <h2>{title}</h2>

      <Markdown source={body} />

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
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Post.getQuery = (id) => `
  {
    post(id: ${JSON.stringify(id)}) {
      id
      date
      title
      body
    }
  }
`;