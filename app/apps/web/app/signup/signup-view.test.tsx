import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';

import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import { SignupView } from './signup-view';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the shared /signup view (TASK-555).
 *
 * SSR contract: the initial server-rendered HTML is a clean, indexable
 * signup/login screen — heading "Create your account" (`signup.heading`),
 * subcopy `signup.subcopy`, semantic name + email form posting to
 * `POST /api/leads` (submit "Get Started") — and contains NO waitlist or
 * in-development language. After hydration the view swaps the heading/subcopy
 * to the `signup.waitlist.*` variants ("Join the waitlist") and reveals the
 * in-development disclosure — the only development-status surface on the
 * site. `hydrated` starts false on the server AND the first client render
 * (no hydration mismatch), then flips in an effect, so:
 *  - `renderToString` (effects never run) asserts the clean SSR HTML;
 *  - `render` (jsdom flushes effects) asserts the post-hydration swap.
 */

/** `next/navigation` is mocked so Header/Footer `useLocalizePath` works. */
let mockPathname = '/signup';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

/** Server-render the view exactly like SSR (effects never run). */
function serverHtml(): string {
  return renderToString(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <SignupView />
    </I18nProvider>,
  );
}

describe('SignupView — SSR clean signup copy (TASK-555)', () => {
  it('renders the clean signup heading, subcopy, and Get Started form in the initial HTML', () => {
    const html = serverHtml();
    expect(html).toContain('Create your account');
    // React escapes apostrophes in SSR HTML (you&#x27;re), so assert the
    // subcopy in apostrophe-free fragments.
    expect(html).toContain('Get discovered on Origin');
    expect(html).toContain('starting something new or growing an existing project');
    expect(html).toContain('Get Started');
    // Semantic fields with the shared waitlist ids + autocomplete hints.
    expect(html).toContain('id="waitlist-name"');
    expect(html).toContain('id="waitlist-email"');
    expect(html).toContain('autoComplete="name"');
    expect(html).toContain('autoComplete="email"');
    // No visible waitlist copy: the modal is closed (renders null) and the
    // view still shows the clean heading/subcopy.
    expect(html).not.toContain('Join the waitlist');
    expect(html).not.toContain('Origin is ready');
  });

  it('contains NO in-development disclosure in the initial HTML', () => {
    const html = serverHtml();
    expect(html).not.toContain('in development');
    expect(html).not.toContain("it's your turn");
  });
});

describe('SignupView — hydration swap (JS-only waitlist/disclosure)', () => {
  beforeEach(() => {
    mockPathname = '/signup';
  });

  it('swaps the heading/subcopy to the waitlist variants after hydration', () => {
    renderWithI18n(<SignupView />);
    expect(screen.getByTestId('signup-heading')).toHaveTextContent('Join the waitlist');
    expect(screen.getByTestId('signup-subcopy')).toHaveTextContent(
      "We'll email you when your Origin is ready.",
    );
  });

  it('reveals the in-development disclosure after hydration — the only development-status surface', () => {
    renderWithI18n(<SignupView />);
    expect(screen.getByTestId('signup-disclosure')).toHaveTextContent('Origin is in development.');
  });

  it('keeps the semantic form ids + Get Started submit after hydration', () => {
    renderWithI18n(<SignupView />);
    expect(screen.getByTestId('signup-name-input')).toHaveAttribute('id', 'waitlist-name');
    expect(screen.getByTestId('signup-email-input')).toHaveAttribute('id', 'waitlist-email');
    expect(screen.getByTestId('signup-name-input')).toHaveAttribute('autocomplete', 'name');
    expect(screen.getByTestId('signup-email-input')).toHaveAttribute('autocomplete', 'email');
    expect(screen.getByTestId('signup-submit')).toHaveTextContent('Get Started');
  });
});

describe('SignupView — form validation + submit to /api/leads', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
    mockPathname = '/signup';
  });

  it('blocks an empty submit with field-level errors (no network call)', async () => {
    global.fetch = jest.fn() as jest.Mock;
    const user = userEvent.setup();
    renderWithI18n(<SignupView />);

    await user.click(screen.getByTestId('signup-submit'));

    expect(await screen.findByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects an invalid email client-side', async () => {
    global.fetch = jest.fn() as jest.Mock;
    const user = userEvent.setup();
    renderWithI18n(<SignupView />);

    await user.type(screen.getByTestId('signup-name-input'), 'Ada Lovelace');
    await user.type(screen.getByTestId('signup-email-input'), 'not-an-email');
    await user.click(screen.getByTestId('signup-submit'));

    expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('posts name + email to POST /api/leads and shows the success state', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    }) as jest.Mock;

    const user = userEvent.setup();
    renderWithI18n(<SignupView />);

    await user.type(screen.getByTestId('signup-name-input'), 'Ada Lovelace');
    await user.type(screen.getByTestId('signup-email-input'), 'ada@example.com');
    await user.click(screen.getByTestId('signup-submit'));

    await waitFor(() => {
      expect(screen.getByText("You're on the list!")).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/leads',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Ada Lovelace', email: 'ada@example.com' }),
      }),
    );
    expect(screen.getByTestId('signup-done')).toBeInTheDocument();
  });

  it('surfaces inline field errors from the API through signup.errors.* keys', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        ok: false,
        error: { field: 'name', message: 'Name must be 120 characters or fewer.' },
      }),
    }) as jest.Mock;

    const user = userEvent.setup();
    renderWithI18n(<SignupView />);

    await user.type(screen.getByTestId('signup-name-input'), 'Ada');
    await user.type(screen.getByTestId('signup-email-input'), 'ada@example.com');
    await user.click(screen.getByTestId('signup-submit'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Name must be 120 characters or fewer.');
    });
  });

  it('shows a top-level error banner on server failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({
        ok: false,
        error: { field: 'form', message: 'Too many requests. Try again in a minute.' },
      }),
    }) as jest.Mock;

    const user = userEvent.setup();
    renderWithI18n(<SignupView />);

    await user.type(screen.getByTestId('signup-name-input'), 'Ada');
    await user.type(screen.getByTestId('signup-email-input'), 'ada@example.com');
    await user.click(screen.getByTestId('signup-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('signup-top-error')).toHaveTextContent(
        'Too many requests. Try again in a minute.',
      );
    });
  });

  it('resets to a fresh form from the success state via Done', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    }) as jest.Mock;

    const user = userEvent.setup();
    renderWithI18n(<SignupView />);

    await user.type(screen.getByTestId('signup-name-input'), 'Ada Lovelace');
    await user.type(screen.getByTestId('signup-email-input'), 'ada@example.com');
    await user.click(screen.getByTestId('signup-submit'));
    await waitFor(() => {
      expect(screen.getByTestId('signup-done')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('signup-done'));
    expect(screen.getByTestId('signup-form')).toBeInTheDocument();
    expect(screen.getByTestId('signup-name-input')).toHaveValue('');
    expect(screen.getByTestId('signup-email-input')).toHaveValue('');
  });
});
