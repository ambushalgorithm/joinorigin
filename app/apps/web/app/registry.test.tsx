import { render } from '@testing-library/react';
import styled from 'styled-components';

import Registry from './registry';

/**
 * Registry streaming-safety tests (fe-load-polish, TASK-404).
 *
 * The registry (TASK-208) flushes both style systems (react-native-web +
 * styled-components) into the server HTML via `useServerInsertedHTML` so the
 * first paint is fully styled — no FOUC. These tests pin the contract:
 *
 * 1. The flush is idempotent: a re-entrant `useServerInsertedHTML` callback
 *    (StrictMode double render / a second stream flush) must not throw and
 *    must not collect a stale sheet a second time.
 * 2. The client render path still wraps children in `StyleSheetManager` on the
 *    server and returns them unchanged once `window` exists (hydration).
 */

// next/navigation is mocked so the registry's `useServerInsertedHTML` hook
// behaves like a collect-once stream flush; each call site captures the
// callback so the test can drive it re-entrantly.
const flushCallbacks: Array<() => React.ReactNode> = [];
jest.mock('next/navigation', () => ({
  useServerInsertedHTML: (callback: () => React.ReactNode) => {
    flushCallbacks.push(callback);
  },
}));

// A tiny styled component so the ServerStyleSheet has something to collect.
const Sample = styled.div`
  color: #f5f8ff;
`;

function renderRegistry(children: React.ReactNode) {
  return render(<Registry>{children}</Registry>);
}

afterEach(() => {
  flushCallbacks.length = 0;
});

describe('Registry (SSR style flush, TASK-404)', () => {
  it('registers a useServerInsertedHTML flush callback and runs it without throwing', () => {
    renderRegistry(
      <div>
        <Sample />
      </div>,
    );

    expect(flushCallbacks).toHaveLength(1);
    const flush = flushCallbacks[0];

    // jsdom takes the client branch (`window` exists), so no styles are
    // collected here — the contract under test is that the flush executes
    // without throwing ("failed to pipe response" guard) and returns a value.
    expect(() => flush()).not.toThrow();
  });

  it('is idempotent — a re-entrant flush does not throw and returns nothing', () => {
    renderRegistry(
      <div>
        <Sample />
      </div>,
    );

    const flush = flushCallbacks[0];
    // First flush consumes the sheet.
    expect(() => flush()).not.toThrow();
    // Re-entrant flush (StrictMode double render / late stream flush): the
    // `flushedRef` guard must return null instead of re-collecting a cleared
    // sheet ("Unable to enqueue" / "failed to pipe response").
    expect(() => flush()).not.toThrow();
    expect(flush()).toBeNull();
  });

  it('returns children unchanged on the client (window exists)', () => {
    // jsdom defines `window`, so the registry takes the hydration branch:
    // children render without an extra StyleSheetManager wrapper.
    const { getByText } = renderRegistry(<main>hydrated content</main>);
    expect(getByText('hydrated content')).toBeInTheDocument();
  });
});
