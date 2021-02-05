import { Heading, Skeleton, Text } from '@chakra-ui/react';

import useUser from '../../lib/query/useUser';

import { PartnerPageWrapper } from '../../components/wrapper/PageWrapper';
import withProtectRoute from '../../components/ProtectRouteWrapper';

function PartnerHome(): JSX.Element {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <PartnerPageWrapper title="Partner Dashboard">
      <Heading>Partner Home</Heading>
      {isLoading && <Skeleton height="40px" />}
      {isSuccess && (
        <>
          <Text>Name: {user?.name}</Text>
          <Text>User ID: {user?.id}</Text>
        </>
      )}
    </PartnerPageWrapper>
  );
}

export default withProtectRoute(PartnerHome, {
  redirectTo: '/partner/login',
});
