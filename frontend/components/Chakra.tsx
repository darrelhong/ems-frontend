// from https://chakra-ui.com/docs/features/color-mode
// to be used if necessary
// will break SSG

import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

const Chakra = ({
  cookies,
  children,
}: {
  cookies: string;
  children: React.ReactNode;
}): JSX.Element => {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager;
  return (
    <ChakraProvider colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};

export default Chakra;

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: {
    // first time users will not have any cookies and you may not return
    // undefined here, hence ?? is necessary
    cookies: req.headers.cookie ?? '',
  },
});
