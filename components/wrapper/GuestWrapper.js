import Head from 'next/head';
import PropTypes from 'prop-types';

import { FooterOne } from '../Footer';

import GuestHeader from '../Header/GuestHeader';
import withProtectRoute from '../ProtectRouteWrapper';

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
  title: PropTypes.string,
  children: PropTypes.node,
};

// export default withProtectRoute(GuestWrapper, {
//   redirectTo: '/index',
// });
export default GuestWrapper;
