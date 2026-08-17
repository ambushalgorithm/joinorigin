/**
 * Unit tests for the real script loader (DOM injection helper).
 *
 * jsdom does not actually load external scripts, and dispatching load/error
 * events on *attached* scripts can crash jsdom's internal resource loader, so
 * these tests spy on `document.head.appendChild` to capture the created
 * element and settle the promise by dispatching events on the detached node.
 */

import { loadScript } from '../scriptLoader';

afterEach(() => {
  document.head.innerHTML = '';
  jest.restoreAllMocks();
});

/** Capture the node passed to appendChild without letting jsdom load it. */
function captureAppended(): {
  getNode: () => HTMLScriptElement | null;
  appendSpy: jest.SpyInstance;
} {
  let node: HTMLScriptElement | null = null;
  const appendSpy = jest.spyOn(document.head, 'appendChild').mockImplementation((child) => {
    node = child as HTMLScriptElement;
    return child;
  });
  return { getNode: () => node, appendSpy };
}

describe('loadScript', () => {
  it('creates a script element with src + attributes (injection contract)', async () => {
    const { getNode, appendSpy } = captureAppended();
    try {
      const pending = loadScript('https://example.com/script.js', {
        defer: '',
        'data-domain': 'joinorigin.co',
      });

      const node = getNode();
      expect(node).not.toBeNull();
      expect(node?.src).toBe('https://example.com/script.js');
      expect(node?.getAttribute('data-domain')).toBe('joinorigin.co');
      expect(node?.hasAttribute('defer')).toBe(true);
      expect(node?.hasAttribute('data-analytics-injected')).toBe(true);

      node?.dispatchEvent(new Event('load'));
      await pending;
    } finally {
      appendSpy.mockRestore();
    }
  });

  it('defaults plain scripts to async so analytics never blocks rendering', async () => {
    const { getNode, appendSpy } = captureAppended();
    try {
      const pending = loadScript('https://example.com/plain.js');

      const node = getNode();
      // jsdom reflects `defer` but not `async` as an attribute; the property
      // is the browser-relevant contract.
      expect(node?.async).toBe(true);
      expect(node?.defer).toBe(false);

      node?.dispatchEvent(new Event('load'));
      await pending;
    } finally {
      appendSpy.mockRestore();
    }
  });

  it('is a no-op when document is unavailable (SSR)', async () => {
    // Simulate SSR by temporarily removing the jsdom `document` global. Save
    // the original descriptor so teardown is unaffected.
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');
    Object.defineProperty(globalThis, 'document', { value: undefined, configurable: true });

    await expect(loadScript('https://example.com/script.js')).resolves.toBeUndefined();

    if (descriptor) {
      Object.defineProperty(globalThis, 'document', descriptor);
    }
  });

  it('is idempotent — skips injection when the same src already exists', async () => {
    // Pre-seed the DOM with the injected marker so the querySelector guard
    // short-circuits and no second script is appended.
    const seeded = document.createElement('script');
    seeded.setAttribute('data-analytics-injected', 'https://example.com/script.js');
    document.head.appendChild(seeded);

    const appendSpy = jest.spyOn(document.head, 'appendChild');

    await loadScript('https://example.com/script.js');

    expect(appendSpy).not.toHaveBeenCalled();
  });

  it('resolves when the script errors (analytics never breaks the page)', async () => {
    const { getNode, appendSpy } = captureAppended();
    try {
      const pending = loadScript('https://example.com/broken.js');

      const node = getNode();
      expect(node).not.toBeNull();
      node?.dispatchEvent(new Event('error'));
      await expect(pending).resolves.toBeUndefined();
    } finally {
      appendSpy.mockRestore();
    }
  });
});
