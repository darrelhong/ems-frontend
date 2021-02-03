import NextLink from 'next/link';
import { Flex, Link, Spacer } from '@chakra-ui/react';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { pageContainerWidths } from '../PageContainer';
import { AdminNavBarMenu, OrganiserNavBarMenu } from './NavBarMenu';

type NavBarProps = {
  homeHref: string;
  menu?: React.ReactNode;
};

export default function NavBar({
  homeHref = '/',
  menu,
}: NavBarProps): JSX.Element {
  return (
    <Flex borderBottom="1px" borderColor="gray.200" justifyContent="center">
      <Flex w="100%" maxW={pageContainerWidths} p={2} alignItems="center">
        <NextLink href={homeHref}>
          <Link>Home</Link>
        </NextLink>
        <Spacer />
        {menu}
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
}

export function AdminNavBar(): JSX.Element {
  return <NavBar homeHref="/admin/home" menu={<AdminNavBarMenu />}></NavBar>;
}

export function OrganiserNavBar(): JSX.Element {
  return (
    <NavBar homeHref="/organiser/home" menu={<OrganiserNavBarMenu />}></NavBar>
  );
}
