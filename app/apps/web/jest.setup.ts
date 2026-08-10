import '@testing-library/jest-dom';

import React from 'react';

/**
 * JSDOM browser API polyfills + module mocks needed by the landing page tests.
 */

// matchMedia (used by useReducedMotion).
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// requestAnimationFrame / cancelAnimationFrame (used by useCountUp, useEntrance).
if (typeof globalThis.requestAnimationFrame !== 'function') {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback): number =>
    setTimeout(() => callback(performance.now()), 16) as unknown as number;
}
if (typeof globalThis.cancelAnimationFrame !== 'function') {
  globalThis.cancelAnimationFrame = (id: number): void => clearTimeout(id);
}

// next/image renders a plain <img> in tests.
jest.mock('next/image', () => {
  const NextImage = ({
    src,
    alt = '',
    width,
    height,
    style,
    className,
    ...rest
  }: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
  }) =>
    React.createElement('img', {
      src: typeof src === 'string' ? src : '',
      alt,
      width,
      height,
      style,
      className,
      ...rest,
    });
  return { __esModule: true, default: NextImage };
});
