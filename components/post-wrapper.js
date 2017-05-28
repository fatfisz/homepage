import PropTypes from 'prop-types';

import Body from 'components/body';
import Disqus from 'components/disqus';
import DisqusLink from 'components/disqus-link';
import Title from 'components/title';


export default function PostWrapper({ children, date, disqusId, href, title }) {
  return (
    <Body>
      <Title>{title}</Title>

      <h5 className="date-header">
        <div className="date">
          {date}
        </div>
        <DisqusLink href={href} id={disqusId} />
      </h5>

      <h2>{title}</h2>

      {children}

      <Disqus url={href} id={disqusId} />

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

PostWrapper.propTypes = {
  children: PropTypes.node,
  date: PropTypes.string.isRequired,
  disqusId: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
