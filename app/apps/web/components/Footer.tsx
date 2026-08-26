'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import { useLocalizePath } from '../lib/seo/localePath';
import LanguageSwitcher from './LanguageSwitcher';
import { DELAY, useEntrance } from './motion';
import RotatingBorderButton from './RotatingBorderButton';

/**
 * Slim footer (spec §5.6 + sprint-4-discovery §3.2).
 *
 * Brand mark + wordmark, tagline, grouped nav (Explore / Product / Company /
 * Legal), `Get Started` rotating-border CTA (a real link to the
 * locale-prefixed `/signup` route — Sprint 24, TASK-556), the copyright line,
 * and the language switcher (Sprint 9, compact variant aligned to the inline
 * end). Mobile-first (Sprint 22 Story A): the 320px base stacks the whole
 * footer vertically (column layout); the row layout applies at tablet+.
 */

const FOOTER_GROUPS = [
  {
    titleKey: 'common.nav.explore',
    links: [
      { labelKey: 'common.nav.locations', href: '/location' },
      { labelKey: 'common.nav.guides', href: '/guides' },
      { labelKey: 'common.nav.glossary', href: '/glossary' },
    ],
  },
  {
    titleKey: 'footer.groupProduct',
    links: [
      { labelKey: 'common.nav.features', href: '/features' },
      { labelKey: 'common.nav.community', href: '/community' },
      { labelKey: 'common.nav.docs', href: '/docs' },
    ],
  },
  {
    titleKey: 'footer.groupCompany',
    links: [
      { labelKey: 'common.nav.about', href: '/about' },
      { labelKey: 'common.nav.contact', href: '/contact' },
    ],
  },
  {
    titleKey: 'footer.groupLegal',
    links: [
      { labelKey: 'common.nav.privacy', href: '/privacy' },
      { labelKey: 'common.nav.terms', href: '/terms' },
    ],
  },
] as const;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledFooter = styled.footer<{ $entered: boolean }>`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  /* Mobile-first (Story A): 16px gutters at the 320px floor, widened at
     the first enhancement breakpoint, then at desktop. */
  padding: 32px 16px;
  animation: ${({ $entered }) =>
    $entered
      ? css`
          ${fadeIn} 0.5s ease-out ${DELAY.footer} both
        `
      : 'none'};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: 32px 24px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: 48px 32px;
  }
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  /* Mobile-first (Story A): the 320px base stacks the brand, CTA, groups,
     and utility row vertically; the row layout applies at tablet+. */
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xl}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

/**
 * `next/image` is styled via `styled-components` for sizing (TASK-209). The
 * generated class name is made deterministic app-wide by the SWC
 * `compiler.styledComponents` option in `next.config.mjs`.
 */
const BrandMark = styled(Image)`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const Tagline = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl}px;
  flex-wrap: wrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    flex-direction: row;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const Groups = styled.nav`
  display: flex;
  /* Mobile-first (Story A): groups stack vertically at the 320px floor and
     fan out into columns at tablet+. */
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.xxl}px;
    flex-wrap: wrap;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const GroupTitle = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.display};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const FooterLink = styled(Link)`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover,
  &:focus-visible {
    &::after {
      transform: scaleX(1);
    }
  }
`;

const UtilityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  flex-wrap: wrap;
`;

const Copyright = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function Footer() {
  const entered = useEntrance();
  const { t } = useI18n();
  const localizePath = useLocalizePath();

  return (
    <StyledFooter $entered={entered} data-testid="footer">
      <Inner>
        <div>
          <Brand>
            <BrandMark src="/assets/logo/joinorigin-mark.svg" alt="" width={24} height={24} />
            <Wordmark>{t('common.brand')}</Wordmark>
          </Brand>
          <Tagline>{t('footer.tagline')}</Tagline>
        </div>
        <Spacer />
        <RotatingBorderButton
          label={t('header.getStarted')}
          href={localizePath('/signup')}
          testID="footer-waitlist-button"
        />
        <Groups aria-label={t('footer.navAria')}>
          {FOOTER_GROUPS.map((group) => (
            <Group key={group.titleKey}>
              <GroupTitle>{t(group.titleKey)}</GroupTitle>
              {group.links.map((link) => (
                <FooterLink key={link.href} href={localizePath(link.href)}>
                  {t(link.labelKey)}
                </FooterLink>
              ))}
            </Group>
          ))}
        </Groups>
        <UtilityRow>
          <Copyright>{t('footer.copyright')}</Copyright>
          <LanguageSwitcher variant="footer" />
        </UtilityRow>
      </Inner>
    </StyledFooter>
  );
}

export default Footer;
