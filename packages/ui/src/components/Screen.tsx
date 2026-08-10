import React, { PropsWithChildren } from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

export type ScreenProps = ViewProps;

const StyledScreen = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

/** Full-screen container used as the base layout root of a screen. */
export function Screen({ children, ...rest }: PropsWithChildren<ScreenProps>) {
  return <StyledScreen {...rest}>{children}</StyledScreen>;
}
