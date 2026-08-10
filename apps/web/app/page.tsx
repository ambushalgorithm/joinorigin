'use client';

import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';
import { Badge, Card, Screen, Text } from '@joinorigin/ui';

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Screen>
        <Card elevated>
          <Badge label="Welcome" tone="primary" />
          <Text variant="display" weight="bold" color="text">
            Welcome to JoinOrigin
          </Text>
          <Text variant="bodyLarge" color="textMuted">
            Your workspace is ready.
          </Text>
        </Card>
      </Screen>
    </ThemeProvider>
  );
}
