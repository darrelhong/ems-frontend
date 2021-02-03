import { Heading, Skeleton, Text } from '@chakra-ui/react';

import useUser from '../../lib/query/useUser';

import OrganiserPageWrapper from '../../components/wrapper/OrganiserPageWrapper';
import withProtectRoute from '../../components/ProtectRouteWrapper';

function OrganiserHome(): JSX.Element {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
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
  );
}

export default withProtectRoute(OrganiserHome, {
  redirectTo: '/organiser/login',
});
