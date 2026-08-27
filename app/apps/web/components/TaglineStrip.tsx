'use client';

import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

/**
 * Thin NON-sticky tagline strip (TASK-561, Sprint 24 brand addendum).
 *
 * Rendered by `MenuPageShell` at the very top of every menu page — above the
 * sticky `Header` — as an elegant eyebrow, NOT a banner:
 *  - ~32px tall with the content centered horizontally and vertically
 *  - the localized `footer.tagline` in small muted letter-spaced copy
 *  - hairline bottom border + subtle surface tint to lift it off the canvas
 *
 * Deliberately NON-sticky: the strip is a plain static element so it scrolls
 * away with the page (the `Header` keeps its own `position: sticky`). The
 * homepage renders `home-view.tsx` — never `MenuPageShell` — so the strip is
 * automatically excluded there.
 */
const Strip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tagline = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.caption}px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.4;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: center;
`;

export function TaglineStrip() {
  const { t } = useI18n();

  return (
    <Strip data-testid="tagline-strip">
      <Tagline>{t('footer.tagline')}</Tagline>
    </Strip>
  );
}

export default TaglineStrip;
