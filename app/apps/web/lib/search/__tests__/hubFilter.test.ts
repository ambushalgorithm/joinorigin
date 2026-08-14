import { debounce, filterByKeyword, matchesKeyword } from '../hubFilter';

/**
 * TASK-317 — client-side hub filter unit tests.
 *
 * Covers the pure filter contract the `/location` and `/guides` hubs rely
 * on: case-insensitive substring match, no-match, empty-keyword passthrough,
 * keyword-driven list filtering, and the trailing-edge debounce wrapper.
 */

describe('matchesKeyword', () => {
  it('matches a case-insensitive substring', () => {
    expect(matchesKeyword('Berlin', 'berlin')).toBe(true);
    expect(matchesKeyword('Berlin', 'BERLIN')).toBe(true);
    expect(matchesKeyword('Berlin', 'Ber')).toBe(true);
    expect(matchesKeyword('Startup communities in Berlin', 'startup')).toBe(true);
  });

  it('does not match unrelated text', () => {
    expect(matchesKeyword('Berlin', 'munich')).toBe(false);
    expect(matchesKeyword('Startup communities', 'meetup')).toBe(false);
  });

  it('returns true for an empty or whitespace-only keyword (show all)', () => {
    expect(matchesKeyword('Berlin', '')).toBe(true);
    expect(matchesKeyword('Berlin', '   ')).toBe(true);
  });

  it('trims the keyword so surrounding whitespace never breaks a match', () => {
    expect(matchesKeyword('Berlin', '  berlin ')).toBe(true);
  });
});

describe('filterByKeyword', () => {
  const items = [
    { name: 'New York City' },
    { name: 'Berlin' },
    { name: 'Startup communities in Berlin' },
  ];

  it('returns only matching items (case-insensitive substring)', () => {
    const result = filterByKeyword(items, 'BERLIN', (item) => item.name);
    expect(result).toEqual([{ name: 'Berlin' }, { name: 'Startup communities in Berlin' }]);
  });

  it('returns the original list for an empty keyword', () => {
    expect(filterByKeyword(items, '', (item) => item.name)).toEqual(items);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterByKeyword(items, 'tokyo', (item) => item.name)).toEqual([]);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls the function after the quiet period (trailing edge)', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 180);

    debounced('a');
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(180);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a');
  });

  it('coalesces rapid calls into a single trailing call', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 180);

    debounced('a');
    jest.advanceTimersByTime(50);
    debounced('b');
    jest.advanceTimersByTime(50);
    debounced('c');
    jest.advanceTimersByTime(180);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('c');
  });

  it('cancel() prevents a pending call', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 180);

    debounced('a');
    debounced.cancel();
    jest.advanceTimersByTime(180);

    expect(fn).not.toHaveBeenCalled();
  });
});
