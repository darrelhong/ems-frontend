import PropTypes from 'prop-types';
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
import Card from '../Card';
import { OrganiserPageWrapper } from '../wrapper/PageWrapper';
import withProtectRoute from '../ProtectRouteWrapper';
import useUser from '../../lib/query/useUser';

function SettingsWrapper({ children }) {
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
                <Link>Update profile</Link>
              </NextLink>
              <NextLink href="/organiser/settings/change-password" passHref>
                <Link>Change password</Link>
              </NextLink>
            </VStack>
          </Card>
        </GridItem>

        {children}
      </Grid>
    </OrganiserPageWrapper>
  );
}

export default withProtectRoute(SettingsWrapper, {
  redirectTo: '/organiser/login',
});

SettingsWrapper.propTypes = {
  children: PropTypes.node,
};
