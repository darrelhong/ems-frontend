import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    heading: 'Raleway',
    body: 'Raleway',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#F3F4F6', 'gray.800')(props),
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'purple',
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: 'md',
        },
      },
    },
  },
});

export default theme;
