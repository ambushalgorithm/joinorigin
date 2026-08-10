import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';

import WaitlistModal from './WaitlistModal';
import { LeadSubmitError } from './leadsApi';

function renderModal(open = true) {
  const onClose = jest.fn();
  const view = render(
    <NativeThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <WaitlistModal open={open} onClose={onClose} />
      </ThemeProvider>
    </NativeThemeProvider>,
  );
  return { ...view, onClose };
}

describe('WaitlistModal', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('renders nothing when closed', () => {
    renderModal(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows a success state after a valid submission', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    }) as jest.Mock;

    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByTestId('waitlist-name-input'), 'Ada Lovelace');
    await user.type(screen.getByTestId('waitlist-email-input'), 'ada@example.com');
    await user.click(screen.getByTestId('waitlist-submit'));

    await waitFor(() => {
      expect(screen.getByText("You're on the list!")).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/leads',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('surfaces inline field errors from the API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        ok: false,
        error: { field: 'email', message: 'Enter a valid email address.' },
      }),
    }) as jest.Mock;

    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByTestId('waitlist-name-input'), 'Ada');
    await user.type(screen.getByTestId('waitlist-email-input'), 'not-an-email');
    await user.click(screen.getByTestId('waitlist-submit'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email address.');
    });
    expect(screen.getByTestId('waitlist-modal')).toBeInTheDocument();
  });

  it('shows a top-level error banner on server failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        ok: false,
        error: { field: 'form', message: 'Something went wrong.' },
      }),
    }) as jest.Mock;

    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByTestId('waitlist-name-input'), 'Ada');
    await user.type(screen.getByTestId('waitlist-email-input'), 'ada@example.com');
    await user.click(screen.getByTestId('waitlist-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('waitlist-top-error')).toHaveTextContent('Something went wrong.');
    });
  });

  it('closes on ESC and on the close button', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();

    await user.click(screen.getByTestId('waitlist-modal-close'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('restores focus to the trigger when the modal closes (spec §9.2)', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const trigger = document.createElement('button');
    trigger.textContent = 'Open waitlist';
    document.body.appendChild(trigger);

    const view = render(
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <WaitlistModal open onClose={onClose} trigger={trigger} />
        </ThemeProvider>
      </NativeThemeProvider>,
    );

    // Closing via ESC reports the close...
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();

    // ...and once the modal transitions to closed, focus returns to the trigger.
    view.rerender(
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <WaitlistModal open={false} onClose={onClose} trigger={trigger} />
        </ThemeProvider>
      </NativeThemeProvider>,
    );

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
    trigger.remove();
  });

  it('throws typed errors from the leads API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({
        ok: false,
        error: { field: 'form', message: 'Too many requests. Try again in a minute.' },
      }),
    }) as jest.Mock;

    const { submitLead } = await import('./leadsApi');
    await expect(submitLead({ name: 'Ada', email: 'ada@example.com' })).rejects.toThrow(
      LeadSubmitError,
    );
  });
});
