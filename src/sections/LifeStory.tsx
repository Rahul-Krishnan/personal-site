import { lifeStory } from '../content';

export function LifeStory() {
  return (
    <section
      id="path"
      className="section section--life"
      aria-labelledby="life-heading"
    >
      <h2 id="life-heading" className="section__heading">
        The Path Here
      </h2>
      <div className="life__body">
        {lifeStory.map((para, i) => (
          <p key={i} className="life__para">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}
