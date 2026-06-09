// A fake browser status bar pinned to the bottom of the viewport, scrolling the
// kind of window.status text 90s sites abused (real window.status is dead now).
export function StatusBar() {
  const text =
    "Document: Done.   ***   Connecting at 56k...   ***   You've got mail!   ***   AltaVista says hi   ***   © 1996-∞ Rahul Krishnan   ***   No applets were harmed in the making of this page   ***   ";
  return (
    <div className="statusbar" role="presentation">
      <div className="statusbar__track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}
