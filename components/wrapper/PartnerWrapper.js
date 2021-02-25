import Head from 'next/head';
import PropTypes from 'prop-types';

import { FooterOne } from '../Footer';

import PartnerHeader from '../Header/PartnerHeader';
import withProtectRoute from '../ProtectRouteWrapper';

function PartnerWrapper({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <PartnerHeader />

      {children}

      <FooterOne />
    </>
  );
}

PartnerWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default withProtectRoute(PartnerWrapper, {
  redirectTo: '/partner/login',
});
