import Head from 'next/head';
import { PropTypes } from 'react';


const baseTitle = 'FatFisz\'s homepage';

export default function Title({ children }) {
  const joint = children ? ' - ' : '';

  return (
    <Head>
      <title>{children}{joint}{baseTitle}</title>
    </Head>
  );
}

Title.propTypes = {
  children: PropTypes.string,
};

Title.defaultProps = {
  children: '',
};
