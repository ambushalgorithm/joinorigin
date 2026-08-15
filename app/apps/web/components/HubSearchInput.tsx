'use client';

import styled from 'styled-components';

/**
 * Shared search/filter input for the hub pages (TASK-317).
 *
 * Keyboard accessible (real `<input type="search">` + `aria-label` + visible
 * focus ring), reduced-motion safe (no motion in the default state; the only
 * transition is a border/box-shadow color change that is disabled when the
 * user prefers reduced motion). Used by the `/location` and `/guides` hubs.
 */

export interface HubSearchInputProps {
  /** Stable id + `aria-label` text (screen-reader announcement). */
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  'data-testid'?: string;
}

const Input = styled.input`
  width: 100%;
  max-width: 480px;
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 125, 249, 0.25);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  /* No transition motion for reduced-motion users (WCAG 2.3.3). */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export function HubSearchInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  ...rest
}: HubSearchInputProps) {
  return (
    <Input
      id={id}
      type="search"
      role="searchbox"
      aria-label={label}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      {...rest}
    />
  );
}

export default HubSearchInput;
