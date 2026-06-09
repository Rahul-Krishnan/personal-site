// Classic 88x31 button wall. Each badge is CSS-styled text, no external images
// (no dead GeoCities hotlinks). Purely decorative; hidden in modern theme.
const badges = [
  { text: 'Best viewed in\nNETSCAPE', kind: 'netscape' },
  { text: 'Made with\nNOTEPAD', kind: 'notepad' },
  { text: 'HTML 3.2\nCERTIFIED', kind: 'html' },
  { text: 'GET\nMACROMEDIA FLASH', kind: 'flash' },
  { text: 'CHAT ME ON\nIRC', kind: 'irc' },
  { text: 'WEBMASTER\nAPPROVED', kind: 'webmaster' },
  { text: 'INDEXED BY\nALTAVISTA', kind: 'altavista' },
  { text: 'Y2K\nREADY', kind: 'y2k' },
  { text: 'NEEDS\nREALPLAYER', kind: 'real' },
  { text: 'SAVE THE\nRAINFOREST', kind: 'rainforest' },
  { text: '800x600\nor bust', kind: 'res' },
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
