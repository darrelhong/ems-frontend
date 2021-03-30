import Head from 'next/head';
import PropTypes from 'prop-types';

import { FooterOne } from '../Footer';

import AttendeeHeader from '../Header/AttendeeHeader';
import withProtectRoute from '../ProtectRouteWrapper';

function AttendeeWrapper({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <AttendeeHeader />

      {children}

      <FooterOne />
    </>
  );
}

AttendeeWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default withProtectRoute(AttendeeWrapper, {
  redirectTo: '/attendee/login',
});