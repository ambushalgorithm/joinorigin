'use client';

import Image from 'next/image';
import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

/**
 * Hero social-proof trust row (spec sprint-10-menu-redesign §4.4).
 *
 * Mirrors the home `HeroLeft` trust row exactly: 9 overlapping avatars
 * (48px, -12px overlap, white border) + the shared trust copy
 * `home.hero.trustCopy` ("Join 2,400+ builders already collaborating").
 * Zero new strings — both keys already exist in the locale dictionaries.
 *
 * A11y: the overlapping image stack is decorative (`aria-hidden`); the trust
 * copy is real text. Each avatar keeps its localized `trustAvatarsAlt` alt
 * text for any non-AT context (mirrors `HeroLeft`).
 */

const TRUST_AVATAR_COUNT = 9;

const Trust = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  flex-wrap: wrap;
  overflow: hidden;
`;

const TrustAvatars = styled.div`
  display: flex;
  align-items: center;
`;

/** `next/image` styled via styled-components (TASK-209 — same as HeroLeft). */
const TrustAvatar = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primaryContrast};
  object-fit: cover;
  margin-inline-start: -12px;

  &:first-child {
    margin-inline-start: 0;
  }
`;

const TrustCopy = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function TrustRow() {
  const { t } = useI18n();

  const avatars = Array.from({ length: TRUST_AVATAR_COUNT }, (_, i) => ({
    src: `/assets/avatars/avatar-${String(i + 1).padStart(2, '0')}.png`,
    alt: t('home.hero.trustAvatarsAlt', { number: i + 1 }),
  }));

  return (
    <Trust data-testid="trust-row">
      <TrustAvatars aria-hidden="true">
        {avatars.map((avatar) => (
          <TrustAvatar key={avatar.src} src={avatar.src} alt={avatar.alt} width={48} height={48} />
        ))}
      </TrustAvatars>
      <TrustCopy>{t('home.hero.trustCopy')}</TrustCopy>
    </Trust>
  );
}

export default TrustRow;
