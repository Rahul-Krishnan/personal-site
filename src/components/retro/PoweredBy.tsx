// The "Powered by" / webmaster stack every 90s footer carried.
const items = [
  'Powered by VITE',
  'Hand-coded in VS CODE',
  'Optimized for NETSCAPE 4',
  'Hosted on a DREAM',
  '© 1996 RK Industries',
  'This site is Y2K compliant',
];

export function PoweredBy() {
  return (
    <div className="poweredby" role="presentation">
      {items.map((t) => (
        <span key={t} className="poweredby__chip">
          {t}
        </span>
      ))}
    </div>
  );
}
