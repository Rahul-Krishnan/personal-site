import { useCallback, useEffect, useRef, useState } from 'react';

// A "MIDI" gag. No autoplay (browser-blocked and hostile), no external file:
// a three-voice chiptune (melody + arpeggio + bass) synthesized with the Web
// Audio API, in the wistful I–V–vi–IV style of a real 90s homepage MIDI. It
// LOOPS until the user hits Stop. Mounted only in the 90s theme (see Sidebar),
// so switching to modern unmounts it and stops the audio.

const QUARTER = 0.42; // seconds per beat
const EIGHTH = QUARTER / 2;
const BARS = 4;
const LOOP_SECONDS = BARS * 4 * QUARTER;
// No gap: the loop repeats immediately after the last note.
const REST_SECONDS = 0;

// MIDI note numbers; 0 = rest. Progression: C  G  Am  F.
// Melody (one note per beat, 16 beats).
const MELODY = [
  64, 65, 67, 64, 62, 64, 62, 59, 72, 71, 69, 64, 65, 69, 67, 64,
];
// Bass (one root per bar, whole notes).
const BASS = [48, 43, 45, 41];
// Arpeggio (eighth notes, chord tones, 32 steps).
const ARP = [
  60, 64, 67, 64, 60, 64, 67, 64, // C
  55, 59, 62, 59, 55, 59, 62, 59, // G
  57, 60, 64, 60, 57, 60, 64, 60, // Am
  53, 57, 60, 57, 53, 57, 60, 57, // F
];

const midiToFreq = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

type WindowWithWebkit = Window & { webkitAudioContext?: typeof AudioContext };

export function MidiPlayer() {
  const [playing, setPlaying] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<number | null>(null);
  const playingRef = useRef(false);
  // The scheduler lives in a ref so it can re-queue itself without a recursive
  // useCallback self-reference.
  const scheduleRef = useRef<(startAt: number) => void>(() => {});

  useEffect(() => {
    const voice = (
      midi: number,
      at: number,
      dur: number,
      type: OscillatorType,
      peak: number,
    ) => {
      const ctx = ctxRef.current;
      const gain = gainRef.current;
      if (!ctx || !gain || midi === 0) return;
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = midiToFreq(midi);
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.0001, at);
      env.gain.exponentialRampToValueAtTime(peak, at + 0.02);
      env.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      osc.connect(env);
      env.connect(gain);
      osc.start(at);
      osc.stop(at + dur);
      osc.onended = () => {
        oscsRef.current = oscsRef.current.filter((o) => o !== osc);
      };
      oscsRef.current.push(osc);
    };

    scheduleRef.current = (startAt: number) => {
      // Melody (triangle, one per beat).
      MELODY.forEach((m, i) =>
        voice(m, startAt + i * QUARTER, QUARTER * 0.9, 'triangle', 0.18),
      );
      // Arpeggio (soft triangle, eighths).
      ARP.forEach((m, i) =>
        voice(m, startAt + i * EIGHTH, EIGHTH * 0.95, 'triangle', 0.06),
      );
      // Bass (sine, whole note per bar).
      BASS.forEach((m, bar) =>
        voice(m, startAt + bar * 4 * QUARTER, 4 * QUARTER * 0.98, 'sine', 0.25),
      );
      // Re-queue the next loop after the music plus a short rest, so the song
      // gets a breath before repeating instead of running straight into itself.
      timerRef.current = window.setTimeout(() => {
        if (playingRef.current && ctxRef.current) {
          scheduleRef.current(ctxRef.current.currentTime);
        }
      }, (LOOP_SECONDS + REST_SECONDS) * 1000);
    };
  }, []);

  // Tear down all audio. Refs only, no state — safe to call from effect cleanup.
  const teardownAudio = useCallback(() => {
    playingRef.current = false;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    for (const osc of oscsRef.current) {
      try {
        osc.stop();
      } catch {
        // already stopped
      }
    }
    oscsRef.current = [];
  }, []);

  // Stop on unmount (e.g. when the theme switches away from 90s).
  useEffect(() => teardownAudio, [teardownAudio]);

  function stop() {
    teardownAudio();
    setPlaying(false);
  }

  function play() {
    if (playingRef.current) return;
    const Ctor =
      window.AudioContext ?? (window as WindowWithWebkit).webkitAudioContext;
    if (!Ctor) return;

    const ctx = ctxRef.current ?? new Ctor();
    ctxRef.current = ctx;
    void ctx.resume();
    if (!gainRef.current) {
      const gain = ctx.createGain();
      gain.gain.value = 0.5; // master; per-voice peaks keep it gentle
      gain.connect(ctx.destination);
      gainRef.current = gain;
    }

    playingRef.current = true;
    setPlaying(true);
    scheduleRef.current(ctx.currentTime + 0.08);
  }

  return (
    <div className="midi">
      <button
        type="button"
        className="midi__button"
        onClick={playing ? stop : play}
        aria-pressed={playing}
        aria-label={playing ? 'Stop the MIDI song' : 'Play a looping MIDI song'}
      >
        {playing ? '■ Stop MIDI (now playing…)' : '🎵 Play MIDI: nostalgia.mid'}
      </button>
    </div>
  );
}
