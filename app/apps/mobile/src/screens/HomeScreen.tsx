import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { useI18n } from '@joinorigin/i18n';
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
 * components and design tokens from the @joinorigin packages. All copy comes
 * from the active locale dictionary (`mobile.home.*`), which mirrors the
 * device OS language via the i18n provider (arch-i18n §6.4).
 */
export default function HomeScreen() {
  const { t } = useI18n();

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <SafeArea>
        <Content>
          <WelcomeCard elevated>
            <Badge label={t('mobile.home.badge')} tone="primary" />
            <Text variant="display" weight="bold" color="text">
              {t('mobile.home.title')}
            </Text>
            <Text variant="bodyLarge" color="textMuted">
              {t('mobile.home.subtitle')}
            </Text>
          </WelcomeCard>
        </Content>
      </SafeArea>
    </Screen>
  );
}
