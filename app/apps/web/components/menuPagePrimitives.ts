import styled from 'styled-components';

import { ACCENT_GRADIENT } from './landingTokens';

/**
 * Shared styled primitives for the Sprint 4 menu pages (TASK-215).
 *
 * These mirror the landing design language (dark surfaces, Urbanist display
 * headings, Inter body copy, brand accent gradient, muted secondary text)
 * while keeping the content pages semantic: every page renders exactly one
 * `<h1>` inside `<PageHeader>`, `<section>` blocks with `<h2>` headings, and
 * FAQ blocks as `<section>` + `<h2>` per question (arch §5.1, discovery §8.4).
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

export const Section = styled.section`
  margin: 0 0 ${({ theme }) => theme.spacing.xxl}px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.heading}px;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.colors.text};
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

export const FaqItem = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
`;

export const FaqQuestion = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs}px;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.title}px;
  color: ${({ theme }) => theme.colors.text};
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
`;

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
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

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: 0;
  }
`;

export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.md}px;
  text-align: left;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.bodyLarge}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surfaceElevated};
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.body}px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  vertical-align: top;
`;

export const BulletList = styled.ul`
  margin: 0 0 ${({ theme }) => theme.spacing.md}px;
  padding-left: ${({ theme }) => theme.spacing.lg}px;
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
  margin: 0;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0 ${({ theme }) => theme.radius.lg}px ${({ theme }) => theme.radius.lg}px 0;
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.title}px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;
