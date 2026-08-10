import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';

import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomeScreen />
    </ThemeProvider>
  );
}
