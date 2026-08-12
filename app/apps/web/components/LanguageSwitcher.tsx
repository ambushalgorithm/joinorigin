'use client';

import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { useI18n, type Locale } from '@joinorigin/i18n';

import {
  LANGUAGE_LABELS,
  LANGUAGE_ORDER,
  SWITCHER_LIST_LABEL,
  SWITCHER_TITLE,
  SWITCHER_TRIGGER_LABEL,
} from './languageSwitcherTokens';

/**
 * Language switcher (design spec sprint-9-i18n-switcher).
 *
 * Shared web control mounted in the header (desktop right cluster + mobile
 * panel) and the footer utility row. Trigger shows the globe icon + current
 * locale's native autonym; the listbox lists all 21 locales with autonyms
 * (+ muted EN hints on desktop). Selecting a locale applies it immediately
 * (no reload — `setLocale` re-renders through the i18n provider and writes
 * the `joinorigin_locale` cookie), closes the list, and returns focus to the
 * trigger.
 *
 * Behavior contract (spec §6/§8): ARIA listbox pattern, full keyboard nav
 * (Enter/Space/Arrows/Home/End/Escape/Tab), focus return on close, and RTL
 * mirroring via logical properties (panel aligned to the trigger's inline
 * end; footer variant opens upward).
 */

export interface LanguageSwitcherProps {
  /** `header` (desktop right cluster), `footer` (compact, opens upward), or `mobile-panel` (full-width row). */
  variant?: 'header' | 'footer' | 'mobile-panel';
}

const GlobeIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronDown = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Wrap = styled.div<{ $variant: NonNullable<LanguageSwitcherProps['variant']> }>`
  position: relative;
  display: inline-flex;

  ${({ $variant }) =>
    $variant === 'mobile-panel'
      ? css`
          width: 100%;
        `
      : null}
`;

const Trigger = styled.button<{ $variant: NonNullable<LanguageSwitcherProps['variant']> }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: ${({ $variant }) => ($variant === 'footer' ? '13px' : '14px')};
  font-weight: 500;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.md}px;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  ${({ $variant }) =>
    $variant === 'mobile-panel'
      ? css`
          width: 100%;
          min-height: 44px;
          padding: 0 ${({ theme }) => theme.spacing.md}px;
          justify-content: flex-start;
        `
      : css`
          min-height: 36px;
          padding: 0 12px;
        `}

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surfaceElevated};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const TriggerLabel = styled.span`
  white-space: nowrap;
`;

const Panel = styled.div<{
  $open: boolean;
  $variant: NonNullable<LanguageSwitcherProps['variant']>;
}>`
  position: absolute;
  z-index: 60;
  inset-inline-end: 0;
  min-width: 240px;
  max-height: 50vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
  padding: 6px;
  display: ${({ $open }) => ($open ? 'block' : 'none')};

  ${({ $variant }) =>
    $variant === 'footer'
      ? css`
          bottom: calc(100% + 8px);
        `
      : css`
          top: calc(100% + 8px);
        `}

  ${({ $variant }) =>
    $variant === 'mobile-panel'
      ? css`
          position: static;
          inset-inline-end: auto;
          box-shadow: none;
          margin-top: ${({ theme }) => theme.spacing.xs}px;
          max-height: 40vh;
        `
      : null}
`;

const PanelTitle = styled.div`
  padding: 8px 12px 6px;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const OptionRow = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
  min-height: 38px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ $active }) => ($active ? 'rgba(79, 125, 249, 0.08)' : 'transparent')};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surfaceElevated};
  }

  &[aria-selected='true'] {
    font-weight: 500;
  }
`;

const OptionLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const OptionCheck = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
`;

const OptionHint = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-inline-start: auto;
`;

export function LanguageSwitcher({ variant = 'header' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = `language-switcher-listbox-${variant}`;

  // Move focus into the listbox when opened so arrow-key navigation works.
  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      } else if (event.key === 'Tab') {
        setOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const currentIndex = LANGUAGE_ORDER.indexOf(locale);

  const openListbox = () => {
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
    setOpen(true);
  };

  const select = (next: Locale) => {
    setOpen(false);
    void setLocale(next);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) {
        openListbox();
      }
    }
  };

  const onListboxKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) =>
        event.key === 'ArrowDown'
          ? (index + 1) % LANGUAGE_ORDER.length
          : (index - 1 + LANGUAGE_ORDER.length) % LANGUAGE_ORDER.length,
      );
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(LANGUAGE_ORDER.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(LANGUAGE_ORDER[activeIndex]);
    }
  };

  return (
    <Wrap ref={wrapRef} $variant={variant} data-testid={`language-switcher-${variant}`}>
      <Trigger
        ref={triggerRef}
        type="button"
        $variant={variant}
        aria-label={SWITCHER_TRIGGER_LABEL}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? setOpen(false) : openListbox())}
        onKeyDown={onTriggerKeyDown}
        data-testid="language-switcher-trigger"
      >
        {GlobeIcon}
        <TriggerLabel>{LANGUAGE_LABELS[locale].native}</TriggerLabel>
        {ChevronDown}
      </Trigger>

      <Panel
        id={panelId}
        ref={panelRef}
        tabIndex={-1}
        $open={open}
        $variant={variant}
        role="listbox"
        aria-label={SWITCHER_LIST_LABEL}
        aria-activedescendant={open ? `language-option-${LANGUAGE_ORDER[activeIndex]}` : undefined}
        onKeyDown={onListboxKeyDown}
        data-testid="language-switcher-listbox"
      >
        <PanelTitle>{SWITCHER_TITLE}</PanelTitle>
        {LANGUAGE_ORDER.map((option, index) => {
          const selected = option === locale;
          const active = open && index === activeIndex;
          return (
            <OptionRow
              key={option}
              id={`language-option-${option}`}
              role="option"
              aria-selected={selected}
              onClick={() => select(option)}
              onPointerEnter={() => setActiveIndex(index)}
              $active={active || selected}
              data-testid={`language-option-${option}`}
            >
              <OptionLabel>
                {selected ? <OptionCheck>{CheckIcon}</OptionCheck> : null}
                {LANGUAGE_LABELS[option].native}
              </OptionLabel>
              {LANGUAGE_LABELS[option].hint ? (
                <OptionHint>{LANGUAGE_LABELS[option].hint}</OptionHint>
              ) : null}
            </OptionRow>
          );
        })}
      </Panel>
    </Wrap>
  );
}

export default LanguageSwitcher;
