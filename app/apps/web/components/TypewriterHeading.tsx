'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import { ACCENT_GRADIENT } from './landingTokens';
import { useReducedMotion } from './motion';

/**
 * Typewriter hero heading (spec §5.3, arch-i18n §7.1).
 *
 * Copy comes from the active locale dictionary: `home.hero.headline` (full
 * text) + `home.hero.headlineAccent` (gradient-accent fragment). EN headline
 * is `Ideas, projects and community collaboration space — where teams and the
 * best projects find their Origin.` with accent `Origin.` — first 97
 * characters as block line, remainder in accent gradient on the next line.
 *
 * Locale-aware split: the component splits at the LAST case-insensitive
 * occurrence of the brand token "Origin" inside the translated headline, so
 * the gradient fragment always starts with the brand word — no hardcoded
 * `SPLIT_INDEX = length - 7` and no dependence on the literal accent string
 * (locales that place grammar after "Origin" — id, ko, ja, tr, vi, th,
 * zh-TW — don't contain the literal `Origin.` / `Origin。` accent). If the
 * brand token is absent the accent-based split is kept; if the accent is
 * empty the whole text renders unstyled (no crash). Types char-by-char at
 * 20ms/char after a 400ms delay, with a blinking caret (`|`) that persists.
 *
 * Progressive enhancement: the full text is rendered by default (SSR /
 * no-JS), then cleared and re-typed on client mount. With
 * `prefers-reduced-motion`, the full text renders instantly with no caret
 * animation.
 */

const CHAR_DELAY_MS = 20;
const START_DELAY_MS = 400;

/** Brand token that must begin the emphasized (gradient) fragment. */
const BRAND_TOKEN = 'origin';

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

const Body = styled.span<{ $isBlock: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  display: ${({ $isBlock = false }) => ($isBlock ? 'block' : 'inline')};
`;

const Accent = styled.span<{ $isVisible: boolean }>`
  background: ${ACCENT_GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-decoration: underline;
  visibility: ${({ $isVisible = true }) => ($isVisible ? 'visible' : 'hidden')};
  font-size: 68px;
  line-height: 86px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    font-size: 68px;
    line-height: 86px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    font-size: 56px;
    line-height: 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    font-size: 48px;
    line-height: 56px;
  }
`;

const Caret = styled.span<{ $reduced: boolean }>`
  display: inline-block;
  margin-inline-start: 2px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  animation: ${({ $reduced }) =>
    $reduced
      ? 'none'
      : css`
          ${blink} 1s steps(1) infinite
        `};
  font-size: 68px;
  line-height: 86px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    font-size: 68px;
    line-height: 86px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    font-size: 56px;
    line-height: 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    font-size: 48px;
    line-height: 56px;
  }
`;

export function TypewriterHeading() {
  const reduced = useReducedMotion();
  const { t } = useI18n();
  const fullText = t('home.hero.headline');
  const accentText = t('home.hero.headlineAccent');

  // Brand-token split point (arch-i18n §7.1): the emphasized fragment must
  // start with the brand word "Origin". Locales that place grammar AFTER the
  // brand word (id, ko, ja, tr, vi, th, zh-TW) don't contain the literal
  // accent string (e.g. `Origin.` / `Origin。`), so instead of
  // `indexOf(accentText)` + a `length - accentLength` fallback we locate the
  // LAST case-insensitive occurrence of the brand token inside the translated
  // headline and split there. When the brand token is absent the accent-based
  // split is kept; when the accent is empty the whole headline renders
  // unstyled (no crash).
  const splitIndex = useMemo(() => {
    const lowered = fullText.toLocaleLowerCase();
    const brandIndex = lowered.lastIndexOf(BRAND_TOKEN);
    if (brandIndex >= 0) {
      return brandIndex;
    }
    const index = accentText ? lowered.indexOf(accentText.toLocaleLowerCase()) : -1;
    return index >= 0 ? index : fullText.length - accentText.length;
  }, [fullText, accentText]);

  const [visible, setVisible] = useState(fullText);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduced) {
      setVisible(fullText);
      return undefined;
    }

    setVisible('');
    timerRef.current = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        index += 1;
        setVisible(fullText.slice(0, index));
        if (index >= fullText.length) {
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
  }, [reduced, fullText]);

  const renderTyped = (text: string) => {
    if (text.length <= splitIndex) {
      return (
        <>
          <Body $isBlock={false}>{text}</Body>
          <Accent $isVisible={false}>{text.slice(splitIndex)}</Accent>
        </>
      );
    }
    return (
      <>
        <Body $isBlock={true}>{text.slice(0, splitIndex)}</Body>
        <Accent $isVisible={true}>{text.slice(splitIndex)}</Accent>
      </>
    );
  };

  return (
    <Heading>
      {renderTyped(visible)}
      <Caret $reduced={reduced} aria-hidden="true">
        |
      </Caret>
    </Heading>
  );
}

export default TypewriterHeading;
