import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { Text } from './Text';

export interface LoadingIndicatorProps {
  label?: string;
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export function LoadingIndicator({ label }: LoadingIndicatorProps) {
  const theme = useTheme();

  return (
    <Container>
      <ActivityIndicator color={theme.colors.primary} />
      {label ? (
        <Text variant="body" color="textMuted">
          {label}
        </Text>
      ) : null}
    </Container>
  );
}
