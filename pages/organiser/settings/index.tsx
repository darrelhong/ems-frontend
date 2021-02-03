import NextLink from 'next/link';
import {
  Avatar,
  Divider,
  Grid,
  GridItem,
  Link,
  Skeleton,
  Text,
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
          gridTemplate="1fr 1fr/ 48px 1fr"
          columnGap={3}
          alignItems="center"
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
      <Card my={4}>
        <Text fontWeight="bold">Account settings</Text>
        <Divider />
        <Grid mt={2}>
          <NextLink href="/organiser/settings" passHref>
            <Link>Change password</Link>
          </NextLink>
        </Grid>
      </Card>

      <ChangePasswordForm />
    </OrganiserPageWrapper>
  );
}

export default withProtectRoute(OrganiserSettings, {
  redirectTo: '/organiser/login',
});
