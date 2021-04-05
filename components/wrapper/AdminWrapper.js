import Head from 'next/head';
import PropTypes from 'prop-types';

import { FooterOne } from '../Footer';

import withProtectRoute from '../ProtectRouteWrapper';
import AdminHeaderTop from 'components/Header/AdminHeaderTop';

function AdminWrapper({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <AdminHeaderTop />

      {children}

      <FooterOne />
    </>
  );
}

AdminWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default withProtectRoute(AdminWrapper, {
  redirectTo: '/admin/login',
});
