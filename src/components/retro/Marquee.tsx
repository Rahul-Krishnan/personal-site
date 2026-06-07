export function Marquee({ text }: { text: string }) {
  // CSS-driven scroller (no deprecated <marquee> tag). The text is duplicated
  // so the loop reads as continuous. Hidden in modern theme via CSS; animation
  // is disabled under prefers-reduced-motion.
  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        <span className="marquee__text">{text}</span>
        <span className="marquee__text" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
