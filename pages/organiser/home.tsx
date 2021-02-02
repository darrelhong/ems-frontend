import Head from 'next/head';
import { Heading } from '@chakra-ui/react';

import NavBar from '../../components/NavBar/NavBar';
import PageContainer from '../../components/PageContainer';
import withProtectRoute from '../../components/ProtectRouteWrapper';

function OrganiserHome(): JSX.Element {
  return (
    <>
      <Head>
        <title>Organiser Dasboard</title>
      </Head>
      <NavBar />

      <PageContainer>
        <Heading>Organiser Home</Heading>
      </PageContainer>
    </>
  );
}

export default withProtectRoute(OrganiserHome, {
  redirectTo: '/organiser/login',
});
