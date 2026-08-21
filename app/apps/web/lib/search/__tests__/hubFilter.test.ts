import { debounce, filterByKeyword, matchesKeyword } from '../hubFilter';
import { hubDirectoryEntries } from '../../seo/locationView';

/**
 * TASK-317 — client-side hub filter unit tests.
 *
 * Covers the pure filter contract the `/location` and `/guides` hubs rely
 * on: case-insensitive substring match, no-match, empty-keyword passthrough,
 * keyword-driven list filtering, and the trailing-edge debounce wrapper.
 *
 * TASK-486 — the per-section hub filter matches the entry `searchText`
 * (active-locale name + EN name + dataset country/region names), so
 * "Colombia"/"Italy" resolve their country card AND the cities/community
 * types/event ideas scoped to them. The real `hubDirectoryEntries` output
 * is filtered through `filterByKeyword` exactly as `LocationView` does.
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

describe('filterByKeyword against the Browse-locations searchText (TASK-485/TASK-486)', () => {
  const directory = hubDirectoryEntries('en');
  const filter = (keyword: string) =>
    filterByKeyword(directory, keyword, (entry) => entry.searchText);

  it('"colombia" matches the country card + all 3 Colombian cities (searchText, not title)', () => {
    const matches = filter('colombia');
    // The country card matches through the dataset country name in
    // searchText — its card title alone does not contain "colombia".
    const country = matches.find((entry) => entry.section === 'countries');
    expect(country?.name).toBe('Communities in Colombia');
    const cities = matches.filter((entry) => entry.section === 'cities').map((e) => e.name);
    expect(cities).toContain('Communities in Bogota, Bogota D.C.');
    expect(cities).toContain('Communities in Medellin, Antioquia');
    expect(cities).toContain('Communities in Barranquilla, Atlantico');
  });

  it('"italy" matches the Italy country card + Milan + Milan community types/ideas', () => {
    const matches = filter('ITALY'); // case-insensitive
    const country = matches.find((entry) => entry.section === 'countries');
    expect(country?.name).toBe('Communities in Italy');
    const cities = matches.filter((entry) => entry.section === 'cities').map((e) => e.name);
    expect(cities).toEqual(['Communities in Milan, Lombardy']);
    expect(matches.filter((entry) => entry.section === 'communityTypes')).toHaveLength(5);
    expect(matches.filter((entry) => entry.section === 'eventIdeas')).toHaveLength(1);
  });

  it('"colombia" also matches community types + event ideas scoped to the country', () => {
    const matches = filter('colombia');
    // 3 Colombian cities × 5 community types + 3 ideas pages.
    expect(matches.filter((entry) => entry.section === 'communityTypes')).toHaveLength(15);
    expect(matches.filter((entry) => entry.section === 'eventIdeas')).toHaveLength(3);
  });

  it('an empty keyword returns the full inventory (484 entries, unchanged)', () => {
    const matches = filter('');
    expect(matches).toHaveLength(directory.length);
    expect(matches).toHaveLength(484);
  });

  it('a non-geographic keyword matches within sections via card names', () => {
    const matches = filter('startup');
    expect(matches.length).toBeGreaterThan(0);
    // Community-type cards match through their card name ("Startup
    // communities in …") — the searchText includes the display name.
    expect(matches.filter((entry) => entry.section === 'communityTypes').length).toBeGreaterThan(0);
  });

  it('a keyword with no matches anywhere returns an empty array', () => {
    expect(filter('zzzz-no-such-place')).toEqual([]);
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
