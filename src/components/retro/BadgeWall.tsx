// Classic 88x31 button wall. Each badge is CSS-styled text, no external images
// (no dead GeoCities hotlinks). Purely decorative; hidden in modern theme.
const badges = [
  { text: 'Best viewed in\nNETSCAPE', kind: 'netscape' },
  { text: 'Made with\nNOTEPAD', kind: 'notepad' },
  { text: 'HTML 3.2\nCERTIFIED', kind: 'html' },
  { text: 'Y2K\nREADY', kind: 'y2k' },
  { text: 'GET\nNETSCAPE NOW', kind: 'getnav' },
  { text: '800x600\nor bust', kind: 'res' },
  { text: 'NO FRAMES\nNO PROBLEM', kind: 'frames' },
  { text: 'POWERED BY\nVITE + REACT', kind: 'vite' },
];

export function BadgeWall() {
  return (
    <div className="badgewall" role="presentation">
      {badges.map((b) => (
        <span key={b.kind} className={`badge badge--${b.kind}`}>
          {b.text.split('\n').map((line, i) => (
            <span key={i} className="badge__line">
              {line}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
