import React from 'react';
import { Badge, Card, Screen, Text } from '@joinorigin/ui';

export default function HomeScreen() {
  return (
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
  );
}
