import PropTypes from 'prop-types';
import Head from 'next/head';

import { OrganiserNavBar, PartnerNavBar } from '../NavBar/NavBar';
import PageContainer from '../PageContainer';

function PageWrapper({ title, navbar, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {navbar}

      <PageContainer>{children}</PageContainer>
    </>
  );
}

PageWrapper.propTypes = {
  title: PropTypes.string,
  navbar: PropTypes.node,
  children: PropTypes.node,
};

export function OrganiserPageWrapper({ ...props }) {
  return <PageWrapper {...props} navbar={<OrganiserNavBar />} />;
}

export function PartnerPageWrapper({ ...props }) {
  return <PageWrapper {...props} navbar={<PartnerNavBar />} />;
}
