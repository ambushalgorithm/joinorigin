/**
 * Jest environment polyfills that must exist before any module evaluates
 * (runs via `setupFiles`, before `jest.setup.ts`). The jsdom environment
 * hides Node's web APIs; undici (Request/Response) and RNW internals need
 * TextEncoder/TextDecoder, web streams, and worker messaging at import time.
 */
import { Blob, File } from 'node:buffer';
import { ReadableStream, TransformStream, WritableStream } from 'node:stream/web';
import { TextDecoder, TextEncoder } from 'node:util';
import { BroadcastChannel, MessageChannel, MessagePort } from 'node:worker_threads';

const nodeWebGlobals: Array<[string, unknown]> = [
  ['TextDecoder', TextDecoder],
  ['TextEncoder', TextEncoder],
  ['ReadableStream', ReadableStream],
  ['TransformStream', TransformStream],
  ['WritableStream', WritableStream],
  ['MessageChannel', MessageChannel],
  ['MessagePort', MessagePort],
  ['BroadcastChannel', BroadcastChannel],
  ['Blob', Blob],
  ['File', File],
];

for (const [name, value] of nodeWebGlobals) {
  if (typeof (globalThis as Record<string, unknown>)[name] === 'undefined') {
    (globalThis as Record<string, unknown>)[name] = value;
  }
}
