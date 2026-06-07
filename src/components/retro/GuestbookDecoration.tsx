// A guestbook that is pure decoration (no backend, no accounts, by design).
// The "entries" are a static gag; the button does nothing but wink.
const entries = [
  { name: 'NetscapeNavigator95', note: 'cool site!!! added 2 my bookmarks' },
  { name: 'xX_dialup_Xx', note: 'took 4 ever to load on my 56k but worth it' },
  { name: 'webmaster', note: 'great use of <blink>. a bold choice.' },
];

export function GuestbookDecoration() {
  return (
    <div className="guestbook" role="presentation">
      <h3 className="guestbook__title">
        ~*~ Sign My Guestbook ~*~
      </h3>
      <ul className="guestbook__entries">
        {entries.map((e) => (
          <li key={e.name} className="guestbook__entry">
            <span className="guestbook__name">{e.name}</span>
            <span className="guestbook__note">"{e.note}"</span>
          </li>
        ))}
      </ul>
      <span className="guestbook__button">[ Sign it! ]</span>
      <span className="guestbook__disclaimer">
        (purely decorative, like everything good about the old web)
      </span>
    </div>
  );
}
