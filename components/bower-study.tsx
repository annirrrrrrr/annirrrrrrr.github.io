
const prototype='https://www.figma.com/proto/7DpQeHzEFvIAbXdxteypcz/BOWER---Final-Prototype?node-id=1-1110&starting-point-node-id=1%3A1110&scaling=scale-down&content-scaling=fixed';
const embed='https://embed.figma.com/proto/7DpQeHzEFvIAbXdxteypcz/BOWER---Final-Prototype?node-id=1-1110&starting-point-node-id=1%3A1110&scaling=scale-down&content-scaling=fixed&embed-host=share&hide-ui=1';
export default function BowerStudy(){
 return <article id="bower" className="bower-study project-study" aria-labelledby="bower-title">
  <div className="bower-orbit" aria-hidden="true"/><svg className="bower-bone" viewBox="0 0 140 70" aria-hidden="true"><path d="M30 22C8-5-10 27 15 35-10 43 8 75 30 48h80c22 27 40-5 15-13 25-8 7-40-15-13Z" fill="currentColor"/></svg>
  <header className="bower-header"><span className="bower-meta">FALL 2024 · EXPERIENCE & INTERACTION · LONDON</span><span className="bower-edition">A companion for the everyday.</span></header>
  <div className="bower-main">
   <div className="bower-copy"><h2 id="bower-title">BOWER<span aria-hidden="true">.</span></h2><h3>Small tasks.<br/>Someone to care for.</h3><p className="bower-lead">A virtual-pet planner that turns everyday tasks into treats for a companion.</p>
    <ul className="bower-skills" aria-label="BOWER skills">{['User research','Journey mapping','Interaction design','Paper prototyping','Figma'].map(s=><li key={s}>{s}</li>)}</ul>
    <div className="bower-story"><h4>Why a pet?</h4><p>I have a dog, so the idea felt natural. Games like Pokémon and virtual pets give people someone to look after. I wanted to bring that <strong>emotional connection</strong> to completing everyday tasks.</p><h4>From student routines to a product idea.</h4><p>I studied the transition to independent living through a survey and interviews with 69 students. Balancing routines, tasks, and social life became the starting point for my BOWER design.</p></div>

   </div>
   <div className="bower-play"><div className="bower-play-label"><span>TRY THE ORIGINAL</span><span>↘</span></div>
    <div className="bower-phone-stage"><span className="bower-treat-float" aria-hidden="true">+1 treat ♡</span><div className="bower-prototype is-live"><iframe title="BOWER interactive Figma prototype" src={embed} loading="lazy" allowFullScreen/></div><span className="bower-phone-note">a little motivation, on your screen.</span></div>
    <div className="bower-prototype-footer"><span>Figma prototype · Click through the app</span><a href={prototype} target="_blank" rel="noreferrer">Open full screen ↗</a></div>
    <p className="bower-play-hint">Set a task, track it, and collect a treat.</p>

   </div>
  </div>

  <section className="bower-integrated-flow" aria-label="Set Track Treat and design process"><div className="bower-native-steps"><span className="bower-meta">FINISH THE GAME IN 3 STEPS</span><div className="bower-step-screens">{[{title:'Set',screen:8},{title:'Track',screen:5},{title:'Treat',screen:6}].map(step=><figure key={step.title}><h3>{step.title}</h3><img src={'/images/bower-screen-'+step.screen+'.webp'} alt={'BOWER '+step.title+' interface'} loading="lazy"/></figure>)}</div></div>   <aside className="bower-wire-notes"><span className="bower-meta">FROM PAPER TO PROTOTYPE</span><h3>A clearer flow.<br/>One reward.</h3><p>Paper testing led me to reorder the interaction, add a leaderboard, and simplify rewards into treats.</p><div className="bower-wire-stack"><figure><img src="/images/bower-wireframe-before.webp" alt="First BOWER wireframe" loading="lazy"/><figcaption>01 · Before paper testing</figcaption></figure><figure><img src="/images/bower-wireframe-after.webp" alt="Revised BOWER wireframe after paper testing" loading="lazy"/><figcaption>02 · After paper testing</figcaption></figure></div><a href="https://www.figma.com/design/D2MdArdmtQgoOgXJpbkbpn/Wireframe-for-E-I-Portfolio" target="_blank" rel="noreferrer">Explore wireframes ↗</a></aside></section>
  <section className="bower-screen-gallery" aria-label="Final BOWER interface screens"><div className="bower-gallery-heading"><span className="bower-meta">THE FINAL INTERFACE</span><span>Set. Track. Treat. Repeat.</span></div><div className="bower-screen-row">{['Welcome','Home and plans','Chat input','Chat reminder','Task countdown','Treat reward','Progress and streaks','Create a task','Leaderboard'].map((label,i)=><figure key={label}><img src={'/images/bower-screen-'+(i+1)+'.webp'} alt={'BOWER — '+label} loading="lazy"/><figcaption>{label}</figcaption></figure>)}</div></section>
  <footer className="bower-end"><span><strong>Designed outcome</strong> · An interactive concept connecting planning, progress, and pet care.</span><div className="bower-resource-links"><a href="/documents/bower-pitch-deck.pdf" target="_blank" rel="noopener noreferrer">Pitch deck (PDF) ↗</a><a href="https://www.figma.com/design/7DpQeHzEFvIAbXdxteypcz/BOWER---Final-Prototype" target="_blank" rel="noreferrer">View design file ↗</a></div></footer>
 </article>
}
