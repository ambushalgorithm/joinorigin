import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import styled, { css } from 'styled-components/native';
import { theme } from '@joinorigin/design';

export type TextVariant = 'caption' | 'body' | 'bodyLarge' | 'title' | 'heading' | 'display';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColor = keyof typeof theme.colors;

export interface TextProps extends RNTextProps {
  /** Typography scale variant (default: body). */
  variant?: TextVariant;
  /** Font weight (default: regular). */
  weight?: TextWeight;
  /** Color token name (default: text). */
  color?: TextColor;
}

const variantStyles: Record<TextVariant, TextStyle> = {
  caption: { fontSize: theme.typography.caption, lineHeight: 16 },
  body: { fontSize: theme.typography.body, lineHeight: 20 },
  bodyLarge: { fontSize: theme.typography.bodyLarge, lineHeight: 24 },
  title: { fontSize: theme.typography.title, lineHeight: 28 },
  heading: { fontSize: theme.typography.heading, lineHeight: 36 },
  display: { fontSize: theme.typography.display, lineHeight: 44 },
};

const StyledText = styled(RNText)<{
  $variant: TextVariant;
  $weight: TextWeight;
  $color: TextColor;
}>`
  color: ${({ theme, $color }) => theme.colors[$color]};
  font-weight: ${({ theme, $weight }) => theme.fontWeights[$weight]};
  ${({ $variant }) => css`
    font-size: ${variantStyles[$variant].fontSize}px;
    line-height: ${variantStyles[$variant].lineHeight}px;
  `}
`;

export function Text({ variant = 'body', weight = 'regular', color = 'text', ...rest }: TextProps) {
  return <StyledText $variant={variant} $weight={weight} $color={color} {...rest} />;
}
