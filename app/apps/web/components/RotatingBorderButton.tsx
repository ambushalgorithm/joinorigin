import React from 'react';
import styled, { keyframes } from 'styled-components';

import { ROTATING_BORDER_GRADIENT, ENTRANCE_EASING } from './landingTokens';

/**
 * Rotating-border CTA from the design spec (§5.1).
 *
 * - Outer shell draws a rotating conic-gradient ring using the CSS mask
 *   border-only technique (3px, animated via `--border-angle`, 3s linear).
 * - The button body is a dark pill (`theme.colors.surface`) with a label that
 *   keeps its text color.
 * - On hover an accent fill slides in — from the left for "Get Started" /
 *   "Join the waitlist", from the right for "Start Project" — using the
 *   shared `cubic-bezier(0.22, 1, 0.36, 1)` ease.
 *
 * `--border-angle` is registered globally in `GlobalStyles` (`@property`),
 * which is required for animating a custom property.
 */

export interface RotatingBorderButtonProps {
  label: string;
  onClick: () => void;
  /** `large` = Start Project sizing (14px 28px, 16px label); default = 12px 26px, 15px. */
  size?: 'default' | 'large';
  /** Direction the accent fill slides in from on hover. */
  fillDirection?: 'left' | 'right';
  /** Optional trailing icon (e.g. the Start Project chevron). */
  icon?: React.ReactNode;
  className?: string;
  testID?: string;
}

const spinBorder = keyframes`
  from {
    --border-angle: 0deg;
  }
  to {
    --border-angle: 360deg;
  }
`;

const Wrap = styled.div<{ $size: 'default' | 'large' }>`
  position: relative;
  display: inline-flex;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    padding: 3px;
    border-radius: inherit;
    background: ${ROTATING_BORDER_GRADIENT};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: ${spinBorder} 3s linear infinite;
  }
`;

const Fill = styled.span<{ $direction: 'left' | 'right' }>`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: rgba(79, 125, 249, 0.9);
  transform: ${({ $direction }) =>
    $direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)'};
  transition: transform 0.4s ${ENTRANCE_EASING};

  ${Wrap}:hover & {
    transform: translateX(0);
  }
`;

const Body = styled.button<{ $size: 'default' | 'large' }>`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  padding: ${({ $size, theme }) => ($size === 'large' ? '14px 28px' : `12px 26px`)};
  font-size: ${({ $size }) => ($size === 'large' ? 16 : 15)}px;
  transition: background-color 0.2s ease;
`;

const Label = styled.span`
  position: relative;
  z-index: 1;
`;

export function RotatingBorderButton({
  label,
  onClick,
  size = 'default',
  fillDirection = 'left',
  icon,
  className,
  testID,
}: RotatingBorderButtonProps) {
  return (
    <Wrap $size={size} className={className}>
      <Fill $direction={fillDirection} aria-hidden="true" />
      <Body $size={size} type="button" onClick={onClick} data-testid={testID}>
        <Label>{label}</Label>
        {icon ? <span aria-hidden="true">{icon}</span> : null}
      </Body>
    </Wrap>
  );
}

export default RotatingBorderButton;
