import React from 'react';
import styled from 'styled-components/native';
import { theme } from '@joinorigin/design';

import { Text } from './Text';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'destructive';

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  testID?: string;
}

const toneColors: Record<
  BadgeTone,
  { background: keyof typeof theme.colors; text: keyof typeof theme.colors }
> = {
  neutral: { background: 'surfaceElevated', text: 'text' },
  primary: { background: 'primary', text: 'primaryContrast' },
  success: { background: 'success', text: 'primaryContrast' },
  warning: { background: 'warning', text: 'primaryContrast' },
  destructive: { background: 'destructive', text: 'primaryContrast' },
};

const StyledBadge = styled.View<{ $tone: BadgeTone }>`
  align-self: flex-start;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background-color: ${({ theme, $tone }) => theme.colors[toneColors[$tone].background]};
`;

export function Badge({ label, tone = 'neutral', testID }: BadgeProps) {
  return (
    <StyledBadge $tone={tone} testID={testID}>
      <Text variant="caption" weight="semibold" color={toneColors[tone].text}>
        {label}
      </Text>
    </StyledBadge>
  );
}
