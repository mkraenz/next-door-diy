// 1. Import the extendTheme function
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
// const colors = {
//   brand: {
//     900: "#1a365d",
//     800: "#153e75",
//     700: "#2a69ac",
//   },
// };

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },
    components: {
      Button: {
        baseStyle: {
          textTransform: 'capitalize',
        },
      },
      variants: {
        base: {},
      },
      defaultProps: {
        variant: 'base',
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'blue' })
);
