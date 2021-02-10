import { Heading, Skeleton, Text } from '@chakra-ui/react';

import useUser from '../../lib/query/useUser';

import { PartnerPageWrapper } from '../../components/wrapper/PageWrapper';
import withProtectRoute from '../../components/ProtectRouteWrapper';
import ChakraWrapper from '../../components/ChakraWrapper';

function PartnerHome() {
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <ChakraWrapper>
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
    </ChakraWrapper>
  );
}

export default withProtectRoute(PartnerHome, {
  redirectTo: '/partner/login',
});
