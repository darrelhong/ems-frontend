import { Heading, Skeleton, Text } from '@chakra-ui/react';

import useUser from '../../lib/query/useUser';

import { OrganiserPageWrapper } from '../../components/wrapper/PageWrapper';
import withProtectRoute from '../../components/ProtectRouteWrapper';
import ChakraWrapper from '../../components/ChakraWrapper';

function OrganiserHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <ChakraWrapper>
      <OrganiserPageWrapper title="Organiser Dashboard">
        <Heading>Organiser Home</Heading>
        {isLoading && <Skeleton height="40px" />}
        {isSuccess && (
          <>
            <Text>Name: {user?.name}</Text>
            <Text>User ID: {user?.id}</Text>
          </>
        )}
      </OrganiserPageWrapper>
    </ChakraWrapper>
  );
}

export default withProtectRoute(OrganiserHome, {
  redirectTo: '/organiser/login',
});
