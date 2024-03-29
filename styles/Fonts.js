// from guide: https://chakra-ui.com/guides/custom-fonts

import { Global } from '@emotion/react';

export const Fonts = () => (
  <Global
    styles={`
  /* Copied from https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap */

  /* latin */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(/fonts/Raleway/Raleway-Light.ttf);
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* latin */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(/fonts/Raleway/Raleway-Regular.ttf);
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* latin */
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(/fonts/Raleway/Raleway-SemiBold.ttf);
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(/fonts/Raleway/Raleway-Bold.ttf);
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  `}
  />
);
