import { skills } from '../content';

export function SkillWall() {
  return (
    <ul className="skillwall" aria-label="Technical skills">
      {skills.map((skill) => (
        <li key={skill} className="skillwall__chip">
          {skill}
        </li>
      ))}
    </ul>
  );
}
