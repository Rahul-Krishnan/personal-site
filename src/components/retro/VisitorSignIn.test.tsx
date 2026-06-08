// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { VisitorSignIn } from './VisitorSignIn';

function typeName(value: string) {
  const input = screen.getByLabelText(/your name/i) as HTMLInputElement;
  fireEvent.change(input, { target: { value } });
  return input;
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: /sign it/i }));
}

describe('VisitorSignIn', () => {
  afterEach(cleanup);

  it('thanks the visitor and clears the field on submit', () => {
    render(<VisitorSignIn />);
    const input = typeName('CoolDude1996');
    submit();
    expect(screen.getByRole('status')).toHaveTextContent(/thanks for signing/i);
    expect(input.value).toBe('');
  });

  it('does nothing when the name is blank or whitespace', () => {
    render(<VisitorSignIn />);
    typeName('   ');
    submit();
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('hides the thanks message after the timeout', () => {
    vi.useFakeTimers();
    try {
      render(<VisitorSignIn />);
      typeName('Webmaster');
      submit();
      expect(screen.getByRole('status')).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(4000));
      expect(screen.queryByRole('status')).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  // Security: the form must never interpret the visitor's input as markup.
  // React escapes by default; this guards against a future refactor that
  // reaches for dangerouslySetInnerHTML.
  it('treats angle-bracket input as inert text, not HTML', () => {
    const { container } = render(<VisitorSignIn />);
    typeName('<img src=x onerror="alert(1)">');
    submit();
    expect(container.querySelector('img')).toBeNull();
    // The stored value never reaches the DOM as an element; only the static
    // thank-you copy is shown.
    expect(screen.getByRole('status')).toHaveTextContent(/thanks for signing/i);
  });
});
