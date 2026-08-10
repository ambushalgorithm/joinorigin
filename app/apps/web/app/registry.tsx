'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
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
 */
export default function Registry({ children }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const rnwStyles = StyleSheet.getSheet().textContent;
    const scStyles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return (
      <>
        {rnwStyles ? <style dangerouslySetInnerHTML={{ __html: rnwStyles }} /> : null}
        {scStyles}
      </>
    );
  });

  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  );
}
