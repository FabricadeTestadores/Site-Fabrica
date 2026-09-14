import { useEffect, useState } from 'react';

const firstWord = 'projetos.';
const finalWord = 'pessoas.';
const motionQuery = '(prefers-reduced-motion: reduce)';
const frames = [
  { text: '', delay: 900 },
  ...Array.from(firstWord, (_, index) => ({
    text: firstWord.slice(0, index + 1),
    delay: index === firstWord.length - 1 ? 750 : 110,
  })),
  ...Array.from(firstWord, (_, index) => ({
    text: firstWord.slice(0, firstWord.length - index - 1),
    delay: index === firstWord.length - 1 ? 240 : 55,
  })),
  ...Array.from(finalWord, (_, index) => ({ text: finalWord.slice(0, index + 1), delay: 110 })),
];

export default function TypewriterWord() {
  const [frame, setFrame] = useState(() => {
    const complete = window.matchMedia(motionQuery).matches;
    return { text: complete ? finalWord : '', complete };
  });

  useEffect(() => {
    const preference = window.matchMedia(motionQuery);
    let timer;

    function finish() {
      window.clearTimeout(timer);
      setFrame({ text: finalWord, complete: true });
    }

    function showFrame(index) {
      const complete = index === frames.length - 1;
      setFrame({ text: frames[index].text, complete });
      if (!complete) timer = window.setTimeout(() => showFrame(index + 1), frames[index].delay);
    }

    function handlePreferenceChange() {
      if (preference.matches) finish();
    }

    if (preference.matches) finish();
    else showFrame(0);
    preference.addEventListener('change', handlePreferenceChange);

    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener('change', handlePreferenceChange);
    };
  }, []);

  return (
    <span className="hero-word">
      <span className="sr-only">{finalWord}</span>
      <span className={`hero-word-visual${frame.complete ? ' is-complete' : ''}`} aria-hidden="true">
        <span className="hero-word-measure">{firstWord}</span>
        <span className="hero-word-measure">{finalWord}</span>
        <span className="hero-word-text">{frame.text}</span>
      </span>
    </span>
  );
}
