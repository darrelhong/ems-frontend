import Head from 'next/head';
import { Heading } from '@chakra-ui/react';

import { AdminNavBar } from '../../components/NavBar/NavBar';
import PageContainer from '../../components/PageContainer';
import withProtectRoute from '../../components/ProtectRouteWrapper';

function AdminHome(): JSX.Element {
  return (
    <>
      <Head>
        <title>Admin Dasboard</title>
      </Head>
      <AdminNavBar />

      <PageContainer>
        <Heading>Admin Home</Heading>
      </PageContainer>
    </>
  );
}

export default withProtectRoute(AdminHome, { redirectTo: '/admin/login' });
