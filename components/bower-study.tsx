import {useState} from 'react';

const prototype='https://www.figma.com/proto/7DpQeHzEFvIAbXdxteypcz/BOWER---Final-Prototype?node-id=1-1110&starting-point-node-id=1%3A1110&scaling=scale-down&content-scaling=fixed';
const embed='https://embed.figma.com/proto/7DpQeHzEFvIAbXdxteypcz/BOWER---Final-Prototype?node-id=1-1110&starting-point-node-id=1%3A1110&scaling=scale-down&content-scaling=fixed&embed-host=share';
const iterations=[
 {label:'First wireframe',image:'/images/bower-wireframe-before.webp',title:'Start with the interaction.',text:'I mapped the journey from setting a task to tracking it and collecting a reward, then used paper prototypes to ask whether the sequence felt clear and the pet felt engaging.'},
 {label:'After paper testing',image:'/images/bower-wireframe-after.webp',title:'Make the reward easier to understand.',text:'Feedback led me to reorder the flow, add a leaderboard, and simplify rewards into one currency: treats. The next wireframe carried those changes into the interface.'},
 {label:'Final interface',image:'/images/bower-4.webp',title:'Give progress a personality.',text:'The final Figma prototype connects task creation, a countdown, pet rewards, and progress views. It demonstrates the experience; longer-term effects on motivation still need testing.'}
];
export default function BowerStudy(){
 const [active,setActive]=useState(0);const [live,setLive]=useState(false);
 const step=iterations[active];
 return <article id="bower" className="bower-study project-study" aria-labelledby="bower-title">
  <div className="bower-orbit" aria-hidden="true"/>
  <header className="bower-header"><span className="bower-meta">FALL 2024 · EXPERIENCE & INTERACTION · LONDON</span><span className="bower-edition">A companion for the everyday.</span></header>
  <div className="bower-main">
   <div className="bower-copy"><h2 id="bower-title">BOWER<span aria-hidden="true">.</span></h2><h3>Small tasks.<br/>Someone to care for.</h3><p className="bower-lead">A virtual-pet planner that turns everyday tasks into treats for a companion.</p>
    <ul className="bower-skills" aria-label="BOWER skills">{['User research','Journey mapping','Interaction design','Paper prototyping','Figma'].map(s=><li key={s}>{s}</li>)}</ul>
    <div className="bower-story"><h4>Why a pet?</h4><p>I have a dog, so the idea felt natural. Games like Pokémon and virtual pets give people someone to look after. I wanted to bring that <strong>emotional connection</strong> to completing everyday tasks.</p><h4>From student routines to a product idea.</h4><p>Our group studied the transition to independent living through a survey and interviews with three students. Balancing routines, tasks, and social life became the starting point for my BOWER design.</p></div>
    <div className="bower-loop" aria-label="Core experience"><div><b>01</b><strong>Set</strong><span>Create a task.</span></div><span aria-hidden="true">→</span><div><b>02</b><strong>Track</strong><span>See your progress.</span></div><span aria-hidden="true">→</span><div><b>03</b><strong>Treat</strong><span>Reward your pet.</span></div></div>
   </div>
   <div className="bower-play"><div className="bower-play-label"><span>TRY THE ORIGINAL</span><span>↘</span></div>
    <div className={'bower-prototype '+(live?'is-live':'')}>
     {live?<iframe title="BOWER interactive Figma prototype" src={embed} allowFullScreen/>:<button className="bower-launch" onClick={()=>setLive(true)}><img src="/images/bower-2.webp" alt="BOWER original app screens"/><span className="bower-launch-cta"><span aria-hidden="true">▶</span> Play prototype</span></button>}
    </div>
    <div className="bower-prototype-footer"><span>Figma prototype · Click through the app</span><a href={prototype} target="_blank" rel="noreferrer">Open full screen ↗</a></div>
    <p className="bower-play-hint">Try setting a task, tracking it, and collecting a treat. If the embed asks you to sign in, open the prototype in Figma.</p>
   </div>
  </div>
  <section className="bower-process" aria-labelledby="bower-process-title"><div className="bower-process-heading"><div><span className="bower-meta">THE DESIGN, REVISITED</span><h3 id="bower-process-title">From paper to a little personality.</h3></div><a href="https://www.figma.com/design/D2MdArdmtQgoOgXJpbkbpn/Wireframe-for-E-I-Portfolio" target="_blank" rel="noreferrer">Explore the wireframes ↗</a></div>
   <div className="bower-tabs" role="group" aria-label="Design iterations">{iterations.map((s,i)=><button key={s.label} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span>{s.label}</button>)}</div>
   <div className="bower-iteration"><figure><img src={step.image} alt={step.label+' for BOWER'} loading="lazy"/><figcaption>{step.label} · Original project documentation</figcaption></figure><div aria-live="polite"><h4>{step.title}</h4><p>{step.text}</p></div></div>
  </section>
  <footer className="bower-end"><span><strong>Designed outcome</strong> · An interactive concept connecting planning, progress, and pet care.</span><a href="https://www.figma.com/design/7DpQeHzEFvIAbXdxteypcz/BOWER---Final-Prototype" target="_blank" rel="noreferrer">View design file ↗</a></footer>
 </article>
}
