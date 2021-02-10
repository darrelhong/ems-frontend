import { ChakraProvider } from '@chakra-ui/react';

import theme from '../styles/theme';

export default function ChakraWrapper({ children }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
}
