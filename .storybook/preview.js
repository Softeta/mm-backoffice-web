import "Theme/index.css"

import { addDecorator } from '@storybook/react';
import { ThemeProvider } from "@emotion/react";
import Theme from 'Theme/theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator((story) => (
  <ThemeProvider theme={Theme}>{story()}</ThemeProvider>
));