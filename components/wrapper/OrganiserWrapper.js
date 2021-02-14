import Head from 'next/head';
import PropTypes from 'prop-types';

import { FooterOne } from '../Footer';

import OrganiserHeader from '../Header/OrganiserHeader';
import withProtectRoute from '../ProtectRouteWrapper';

function OrganiserWrapper({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <OrganiserHeader />

      {children}

      <FooterOne />
    </>
  );
}

OrganiserWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default withProtectRoute(OrganiserWrapper, {
  redirectTo: '/organiser/login',
});
