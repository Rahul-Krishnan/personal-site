// A web ring that goes nowhere, because the rest of the ring is long gone.
// Decorative homage; the arrows are inert buttons styled in retro.css.
export function WebRing() {
  return (
    <div className="webring" role="presentation">
      <span className="webring__title">
        ~ The Frontier AI Webring ~
      </span>
      <div className="webring__nav">
        <span className="webring__btn">&lt;&lt; Prev</span>
        <span className="webring__btn">[ Random ]</span>
        <span className="webring__btn">[ List ]</span>
        <span className="webring__btn">Next &gt;&gt;</span>
      </div>
      <span className="webring__note">
        Site 1 of 1. The other sites have 404'd into the void.
      </span>
    </div>
  );
}
