'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { StyleSheet } from 'react-native-web';

/**
 * SSR registry for react-native-web styles.
 * styled-components/native renders through react-native-web's StyleSheet,
 * so collect the generated CSS and inject it before hydration.
 */
export default function Registry({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => {
    const { textContent } = StyleSheet.getSheet();
    if (!textContent) {
      return null;
    }
    return <style dangerouslySetInnerHTML={{ __html: textContent }} />;
  });

  return <>{children}</>;
}
