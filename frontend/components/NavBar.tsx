import NextLink from 'next/link';
import { Flex, Link, Spacer } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { pageContainerWidths } from './PageContainer';

export default function NavBar() {
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
