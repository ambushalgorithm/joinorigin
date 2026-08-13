import styled from 'styled-components';

import { ACCENT_GRADIENT, ENTRANCE_EASING } from './landingTokens';

/**
 * Shared styled primitives for the Sprint 4 menu pages (TASK-215).
 *
 * These mirror the landing design language (dark surfaces, Urbanist display
 * headings, Inter body copy, brand accent gradient, muted secondary text)
 * while keeping the content pages semantic: every page renders exactly one
 * `<h1>` inside `<PageHeader>`, `<section>` blocks with `<h2>` headings, and
 * FAQ blocks as `<section>` + `<h2>` per question (arch §5.1, discovery §8.4).
 *
 * Sprint 8 redesign additions (spec sprint-8-menu-redesign §5): `Eyebrow`,
 * `HeroScene`, hover lift/glow on `Card`, framed `Quote`, and the gradient
 * tick on `SectionTitle` — all purely visual, no semantics changed.
 */

export const PageContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 96px 64px 64px;

  @media (max-width: 1024px) {
    padding: 64px 32px;
  }

  @media (max-width: 480px) {
    padding: 48px 20px;
  }
`;

export const PageHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

export const PageTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.displayLg}px;
  line-height: 1.1;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.display}px;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.heading}px;
  }
`;

export const PageLead = styled.p`
  margin: 0;
  max-width: 720px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/**
 * Small uppercase brand tag above the H1 (spec sprint-8 §4.1). Inter 500
 * 12px, `0.14em` letter-spacing, primary blue, subtle chip surface.
 */
export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary}59;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background: ${({ theme }) => theme.colors.primary}14;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`;

/**
 * Hero scene wrapper (spec sprint-8 §4.1, sprint-10-menu-anim §5.5). Positions
 * the INLINE scene SVG (replaces the old `<img>` — GSAP owns all scene motion
 * in one document) and paints the per-page glow as a `::before`
 * (pointer-events: none) behind it. The scene art itself is decorative
 * (`alt=""` + `aria-hidden`).
 */
export const HeroScene = styled.div<{ $glow?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $glow }) => $glow ?? 'none'};
    pointer-events: none;
  }

  /* GSAP rotates SVG groups around their fill-box center (spec §5.3). */
  .scene-orbit-group,
  .scene-main-group,
  .scene-node {
    transform-box: fill-box;
    transform-origin: center;
  }

  svg {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 560px;
    height: auto;
  }

  @media (max-width: 480px) {
    svg {
      max-width: 320px;
    }
  }
`;

export const Section = styled.section`
  margin: 0 0 ${({ theme }) => theme.spacing.xxl}px;
`;

export const SectionTitle = styled.h2`
  position: relative;
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  padding-inline-start: 12px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.heading}px;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.colors.text};

  /* Small gradient tick for wayfinding (spec sprint-8 §5). */
  &::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 100%;
    border-radius: 2px;
    background: ${ACCENT_GRADIENT};
  }
`;

export const SubTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.title}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const BodyCopy = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const Card = styled.article`
  padding: ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  transition:
    transform 0.25s ${ENTRANCE_EASING},
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  /* Hover/focus lift + glow (spec sprint-8 §5) — purely visual, no content change. */
  &:hover,
  &:focus-within {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow:
      0 12px 32px rgba(10, 16, 34, 0.6),
      0 0 0 1px ${({ theme }) => theme.colors.primary}2E;
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.title}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CardBody = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** Visible FAQ block — `<section>` with `<h2>` per question + `<p>` answer. */
export const FaqSection = styled.section``;

/** FAQ item (kept exported — existing tests reference it; views use FaqCard). */
export const FaqItem = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
`;

/**
 * FAQ item as a card (spec sprint-10 §4.8): surface card, hover lift + primary
 * border tint + soft shadow. Semantics unchanged — children keep the `h3`
 * question and `p` answer so the FAQ JSON-LD mirror stays 1:1.
 */
export const FaqCard = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  transition:
    transform 0.25s ${ENTRANCE_EASING},
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover,
  &:focus-within {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow:
      0 12px 32px rgba(10, 16, 34, 0.6),
      0 0 0 1px ${({ theme }) => theme.colors.primary}2E;
  }
`;

export const FaqQuestion = styled.h3`
  position: relative;
  margin: 0 0 ${({ theme }) => theme.spacing.xs}px;
  padding-inline-start: 12px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.title}px;
  color: ${({ theme }) => theme.colors.text};

  /* Small gradient tick for wayfinding (spec sprint-10 §4.8, same as SectionTitle). */
  &::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 100%;
    border-radius: 2px;
    background: ${ACCENT_GRADIENT};
  }
`;

export const FaqAnswer = styled.p`
  margin: 0;
  max-width: 720px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Stat = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
`;

export const StatValue = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.display}px;
  background: ${ACCENT_GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  padding-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

/**
 * Stat pill host for the count-up hero meta (spec sprint-10 §5.2): bordered,
 * blurred pill that hosts `CountUpStat` in hero action rows.
 */
export const StatPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding: 10px 18px;
  border: 1px solid ${({ theme }) => theme.colors.primary}59;
  background: rgba(20, 29, 60, 0.7);
  border-radius: ${({ theme }) => theme.radius.pill}px;
  margin-bottom: ${({ theme }) => theme.typography.caption}px;
`;

/** Real `<table>` semantics for the /features comparison table (discovery §8.4). */
export const CompareTable = styled.table`
  width: 100%;
  max-width: 880px;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  border-top: 2px solid transparent;
  border-image: ${ACCENT_GRADIENT} 1;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease;

  &:last-of-type {
    border-bottom: 0;
  }

  /* Row hover (spec sprint-10 §8.1) */
  &:hover {
    background: rgba(20, 29, 60, 0.6);
  }
`;

export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.sm}px;
  text-align: start;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surfaceElevated};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: ${({ theme }) => theme.spacing.md}px;
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  vertical-align: top;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: ${({ theme }) => theme.spacing.md}px;
  }
`;

export const BulletList = styled.ul`
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  padding-inline-start: ${({ theme }) => theme.spacing.lg}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

/** Gradient accent link used for inline CTAs (whitepaper/support links). */
export const AccentLink = styled.a`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

export const Quote = styled.blockquote`
  margin: ${({ theme }) => theme.typography.caption}px 0;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-inline-start: 3px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.title}px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;
