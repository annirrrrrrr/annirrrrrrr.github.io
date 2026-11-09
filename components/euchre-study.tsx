import {useEffect,useRef} from 'react';
import ArrowIcon from './arrow-icon';

const gameUrl = '/euchre/index.html';

export default function EuchreStudy() {
 const frameRef = useRef<HTMLIFrameElement>(null);

 useEffect(() => {
  const frame = frameRef.current;
  if (!frame) return;
  let observer: ResizeObserver | undefined;

  function observeGame() {
   observer?.disconnect();
   const body = frame?.contentDocument?.body;
   if (!frame || !body) return;
   const fit = () => {
    // A stable minimum keeps the game's height-based mobile layout from
    // switching back and forth when the frame resizes.
    frame.style.height = Math.max(700, Math.ceil(body.getBoundingClientRect().height)) + 'px';
   };
   observer = new ResizeObserver(fit);
   observer.observe(body);
   fit();
  }

  frame.addEventListener('load', observeGame);
  if (frame.contentDocument?.readyState === 'complete') observeGame();
  return () => {
   frame.removeEventListener('load', observeGame);
   observer?.disconnect();
  };
 }, []);

 return <article id="euchre" className="project-study euchre-study" aria-labelledby="euchre-title">
  <header className="study-heading">
   <span className="eyebrow">05 / EECS 280</span>
   <h2 id="euchre-title">Euchre</h2>
   <ul className="study-tags" aria-label="Project topics"><li>C++ · OOP</li><li>Abstract data types</li><li>Inheritance & polymorphism</li><li>Virtual functions</li><li>JavaScript</li></ul>
   <p>I built a C++ version of Euchre for EECS 280 and brought its rules and computer-player strategy into the browser. Play with Nova against two computer opponents in a race to 10 points.</p>
   <a className="text-link" href={gameUrl} target="_blank" rel="noopener noreferrer">Play Euchre <ArrowIcon direction="up-right"/></a>
   <a className="text-link euchre-source" href="https://github.com/annirrrrrrr/p3-euchre" target="_blank" rel="noopener noreferrer">C++ source on GitHub <ArrowIcon direction="up-right"/></a>
   <div className="euchre-engineering">
    <section><h3>Model the game</h3><p><strong>Card and Pack abstractions</strong> organize the deck and context-dependent card ordering. A shared <strong>Player interface</strong> uses inheritance and virtual functions to support human input and a rule-based computer strategy.</p></section>
    <section><h3>Handle the edge cases</h3><p>Implemented <strong>trump selection, dealer pickup, trick resolution, and scoring</strong>—including the left bower, whose effective suit changes with trump. Unit tests and full-game transcript comparisons check the behavior.</p></section>
    <section><h3>Bring it to the browser</h3><p>A <strong>JavaScript adaptation</strong> turns the command-line flow into click-driven play, with legal-move guidance, teammate avatars, and responsive controls.</p></section>
   </div>
   <a className="text-link" href="https://eecs280staff.github.io/euchre/" target="_blank" rel="noopener noreferrer">EECS 280 · Course specification <ArrowIcon direction="up-right"/></a>
  </header>
  <iframe ref={frameRef} className="euchre-frame" src={gameUrl} title="Playable Euchre card game" loading="lazy"/>
 </article>;
}
