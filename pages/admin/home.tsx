import { Heading } from '@chakra-ui/react';
import Head from 'next/head';
import NavBar from '../../components/NavBar';
import PageContainer from '../../components/PageContainer';
import withProtectRoute from '../../components/ProtectRouteWrapper';

function AdminHome(): JSX.Element {
  return (
    <>
      <Head>
        <title>Admin Dasboard</title>
      </Head>
      <NavBar />

      <PageContainer>
        <Heading>Admin Home</Heading>
      </PageContainer>
    </>
  );
}

export default withProtectRoute(AdminHome, { redirectTo: '/admin/login' });