import { useEffect, useRef, useState } from 'react';

const COUNTER_KEY = 'visitor-count';
// Seed so the very first visitor doesn't see a lonely "1".
const SEED = 13337;
const DIGITS = 6;

export function HitCounter() {
  const [count, setCount] = useState<number | null>(null);
  // StrictMode runs effects twice in dev; this ref ensures we only bump once.
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;
    counted.current = true;

    let current: number;
    try {
      const stored = localStorage.getItem(COUNTER_KEY);
      const parsed = stored ? parseInt(stored, 10) : SEED;
      current = (Number.isNaN(parsed) ? SEED : parsed) + 1;
      localStorage.setItem(COUNTER_KEY, String(current));
    } catch {
      // Storage unavailable: still show a believable number this session.
      current = SEED + 1;
    }
    setCount(current);
  }, []);

  const padded = String(count ?? SEED).padStart(DIGITS, '0').slice(-DIGITS);

  return (
    <div className="hitcounter" aria-label={`Visitor number ${count ?? ''}`}>
      <span className="hitcounter__label">You are visitor</span>
      <span className="hitcounter__digits" aria-hidden="true">
        {padded.split('').map((d, i) => (
          <span key={i} className="hitcounter__digit">
            {d}
          </span>
        ))}
      </span>
    </div>
  );
}
