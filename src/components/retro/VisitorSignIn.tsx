import { useState } from 'react';

// A "sign my guestbook" form that, faithful to the era, does nothing useful.
// No backend (by design): it just thanks you and clears. Decorative.
export function VisitorSignIn() {
  const [name, setName] = useState('');
  const [thanked, setThanked] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim()) {
      setThanked(true);
      setName('');
      window.setTimeout(() => setThanked(false), 4000);
    }
  }

  return (
    <form className="signin" onSubmit={onSubmit}>
      <p className="signin__title">★ Sign In ★</p>
      <label className="signin__label" htmlFor="signin-name">
        Your name:
      </label>
      <input
        id="signin-name"
        className="signin__input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="CoolDude1996"
        autoComplete="off"
      />
      <button type="submit" className="signin__button">
        Sign it!
      </button>
      {thanked && (
        <p className="signin__thanks" role="status">
          Thanks for signing!! :)
        </p>
      )}
    </form>
  );
}
