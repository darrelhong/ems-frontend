import Head from 'next/head';
import PropTypes from 'prop-types';

import { FooterOne } from '../Footer';

import GuestHeader from '../Header/GuestHeader';

function GuestWrapper({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <GuestHeader />

      {children}

      <FooterOne />
    </>
  );
}

GuestWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default GuestWrapper;
