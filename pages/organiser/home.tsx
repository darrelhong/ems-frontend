import Head from 'next/head';
import { Heading, Skeleton, Text } from '@chakra-ui/react';

import useUser from '../../lib/query/useUser';

import { OrganiserNavBar } from '../../components/NavBar/NavBar';
import PageContainer from '../../components/PageContainer';
import withProtectRoute from '../../components/ProtectRouteWrapper';

function OrganiserHome(): JSX.Element {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <>
      <Head>
        <title>Organiser Dasboard</title>
      </Head>

      <OrganiserNavBar />

      <PageContainer>
        <Heading>Organiser Home</Heading>
        {isLoading && <Skeleton height="40px" />}
        {isSuccess && (
          <>
            <Text>Name: {user?.name}</Text>
            <Text>User ID: {user?.id}</Text>
          </>
        )}
      </PageContainer>
    </>
  );
}

export default withProtectRoute(OrganiserHome, {
  redirectTo: '/organiser/login',
});
