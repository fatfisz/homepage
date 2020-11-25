import Head from 'next/head';
import PropTypes from 'prop-types';

const baseTitle = "FatFisz's homepage";

export default function Title({ children }) {
  const joint = children ? ' - ' : '';
  const title = `${children}${joint}${baseTitle}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="og:title" content={title} />
    </Head>
  );
}

Title.propTypes = {
  children: PropTypes.string,
};

Title.defaultProps = {
  children: '',
};
