'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import { ACCENT_GRADIENT } from '../components/landingTokens';

/**
 * JoinOrigin styled 404 boundary (TASK-208).
 *
 * A stable, self-contained not-found page so unknown routes (including the
 * well-known-path probes browsers/DevTools fire at page load) render this
 * styled boundary instead of racing the main page stream through the default
 * `_not-found` machinery. The visual language mirrors the landing page:
 * dark background, brand mark + wordmark, gradient-accent heading, and a
 * gradient CTA back home — no modal, no CSV, no API involvement.
 *
 * The root layout wraps every route in `Registry` (style collection) but the
 * `ThemeProvider`s live in `page.tsx`, which is not rendered for unknown
 * routes — so this boundary provides its own theme context.
 */

const PageRoot = styled.main`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.xxl}px;
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

const Brand = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const BrandMark = styled(Image)`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 20px;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.colors.text};
`;

const Status = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 72px;
  line-height: 1;
  background: ${ACCENT_GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Heading = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.heading}px;
  color: ${({ theme }) => theme.colors.text};
`;

const Copy = styled.p`
  margin: 0;
  max-width: 420px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 28px;
  border-radius: 999px;
  background: ${ACCENT_GRADIENT};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primaryContrast};
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(79, 125, 249, 0.35);
  }
`;

export default function NotFound() {
  return (
    <ThemeProvider theme={theme}>
      <PageRoot data-testid="not-found-page">
        <Brand>
          <BrandMark src="/assets/logo/joinorigin-mark.svg" alt="" width={32} height={32} />
          <Wordmark>JoinOrigin</Wordmark>
        </Brand>
        <Status>404</Status>
        <Heading>Page not found</Heading>
        <Copy>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Head back home to find
          where your team&rsquo;s next project begins.
        </Copy>
        <HomeLink href="/">Back to home</HomeLink>
      </PageRoot>
    </ThemeProvider>
  );
}
