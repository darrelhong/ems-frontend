// from https://chakra-ui.com/docs/features/color-mode
// to be used if necessary
// will break SSG
import PropTypes from 'prop-types';
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react';

const Chakra = ({ cookies, children }) => {
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

export const getServerSideProps = async ({ req }) => ({
  props: {
    // first time users will not have any cookies and you may not return
    // undefined here, hence ?? is necessary
    cookies: req.headers.cookie ?? '',
  },
});

Chakra.propTypes = {
  cookies: PropTypes.string,
  children: PropTypes.node,
};
