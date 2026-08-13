/**
 * Jest environment polyfills that must exist before any module evaluates
 * (runs via `setupFiles`, before `jest.setup.ts`). The jsdom environment
 * hides Node's web APIs; undici (Request/Response) and RNW internals need
 * TextEncoder/TextDecoder, web streams, and worker messaging at import time.
 */
import { Blob, File } from 'node:buffer';
import { ReadableStream, TransformStream, WritableStream } from 'node:stream/web';
import {
  clearImmediate as nodeClearImmediate,
  setImmediate as nodeSetImmediate,
} from 'node:timers';
import { TextDecoder, TextEncoder } from 'node:util';
import { BroadcastChannel, MessagePort } from 'node:worker_threads';

// React 19's renderers create a `MessageChannel` at module init (the server
// renderer unconditionally; the client scheduler when `setImmediate` is
// absent) and keep it for the lifetime of the module. Node's `worker_threads`
// ports hold the event loop open until `.close()`, and a `postMessage`
// re-refs the receiving port — so every jest worker hangs and is force-exited
// ("A worker process has failed to exit gracefully"). A functional fake that
// delivers messages on the microtask queue keeps the schedulers working while
// holding zero handles, so workers exit cleanly (TASK-290).
type MessageEventHandler = ((event: { data: unknown }) => void) | null;

class FakeMessagePort {
  onmessage: MessageEventHandler = null;
  onmessageerror: MessageEventHandler = null;
  private other: FakeMessagePort | null = null;

  postMessage(data: unknown): void {
    const target = this.other;
    if (!target) {
      return;
    }
    Promise.resolve().then(() => {
      target.onmessage?.({ data });
    });
  }
  start(): void {}
  close(): void {}
  addEventListener(): void {}
  removeEventListener(): void {}
  dispatchEvent(): boolean {
    return false;
  }
  unref(): void {}
  ref(): void {}
}

class FakeMessageChannel {
  port1: FakeMessagePort;
  port2: FakeMessagePort;

  constructor() {
    this.port1 = new FakeMessagePort();
    this.port2 = new FakeMessagePort();
    this.port1['other'] = this.port2;
    this.port2['other'] = this.port1;
  }
}

const nodeWebGlobals: Array<[string, unknown]> = [
  ['TextDecoder', TextDecoder],
  ['TextEncoder', TextEncoder],
  ['ReadableStream', ReadableStream],
  ['TransformStream', TransformStream],
  ['WritableStream', WritableStream],
  ['MessageChannel', FakeMessageChannel],
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

// React 19's client scheduler prefers `setImmediate` when available; in the
// jsdom window it is undefined, so the scheduler falls back to a
// `MessageChannel` — covered by the handle-free fake above, but exposing
// Node's real setImmediate keeps the scheduler on the unref-friendly
// immediate path and avoids creating the channel at all (TASK-290).
if (typeof (globalThis as Record<string, unknown>).setImmediate === 'undefined') {
  (globalThis as Record<string, unknown>).setImmediate = nodeSetImmediate;
}
if (typeof (globalThis as Record<string, unknown>).clearImmediate === 'undefined') {
  (globalThis as Record<string, unknown>).clearImmediate = nodeClearImmediate;
}
