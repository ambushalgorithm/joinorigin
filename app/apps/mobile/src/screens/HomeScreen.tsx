import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { Badge, Card, Screen, Text } from '@joinorigin/ui';

const SafeArea = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WelcomeCard = styled(Card)`
  width: 100%;
`;

/**
 * Home screen — renders the app welcome message using the shared base
 * components and design tokens from the @joinorigin packages.
 */
export default function HomeScreen() {
  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <SafeArea>
        <Content>
          <WelcomeCard elevated>
            <Badge label="Welcome" tone="primary" />
            <Text variant="display" weight="bold" color="text">
              Welcome to JoinOrigin
            </Text>
            <Text variant="bodyLarge" color="textMuted">
              Your workspace is ready.
            </Text>
          </WelcomeCard>
        </Content>
      </SafeArea>
    </Screen>
  );
}
