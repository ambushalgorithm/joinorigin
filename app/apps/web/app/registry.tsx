'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native-web';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/**
 * SSR registry for the web app.
 *
 * Two style systems render on the server:
 *
 * 1. `react-native-web` styles (shared `@joinorigin/ui` components + any
 *    `styled-components/native` markup) — collected via `StyleSheet.getSheet()`.
 * 2. DOM `styled-components` styles (web-local landing components, which need
 *    full CSS support such as `@keyframes`, `@media`, masks, and conic
 *    gradients) — collected via a `ServerStyleSheet` and `StyleSheetManager`.
 *
 * Both are injected into the server HTML before hydration.
 *
 * Streaming-safety notes (TASK-208):
 *
 * - `useServerInsertedHTML` is invoked by Next.js while the response stream is
 *   open. In dev mode a concurrent request (e.g. a DevTools probe 404 racing
 *   the main page stream) can close the stream before a pending style flush is
 *   enqueued, which surfaces as `ERR_INVALID_STATE: Unable to enqueue` wrapped
 *   in `Error: failed to pipe response`. The flush below is therefore
 *   idempotent and never throws:
 *   - `flushedRef` guarantees the one-shot styled-components sheet is only
 *     collected/cleared once per render pass, so a re-entrant callback (React
 *     StrictMode double render or a second flush while streaming) cannot call
 *     `clearTag()` on an already-consumed sheet.
 *   - The whole flush is wrapped in try/catch so a style-read failure after
 *     the stream closed degrades to "no extra styles" instead of killing the
 *     response pipe.
 */
export default function Registry({ children }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const flushedRef = useRef(false);

  useServerInsertedHTML(() => {
    // Guard against re-entrant flush / flush-after-close. `ServerStyleSheet`
    // is a one-shot instance per render cycle; calling `getStyleElement()` or
    // `clearTag()` twice (StrictMode double render, a second stream flush,
    // or a late flush after the stream closed) would collect an empty or
    // stale sheet and, in the worst case, enqueue into a closed stream.
    if (flushedRef.current) {
      return null;
    }
    flushedRef.current = true;

    try {
      const rnwStyles = StyleSheet.getSheet().textContent;
      const scStyles = styledComponentsStyleSheet.getStyleElement();
      styledComponentsStyleSheet.instance.clearTag();

      return (
        <>
          {rnwStyles ? <style dangerouslySetInnerHTML={{ __html: rnwStyles }} /> : null}
          {scStyles}
        </>
      );
    } catch {
      // The stream may already be closed (racing 404 probe / aborted
      // request). Never propagate — return nothing rather than letting the
      // error tear down the response pipe ("failed to pipe response").
      return null;
    }
  });

  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  );
}
