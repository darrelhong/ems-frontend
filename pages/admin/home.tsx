import Head from 'next/head';
import { Heading, Skeleton, Text } from '@chakra-ui/react';

import useUser from '../../lib/query/useUser';

import { AdminNavBar } from '../../components/NavBar/NavBar';
import PageContainer from '../../components/PageContainer';
import withProtectRoute from '../../components/ProtectRouteWrapper';
import ChakraWrapper from '../../components/ChakraWrapper';

function AdminHome(): JSX.Element {
  const { data: user, isSuccess, isLoading } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <ChakraWrapper>
      <Head>
        <title>Admin Dasboard</title>
      </Head>
      <AdminNavBar />

      <PageContainer>
        <Heading>Admin Home</Heading>
        {isLoading && <Skeleton height="40px" />}
        {isSuccess && (
          <>
            <Text>{user?.name}</Text>
            <Text>User ID: {user?.id}</Text>
          </>
        )}
      </PageContainer>
    </ChakraWrapper>
  );
}

export default withProtectRoute(AdminHome, { redirectTo: '/admin/login' });
