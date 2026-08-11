import React, { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';
import styled from 'styled-components/native';

export interface CardProps extends ViewProps {
  /** Use the elevated surface tone (default: false). */
  elevated?: boolean;
}

const StyledCard = styled(View)<{ $elevated: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme, $elevated }) =>
    $elevated ? theme.colors.surfaceElevated : theme.colors.surface};
`;

export function Card({ elevated = false, children, ...rest }: PropsWithChildren<CardProps>) {
  return (
    <StyledCard $elevated={elevated} {...rest}>
      {children}
    </StyledCard>
  );
}
