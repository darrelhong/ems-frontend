import NextLink from 'next/link';
import {
  Avatar,
  Divider,
  Grid,
  GridItem,
  Link,
  Skeleton,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';

import useUser from '../../../lib/query/useUser';

import Card from '../../../components/Card';
import withProtectRoute from '../../../components/ProtectRouteWrapper';
import OrganiserPageWrapper from '../../../components/wrapper/OrganiserPageWrapper';
import ChangePasswordForm from '../../../components/settings/ChangePasswordForm';

function OrganiserSettings(): JSX.Element {
  const { data: user } = useUser(localStorage.getItem('userId'));

  return (
    <OrganiserPageWrapper title="Settings">
      {user ? (
        <Grid
          gridTemplate="1fr 1fr / 48px 1fr"
          columnGap={3}
          alignItems="center"
          mb={4}
        >
          <GridItem rowSpan={2}>
            <Avatar />
          </GridItem>
          <Text fontSize="lg" fontWeight="bold">
            {user.name}
          </Text>
          <Text>{user.email}</Text>
        </Grid>
      ) : (
        <Skeleton height="48px" />
      )}

      {/* Settings menu */}
      <Grid
        gridAutoFlow={{ md: 'column' }}
        gridTemplateColumns={{ md: '3fr 7fr' }}
        gap={4}
      >
        <GridItem>
          <Card>
            <Text mb={2} fontWeight="bold">
              Account settings
            </Text>
            <Divider borderColor="gray.400" />
            <VStack mt={2} align="stretch" divider={<StackDivider />}>
              <NextLink href="/organiser/settings" passHref>
                <Link>Change password</Link>
              </NextLink>
              <NextLink href="#" passHref>
                <Link>Update profile</Link>
              </NextLink>
            </VStack>
          </Card>
        </GridItem>

        <ChangePasswordForm />
      </Grid>
    </OrganiserPageWrapper>
  );
}

export default withProtectRoute(OrganiserSettings, {
  redirectTo: '/organiser/login',
});
