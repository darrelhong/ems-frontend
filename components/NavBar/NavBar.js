import PropTypes from 'prop-types';
import { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  IconButton,
  Link,
  Spacer,
  Stack,
  StackDivider,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { pageContainerWidths } from '../PageContainer';
import {
  AdminNavBarMenu,
  OrganiserNavBarMenu,
  PartnerNavBarMenu,
} from './NavBarMenu';

export default function NavBar({
  links = [
    {
      label: 'Home',
      href: '/',
    },
  ],
  menu,
}) {
  const menuType = useBreakpointValue({ base: 'hamburger', md: 'navbar' });
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Flex borderBottom="1px" borderColor="gray.200" justifyContent="center">
        <Stack
          direction="row"
          w="100%"
          maxW={pageContainerWidths}
          p={2}
          alignItems="center"
          spacing={3}
        >
          <Box display={{ md: 'none' }}>
            <IconButton
              icon={<FaBars />}
              aria-label="Show menu"
              variant="ghost"
              color="current"
              onClick={() => setShowMenu(!showMenu)}
            />
          </Box>
          {menuType == 'navbar' &&
            links.map(({ href, label }, index) => (
              <NextLink href={href} passHref key={index}>
                <Link>{label}</Link>
              </NextLink>
            ))}
          <Spacer />
          {menu}
          <ColorModeSwitcher />
        </Stack>
      </Flex>

      {/* hamburger menu */}
      {menuType === 'hamburger' && showMenu && (
        <VStack
          bg="gray.500"
          divider={<StackDivider />}
          p={4}
          alignItems="stretch"
        >
          {links.map(({ href, label }, index) => (
            <NextLink href={href} passHref key={index}>
              <Link>{label}</Link>
            </NextLink>
          ))}
        </VStack>
      )}
    </>
  );
}

NavBar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, href: PropTypes.string })
  ),
  menu: PropTypes.node,
};

export function AdminNavBar() {
  return (
    <NavBar
      menu={<AdminNavBarMenu />}
      links={[
        { href: '/admin/home', label: 'Home' },
        { href: '#', label: 'Link1' },
        { href: '#', label: 'Link2' },
      ]}
    ></NavBar>
  );
}

export function OrganiserNavBar() {
  return (
    <NavBar
      menu={<OrganiserNavBarMenu />}
      links={[
        { href: '/organiser/home', label: 'Home' },
        { href: '#', label: 'Link1' },
        { href: '#', label: 'Link2' },
      ]}
    ></NavBar>
  );
}

export function PartnerNavBar() {
  return (
    <NavBar
      menu={<PartnerNavBarMenu />}
      links={[
        { href: '/partner/home', label: 'Home' },
        { href: '#', label: 'Link1' },
        { href: '#', label: 'Link2' },
      ]}
    ></NavBar>
  );
}
