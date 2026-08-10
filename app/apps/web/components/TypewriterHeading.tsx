'use client';

import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { ACCENT_GRADIENT } from './landingTokens';
import { useReducedMotion } from './motion';

/**
 * Typewriter hero heading (spec §5.3).
 *
 * Copy: `Where teams find their origin` — the first 21 characters render in
 * `theme.colors.text`, the remainder (` origin`) in the brand accent gradient.
 * Types char-by-char at 35ms/char after a 400ms delay, with a blinking caret
 * (`▍`) that persists after completion.
 *
 * Progressive enhancement: the full text is rendered by default (SSR / no-JS),
 * then cleared and re-typed on client mount. With `prefers-reduced-motion`,
 * the full text renders instantly with no caret animation.
 */

const FULL_TEXT = 'Where teams find their origin';
const SPLIT_INDEX = 21;
const CHAR_DELAY_MS = 35;
const START_DELAY_MS = 400;

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const Heading = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.displayXl}px;
  line-height: 64px;
  letter-spacing: -1.5px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    font-size: 48px;
    line-height: 56px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    font-size: 36px;
    line-height: 44px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    font-size: 28px;
    line-height: 36px;
  }
`;

const Body = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const Accent = styled.span`
  background: ${ACCENT_GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Caret = styled.span<{ $reduced: boolean }>`
  display: inline-block;
  margin-left: 2px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  animation: ${({ $reduced }) =>
    $reduced
      ? 'none'
      : css`
          ${blink} 1s steps(1) infinite
        `};
`;

function renderTyped(text: string) {
  if (text.length <= SPLIT_INDEX) {
    return <Body>{text}</Body>;
  }
  return (
    <>
      <Body>{text.slice(0, SPLIT_INDEX)}</Body>
      <Accent>{text.slice(SPLIT_INDEX)}</Accent>
    </>
  );
}

export function TypewriterHeading() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(FULL_TEXT);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduced) {
      setVisible(FULL_TEXT);
      return undefined;
    }

    setVisible('');
    timerRef.current = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        index += 1;
        setVisible(FULL_TEXT.slice(0, index));
        if (index >= FULL_TEXT.length) {
          clearInterval(interval);
        }
      }, CHAR_DELAY_MS);
      timerRef.current = interval;
    }, START_DELAY_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [reduced]);

  return (
    <Heading>
      {renderTyped(visible)}
      <Caret $reduced={reduced} aria-hidden="true">
        ▍
      </Caret>
    </Heading>
  );
}

export default TypewriterHeading;
