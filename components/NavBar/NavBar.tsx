import NextLink from 'next/link';
import { Flex, Link, Spacer } from '@chakra-ui/react';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { pageContainerWidths } from '../PageContainer';
import { AdminNavBarMenu } from './NavBarMenu';

export default function NavBar(): JSX.Element {
  return (
    <Flex borderBottom="1px" borderColor="gray.200" justifyContent="center">
      <Flex w="100%" maxW={pageContainerWidths} p={2} alignItems="center">
        <NextLink href="/">
          <Link>Home</Link>
        </NextLink>
        <Spacer />
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
}

export function AdminNavBar(): JSX.Element {
  return (
    <Flex borderBottom="1px" borderColor="gray.200" justifyContent="center">
      <Flex w="100%" maxW={pageContainerWidths} p={2} alignItems="center">
        <NextLink href="/admin/home">
          <Link>Home</Link>
        </NextLink>
        <Spacer />
        <AdminNavBarMenu />
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
}