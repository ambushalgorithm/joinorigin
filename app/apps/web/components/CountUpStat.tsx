'use client';

import styled from 'styled-components';

import { useI18n } from '@joinorigin/i18n';

import { useReducedMotion } from './motion';
import { StatLabel, StatPill, StatValue } from './menuPagePrimitives';
import { formatCount, useCountUp } from './useCountUp';

/**
 * Count-up gradient stat (spec sprint-10-menu-redesign §4.5).
 *
 * Parses the leading integer from the LOCALIZED value string
 * (`network.joinStatValue` = `"2,400+"` → target `2400`, suffix `"+"`),
 * animates `0 → target` with `useCountUp` (easeOutCubic, 2s, 0.3s delay),
 * formats the running count with the active locale's thousands separator
 * (`formatCount`), and re-appends the non-numeric suffix from the source.
 *
 * If parsing fails the localized string renders verbatim (no animation) —
 * locale parity is preserved without touching any JSON.
 *
 * A11y: the exact localized value is also present in a visually-hidden span
 * so assistive tech reads the final figure immediately (no count-up chatter);
 * screen-reader text never replaces the source copy.
 *
 * Reduced motion: `useCountUp` `disabled` snaps straight to the target.
 */

export interface CountUpStatProps {
  /** Localized value string to animate, e.g. `"2,400+"`. */
  valueText: string;
  /** Optional localized label, e.g. "Members building together". */
  label?: string;
  /** Optional test id (community keeps `community-members-stat`). */
  testID?: string;
}

/** Keeps the visually-hidden final value out of layout (sr-only pattern). */
const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

/** Extract the leading integer + trailing non-numeric suffix. Returns null on
 *  failure (then the source string renders verbatim, no animation). */
function parseLocalizedValue(valueText: string): { target: number; suffix: string } | null {
  const trimmed = valueText.trim();
  const match = trimmed.match(/^([\d.,\s\u00A0]+)(.*)$/);
  if (!match) {
    return null;
  }
  const numericPart = match[1];
  const suffix = match[2] ?? '';
  if (!numericPart) {
    return null;
  }
  const normalized = numericPart
    .replace(/[\s\u00A0]/g, '')
    .replace(/,/g, '')
    .replace(/\./g, '');
  const target = Number(normalized);
  if (!Number.isFinite(target) || target < 0) {
    return null;
  }
  return { target, suffix };
}

export function CountUpStat({ valueText, label, testID }: CountUpStatProps) {
  const { locale } = useI18n();
  const reduced = useReducedMotion();

  const parsed = parseLocalizedValue(valueText);
  // useCountUp must run unconditionally (rules of hooks); when parsing fails
  // the target is 0 and the source string renders verbatim instead.
  const count = useCountUp(parsed?.target ?? 0, {
    durationMs: 2000,
    delayMs: 300,
    disabled: reduced,
  });
  const displayValue =
    parsed === null ? valueText : `${formatCount(count, locale)}${parsed.suffix}`;

  return (
    <StatPill data-testid={testID}>
      <StatValue>{displayValue}</StatValue>
      {label ? <StatLabel>{label}</StatLabel> : null}
      {parsed !== null ? <SrOnly>{valueText}</SrOnly> : null}
    </StatPill>
  );
}

export default CountUpStat;
