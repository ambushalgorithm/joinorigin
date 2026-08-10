'use client';

import { ThemeProvider } from 'styled-components/native';
import styled from 'styled-components/native';
import { theme } from '@joinorigin/design';
import { Badge, Button, Card, Screen, Text } from '@joinorigin/ui';

/**
 * Landing hero: a centered card that showcases the shared design system.
 * All colors/spacing/typography come from @joinorigin/design tokens and
 * every visual element is a base component from @joinorigin/ui.
 */
const Hero = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Screen>
        <Hero>
          <Card elevated>
            <Badge label="Welcome" tone="primary" />
            <Text variant="display" weight="bold" color="text">
              Welcome to JoinOrigin
            </Text>
            <Text variant="bodyLarge" color="textMuted">
              Your workspace is ready.
            </Text>
            <Button
              label="Get started"
              variant="primary"
              onPress={() => {
                // Landing shell: navigation wiring arrives with the app shell
                // phase. No-op keeps the shared Button on display.
              }}
            />
          </Card>
        </Hero>
      </Screen>
    </ThemeProvider>
  );
}
