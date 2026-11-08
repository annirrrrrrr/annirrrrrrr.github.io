'use client';
import {useState,useEffect,useRef,useLayoutEffect,type CSSProperties,type ComponentProps} from 'react';
import {createPortal} from 'react-dom';
import {usePathname} from '@/src/static-navigation';
import {chapters,projects,research,personalLinks} from '@/lib/portfolio-content';
import {destinations,annieStories,personalPhotos,internships,socialStory} from '@/lib/portfolio-content';
// Use document navigation so links work independently of hosted client routing.
function Link(props:ComponentProps<'a'>){return <a {...props}/>}
export function SiteShell({children}:{children:React.ReactNode}){
 const path=usePathname();const nav=useRef<HTMLDivElement>(null);const indicator=useRef<HTMLSpanElement>(null);const last=useRef(2);const [direction,setDirection]=useState(1);const [ready,setReady]=useState(false);
 useLayoutEffect(()=>{const index=destinations.findIndex(d=>path==='/'+d.slug);setDirection(index>=last.current?1:-1);last.current=index;const a=nav.current?.querySelector<HTMLElement>('[aria-current="page"]');if(a&&indicator.current){indicator.current.style.width=a.offsetWidth+'px';indicator.current.style.transform=`translateX(${a.offsetLeft}px)`;nav.current?.scrollTo({left:a.offsetLeft-(nav.current.clientWidth-a.offsetWidth)/2,behavior:'smooth'});}setReady(true);},[path]);
 useEffect(()=>{const onResize=()=>{const a=nav.current?.querySelector<HTMLElement>('[aria-current="page"]');if(a&&indicator.current){indicator.current.style.width=a.offsetWidth+'px';indicator.current.style.transform=`translateX(${a.offsetLeft}px)`;nav.current?.scrollTo({left:a.offsetLeft-(nav.current.clientWidth-a.offsetWidth)/2,behavior:'instant'});}};window.addEventListener('resize',onResize);return()=>window.removeEventListener('resize',onResize)},[]);
 return <><a href="#main" className="skip">Skip to content</a><header className={'site-header '+(path==='/annie'?'on-photo':'')}><nav aria-label="Main navigation" className="capsule"><div ref={nav} className="nav-scroll"><div className="nav-inner"><span ref={indicator} className={'selection '+(ready?'ready':'')} aria-hidden="true"/>{destinations.map(d=><Link className={d.slug==='annie'?'annie-destination':undefined} key={d.slug} href={'/'+d.slug} aria-current={path==='/'+d.slug?'page':undefined} aria-label={d.label}>{d.slug==='social-responsibility'?<><span className="nav-full-label">{d.label}</span><span className="nav-mobile-label" aria-hidden="true">Social</span></>:d.label}</Link>)}</div></div></nav></header><div key={path} className="route-content" style={{'--direction':direction} as CSSProperties}>{children}</div><footer><Link href="/annie">Annie Zhu</Link><span>A work in progress, with intention.</span><a href="#main">Back to top ↑</a></footer></>
}
function Intro({title,description}:{title:string;description:string}){return <div className="intro"><span className="eyebrow">ANNIE ZHU</span><h1>{title}</h1><p>{description}</p></div>}
function MediaSlot({label,className='',src,alt,contain=false}:{label:string;className?:string;src?:string;alt?:string;contain?:boolean}){
 const interactive=usePathname()==='/annie';
 const figure=useRef<HTMLElement>(null);
 const [preview,setPreview]=useState<{left:number;top:number;width:number;height:number}|null>(null);
 const show=()=>{
  const el=figure.current;const img=el?.querySelector('img');if(!el||!img?.naturalWidth)return;
  const rect=el.getBoundingClientRect(),ratio=img.naturalWidth/img.naturalHeight;
  const maxWidth=window.innerWidth-32,maxHeight=window.innerHeight-48;
  const width=Math.min(Math.max(rect.width*1.35,rect.height*1.35*ratio),maxWidth,maxHeight*ratio);
  const height=width/ratio;
  setPreview({width,height,left:Math.max(16,Math.min(rect.left+rect.width/2-width/2,window.innerWidth-width-16)),top:Math.max(24,Math.min(rect.top+rect.height/2-height/2,window.innerHeight-height-24))});
 };
 useEffect(()=>{if(!preview)return;const close=()=>setPreview(null);const key=(e:KeyboardEvent)=>{if(e.key==='Escape')close()};const outside=(e:PointerEvent)=>{if(!figure.current?.contains(e.target as Node))close()};window.addEventListener('scroll',close,true);window.addEventListener('resize',close);window.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{window.removeEventListener('scroll',close,true);window.removeEventListener('resize',close);window.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside)}},[preview]);
 if(src)return <figure ref={figure} className={'media-slot photo-slot '+className+(contain?' contain':'')+(interactive?' expandable-photo':'')} onPointerEnter={interactive?e=>{if(e.pointerType==='mouse')show()}:undefined} onPointerLeave={interactive?e=>{if(e.pointerType==='mouse')setPreview(null)}:undefined}>
 <img src={src} alt={alt||label} loading="lazy" decoding="async"/><figcaption>{label}</figcaption>
 {interactive&&<button className="photo-preview-trigger" aria-label={'View full photograph: '+label} aria-expanded={!!preview} onFocus={show} onBlur={()=>setPreview(null)} onPointerDown={e=>{if(e.pointerType!=='mouse')e.preventDefault()}} onClick={()=>{if(preview)setPreview(null);else show()}}/>}
 {preview&&createPortal(<div className="photo-hover-preview" style={preview} aria-hidden="true"><img src={src} alt=""/><span>{label}</span></div>,document.body)}
 </figure>;
 return <div className={'media-slot '+className}><span className="media-mark" aria-hidden="true"/><span>{label}</span><small>Photographs to come</small></div>
}
function PersonalLinks(){return <div className="personal-links"><div>{(['linkedin','resume'] as const).map(k=>personalLinks[k]?<a className="pill" key={k} href={personalLinks[k]!} target="_blank" rel="noreferrer">{k==='linkedin'?'LinkedIn':'Resume'} ↗</a>:<button key={k} className="pill" disabled title="Link to be supplied">{k==='linkedin'?'LinkedIn':'Resume'} ↗</button>)}</div></div>}
const journeyPhotos:Record<number,{src:string;alt:string;contain?:boolean}>={3:{src:'/images/guizhou-2.webp',alt:'Children together outside the school in Guizhou'},4:{src:'/images/michigan-engineering.webp',alt:'University of Michigan Engineering block M logo',contain:true}};
const gapYearPhotos=[
 {src:'/images/guizhou-2.webp',alt:'Children together outside the school in Guizhou',location:'Guizhou'},
 {src:'/images/guizhou-1.webp',alt:'Students in a classroom in Guizhou',location:'Guizhou'},
 {src:'/images/asi-1.webp',alt:'Annie speaking with attendees at a maritime exhibition',location:'ASI · Maritime Exhibition'},
 {src:'/images/asi-2.webp',alt:'Annie meeting visitors at a maritime exhibition',location:'ASI · Maritime Exhibition'},
 {src:'/images/asi-3.webp',alt:'A discussion at a maritime exhibition booth',location:'ASI · Maritime Exhibition'}
];
function JourneyPhoto({chapter,index}:{chapter:(typeof chapters)[number];index:number}){
 const [slide,setSlide]=useState(0);const touch=useRef<{x:number;y:number}|null>(null);
 const isGap=index===3;const photo=isGap?gapYearPhotos[slide]:journeyPhotos[index];
 const move=(step:number)=>setSlide(i=>(i+step+gapYearPhotos.length)%gapYearPhotos.length);
 return <figure className={'journey-photo '+(photo?'has-photo':'no-photo')+(!isGap&&journeyPhotos[index]?.contain?' logo-photo':'')+(isGap?' journey-slideshow':'')}
 tabIndex={isGap?0:undefined} aria-label={isGap?'Gap year photographs':undefined}
 onKeyDown={e=>{if(isGap&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();e.stopPropagation();move(e.key==='ArrowRight'?1:-1)}}}
 onTouchStart={e=>{if(isGap)touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}}}
 onTouchEnd={e=>{if(!isGap||!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);touch.current=null}}
 onTouchCancel={()=>{touch.current=null}}>
 {photo&&<img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy"/>}
 <figcaption><span className="eyebrow">{chapter.year} / {isGap?gapYearPhotos[slide].location:chapter.location}</span><h3>{chapter.title}</h3>{!photo&&<small>Photographs to come</small>}</figcaption>
 {isGap&&<div className="journey-photo-controls"><button type="button" aria-label="Previous gap year photo" onClick={()=>move(-1)}>←</button><span aria-live="polite" aria-atomic="true">{slide+1} / {gapYearPhotos.length}</span><button type="button" aria-label="Next gap year photo" onClick={()=>move(1)}>→</button></div>}
 </figure>
}
function Journey(){const [open,setOpen]=useState<number|null>(null);const [selected,setSelected]=useState(3);const c=chapters[selected];return <section className="journey wrap" aria-labelledby="journey-heading"><span className="eyebrow">ALONG THE WAY</span><h2 id="journey-heading">A compact journey</h2><div className="journey-grid"><div className="chapter-list">{chapters.map((chapter,i)=><article className={'chapter '+(open===i?'expanded':'')} key={chapter.year}><h3><button id={'chapter-trigger-'+i} aria-expanded={open===i} aria-controls={'chapter-'+i} onClick={()=>{setSelected(i);setOpen(open===i?null:i)}}><span className="year">{chapter.year}</span><span>{chapter.title}</span><span className="plus" aria-hidden="true">{open===i?'−':'+'}</span></button></h3><div className="chapter-panel" id={'chapter-'+i} role="region" aria-labelledby={'chapter-trigger-'+i} hidden={open!==i}><span className="eyebrow">{chapter.location}</span>{chapter.body.map((p,j)=><p key={j}>{p}</p>)}{chapter.link&&<Link className="text-link" href={chapter.link}>{chapter.label} ↗</Link>}<div className="mobile-chapter-media"><JourneyPhoto chapter={chapter} index={i}/></div></div></article>)}</div><div className="journey-visual" aria-live="polite"><JourneyPhoto key={selected} chapter={c} index={selected}/></div></div></section>}
function PersonalPhotoBand(){
 const [paused,setPaused]=useState(false);
 return <section className={'personal-photo-band '+(paused?'is-paused':'')} aria-label="Life outside work">
 <div className="band-heading wrap"><div><span className="eyebrow">OFF THE CLOCK</span><h2>A little more of me.</h2></div><button className="pill" aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?'Play photos →':'Pause photos Ⅱ'}</button></div>
 <div className="photo-band-window"><div className="photo-band-track">{[0,1].map(copy=><div className="photo-band-group" key={copy} aria-hidden={copy===1?true:undefined}>{personalPhotos.map(photo=><figure key={photo.src}><img src={photo.src} alt={copy===0?photo.alt:''} decoding="async"/><figcaption>{photo.label}</figcaption></figure>)}</div>)}</div></div>
 </section>
}
function GuizhouStoryPhotos(){
 const photos=gapYearPhotos.slice(0,2);
 const [slide,setSlide]=useState(0);
 const touch=useRef<{x:number;y:number}|null>(null);
 const move=(step:number)=>setSlide(i=>(i+step+photos.length)%photos.length);
 return <figure className="story-photo guizhou-gallery" tabIndex={0} aria-label="Guizhou photo gallery"
 onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();move(e.key==='ArrowRight'?1:-1)}}}
 onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}}}
 onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);touch.current=null}}
 onTouchCancel={()=>{touch.current=null}}>
 {photos.map((photo,i)=><img key={photo.src} src={photo.src} alt={photo.alt} hidden={slide!==i} loading="lazy"/>)}
 <figcaption>{slide===0?'Guizhou · The children':'Guizhou · In the classroom'}</figcaption>
 <div className="guizhou-controls"><button type="button" aria-label="Previous Guizhou photo" onClick={()=>move(-1)}>←</button><span aria-live="polite" aria-atomic="true">{slide+1} / {photos.length}</span><button type="button" aria-label="Next Guizhou photo" onClick={()=>move(1)}>→</button></div>
 </figure>
}
const storyHighlights=['learn from one another','Who did the support reach?','What did they actually need?','trying harder and making progress','Spark Scholarship','need, participation, and improvement','their effort paying off','one searchable database','three hours to forty minutes','making the fix useful to other people'];
function StoryText({text}:{text:string}){const pattern=new RegExp('('+storyHighlights.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','g');return <>{text.split(pattern).map((part,i)=>storyHighlights.includes(part)?<strong key={i}>{part}</strong>:part)}</>}
function Annie(){return <><section className="hero"><div className="hero-photo"><img src="/images/annie-saida.png" alt="Annie and Saida together on a sunlit street" fetchPriority="high"/></div><div className="hero-shade"/><div className="hero-copy"><h1>Annie Zhu</h1><p>Let enthusiasm guide me.</p><span className="affiliation hero-introduction">I’m Annie—a University of Michigan robotics student who believes in building technology and communities that <em className="hero-purpose">serve people</em>.</span><PersonalLinks/></div></section>
 <section className="story-opening wrap" aria-label="How I approach building"><span className="eyebrow">ABOUT ME</span><h2>I often think:<br/><em>how to build better</em></h2></section>
 <section className="annie-stories wrap" aria-label="My story">{annieStories.map(story=><article className={'annie-story story-'+story.id} key={story.id}>
 <div className="story-visual">{story.id==='guizhou'?<GuizhouStoryPhotos/>:<figure className="story-photo"><img src={story.image} alt={story.alt} loading="lazy"/>{story.id==='teentors'&&<img className="teentors-photo-logo" src="/images/teentors-logo.png" alt="Teentors Education"/>}<figcaption>{story.caption}</figcaption></figure>}<div className="story-reference">{story.id==='teentors'?<><span>Photo: Annie’s archive · Spark Scholarship</span><Link href="/social-responsibility">Reference: Teentors story ↗</Link></>:<span>Photo: Annie’s archive</span>}</div></div>
 <div className="story-copy"><span className="eyebrow">{story.label}</span><h2>{story.title}</h2>{story.body.map(paragraph=><p key={paragraph}><StoryText text={paragraph}/></p>)}<Link className="text-link" href={story.href}>{story.link} ↗</Link></div>
 </article>)}</section>
 <section className="story-michigan annie-story wrap" aria-labelledby="michigan-heading">
 <div className="story-copy"><span className="eyebrow">04 / UMICH ROBOTICS · ANN ARBOR</span><h2 id="michigan-heading">I wanted to build it myself.</h2><p>During my gap year, I found myself drawn to the technical problems I was working through with engineers. I wanted to understand how things worked—and <strong>learn enough to make them myself.</strong></p><p>That curiosity brought me to <strong>robotics at Michigan.</strong> Now, I get to follow it through classes, research, and projects with other people. I like <strong>having an idea, trying it out, and figuring out what to change</strong> when it doesn’t quite work.</p><div className="story-links"><Link className="text-link" href="/projects">Explore Projects ↗</Link><Link className="text-link" href="/research">Explore Research ↗</Link></div></div>
 <div className="story-visual"><figure className="story-photo"><img src="/images/michigan-robotics.webp" alt="A legged robot climbing outdoor steps with students nearby" loading="lazy"/><figcaption>Michigan Robotics · University of Michigan</figcaption></figure><div className="story-reference"><a href="https://robotics.umich.edu/" target="_blank" rel="noreferrer">Reference: Michigan Robotics ↗</a></div></div>
 </section>
 <PersonalPhotoBand/>
 </>}
function ProjectPhotos({project}:{project:(typeof projects)[number]}){
 const [photo,setPhoto]=useState(0);const touch=useRef<{x:number;y:number}|null>(null);
 const photos=[{src:project.image!,alt:project.imageAlt||project.title},...(project.photos||[])];
 const move=(step:number)=>setPhoto(i=>(i+step+photos.length)%photos.length);
 return <div className="project-photo-gallery" role="group" aria-label={project.title+' photographs'} tabIndex={0}
 onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.stopPropagation();e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}}
 onTouchStart={e=>{e.stopPropagation();touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}}}
 onTouchMove={e=>e.stopPropagation()}
 onTouchEnd={e=>{e.stopPropagation();if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);touch.current=null}}
 onTouchCancel={()=>{touch.current=null}}>
 <img key={photos[photo].src} className="project-photo" src={photos[photo].src} alt={photos[photo].alt} loading="lazy" decoding="async"/>
 {photos.length>1&&<div className="photo-controls"><button type="button" aria-label={'Previous photo of '+project.title} onClick={()=>move(-1)}>←</button><span aria-live="polite" aria-atomic="true">{photo+1} / {photos.length}</span><button type="button" aria-label={'Next photo of '+project.title} onClick={()=>move(1)}>→</button></div>}
 </div>
}
const projectThemes:Record<string,{tags:string[];focus:string;note:string}>={
 '01':{tags:['Magnetic levitation','CAD','Physical prototype'],focus:'From assembly to experiment',note:'A closer look at the design and physical build.'},
 '02':{tags:['LiDAR mapping','Localization','Path planning'],focus:'Making the pieces work together',note:'Control → Mapping → Localization → Navigation'},
 '03':{tags:['Interaction design','Virtual pets','Figma prototype'],focus:'A little care goes a long way',note:'Set a task → Track progress → Care for your pet'},
 '04':{tags:['Product concept','Waste sorting','3D modeling'],focus:'Giving each material a place',note:'Cans · Bottles · Cardboard'}
};
const maglevDetails=[
 {title:'Track design',text:'Interlocking track segments let children build their own route. Magnet spacing across the connections was designed to keep the train moving smoothly.',x:30,y:78},
 {title:'Magnet carriers',text:'Removable holders position the neodymium magnets. Repulsion supports the train; spacing and alignment were refined to reduce bouncing and derailment.',x:43,y:63},
 {title:'Laser-cut acrylic',text:'Transparent walls guide the train laterally while keeping levitation visible. Covers and stabilizers hold the track assembly together.',x:66,y:47},
 {title:'Track holder',text:'Inspired by LEGO, the track holder supports the rail and provides a place for LEGO ornaments, letting children personalize the build and make it more playful.',x:79,y:72}
];
const buildSteps=[
 ['cardboard','Test the idea','A cardboard prototype to test magnetic levitation.','Success'],
 ['drawing','CAD drawing','Translate the concept into component drawings.',''],
 ['track-test','Testing levitation','Test the floating track before moving into the complete assembly.',''],
 ['assembly','Assembly model','Bring the track, train, and launcher together in CAD.',''],
 ['wiring','Electrical design','Plan the ultrasonic sensor, LCD, and Arduino connections.',''],
 ['schematic','Circuit schematic','Document the speed-sensing circuit.',''],
 ['parts','Fabricate the parts','Make the modular components for the physical build.','Success'],
 ['launch-test','An idea that failed','The fan-propulsion concept did not provide enough thrust with the available power.','Failed'],
 ['launcher','A new direction','Use elastic energy storage with motor control to load and release the train.','New idea'],
 ['carriage','Train carriage','The final carriage carries a flag for the ultrasonic speed sensor.',''],
 ['station','Electronics station','Bring the sensing, display, and launch electronics into the station.','Success'],
 ['overall','The physical build','The assembled train, modular track, launcher, and electronics station together in the classroom.','']
];
function BuildWalk(){const [step,setStep]=useState(0);const d=buildSteps[step];return <div className="build-walk"><div className="scrapbook-heading"><span className="eyebrow">ON THE WORKBENCH / THE BUILD JOURNEY</span><span className="handwritten">test → learn → build again</span></div><nav className="walk-stops" aria-label="Build stages">{buildSteps.map((v,i)=><button key={v[0]} aria-current={step===i?'step':undefined} onClick={()=>setStep(i)} aria-label={'Step '+(i+1)+': '+v[1]}>{String(i+1).padStart(2,'0')}</button>)}</nav><div className="walk-stage"><figure className={'walk-print '+(['drawing','assembly','wiring','schematic'].includes(d[0])?'technical':'')}><a href={'/images/maglev-'+d[0]+'.png'} target="_blank" rel="noopener noreferrer"><img src={'/images/maglev-'+d[0]+'.png'} alt={d[1]}/></a>{d[3]&&<span className={'walk-stamp stamp-'+d[3].toLowerCase().replace(' ','-')}>{d[3]}</span>}<figcaption>{String(step+1).padStart(2,'0')} — {d[1]}</figcaption></figure><div className="walk-story" aria-live="polite"><span className="eyebrow">STEP {step+1} / {buildSteps.length}</span><h3>{d[1]}</h3><p>{d[2]}</p><div className="walk-controls"><button disabled={step===0} onClick={()=>setStep(step-1)}>← Previous</button><button disabled={step===buildSteps.length-1} onClick={()=>setStep(step+1)}>Next →</button></div></div></div></div>}
function MaglevStudy(){
 const [active,setActive]=useState<number|null>(null);
 const [motion,setMotion]=useState(true);
 const studyRef=useRef<HTMLElement>(null);
 const [progress,setProgress]=useState(0);
 useEffect(()=>{if(!motion)return;const update=()=>{const el=studyRef.current;if(el){const r=el.getBoundingClientRect();setProgress(Math.max(0,Math.min(1,(window.innerHeight-r.top)/(r.height+window.innerHeight))));}};update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);},[motion]);
 return <article ref={studyRef} className={'project-study maglev-workshop '+(!motion?'motion-off':'')} aria-labelledby="maglev-title">
 <div className="magnetic-sketch magnetic-sketch-field" aria-hidden="true"><svg viewBox="0 0 220 150" fill="none">{[0,1,2,3,4,5].map(i=><path key={i} d={`M 91 75 C ${65-i*9} ${52-i*12}, ${155+i*9} ${52-i*12}, 129 75 M 91 75 C ${65-i*9} ${98+i*12}, ${155+i*9} ${98+i*12}, 129 75`}/>)}<rect x="91" y="65" width="38" height="20" rx="2"/><path d="M110 65v20"/><text x="97" y="79">N</text><text x="115" y="79">S</text></svg><span>FIELD NOTES / 01</span></div>
 <div className="magnetic-sketch magnetic-sketch-repel" aria-hidden="true"><svg viewBox="0 0 200 110" fill="none"><path d="M35 40h45v30H35zM120 40h45v30h-45z"/><text x="62" y="59">N</text><text x="126" y="59">N</text>{[0,1,2,3].map(i=><path key={i} d={`M80 ${45+i*6} Q ${105-i*5} ${8-i*8} ${50-i*7} ${14-i*4} M120 ${45+i*6} Q ${95+i*5} ${8-i*8} ${150+i*7} ${14-i*4}`}/>)}<path className="repulsion-arrow" d="M72 88H42m0 0 7-5m-7 5 7 5M128 88h30m0 0-7-5m7 5-7 5"/></svg><span>LIKE POLES REPEL ↔</span></div>
 <div className="draft-fragment draft-fragment-a" aria-hidden="true"/><div className="draft-fragment draft-fragment-b" aria-hidden="true"/><div className="draft-fragment draft-fragment-c" aria-hidden="true"/><div className="draft-fragment draft-fragment-d" aria-hidden="true"/><div className="draft-fragment draft-fragment-e" aria-hidden="true"/><div className="drawing-coordinates" aria-hidden="true">4　　　　　3　　　　　2　　　　　1</div><header className="workshop-header"><div><span className="eyebrow">JAN 2025</span><h2 id="maglev-title">Multi-Module MAG-LEV Train System</h2></div><span className="workshop-index">BUILD / 01</span></header>
 <ul className="study-tags workshop-tags" aria-label="Project topics">{['Rhino · SolidWorks','3D printing','Laser cutting','Soldering','Circuit prototyping','Motor control'].map(t=><li key={t}>{t}</li>)}</ul>
 <div className="workshop-main"><div className="workshop-copy"><span className="eyebrow">PROJECT SPEC</span><h3>A modular STEM toy for grades 4–5.</h3><p>Magnetic repulsion suspends the carriage above an interlocking track. An elastic launcher propels it forward; an ultrasonic sensor measures motion and an LCD displays speed.</p><dl className="maglev-spec"><div><dt>Structure</dt><dd>3D-printed magnet carriers and supports; laser-cut acrylic walls and covers.</dd></div><div><dt>Actuation & electronics</dt><dd>Motor-controlled elastic launcher, Arduino Uno, ultrasonic sensor, LCD, and prototyped circuitry.</dd></div><div><dt>Key Contribution</dt><dd><ul className="contribution-points"><li><strong>Led development from CAD to a working prototype</strong> using SolidWorks, Rhino, 3D printing, and laser cutting.</li><li><strong>Introduced the elastic-energy launcher</strong> and redesigned the starting track and servo arrangement to reduce friction.</li><li><strong>Turned feedback from 3 on-site user tests into design changes</strong> at Mills College Children’s School, including LEGO-compatible features for more playful interaction.</li></ul></dd></div><div><dt>Test &amp; Validation</dt><dd><ol className="contribution-points"><li><strong>Component checks:</strong> inspected tracks, magnet holders, covers, and connections; checked wiring, motors, servo, IR remote, ultrasonic sensor, and LCD individually.</li><li><strong>System integration:</strong> tested the complete load–tension–release sequence. Investigated gate slippage, revised the operating sequence, and retested the launcher.</li><li><strong>User validation:</strong> gathered feedback through 3 on-site tests at Mills College Children’s School, observing assembly, controls, and hands-on play.</li></ol></dd></div><div><dt>Outcome</dt><dd><strong>Launches up to 1 m</strong> and reduced bouncing after magnet-layout refinements. Children responded enthusiastically to levitation and LEGO-compatible play. Testing also established the next design priorities: stronger magnet retention, more secure connections, clearer controls, and reliable actuation as the battery drains.</dd></div></dl>
</div>
 <figure className="workshop-assembly"><div className="workshop-diagram" onKeyDown={e=>{if(e.key==='Escape')setActive(null)}}><img src="/images/maglev-exploded.png" alt="Exploded MAG-LEV CAD assembly showing plates, magnet carriers, and the track"/>{maglevDetails.map((d,i)=><div key={d.title} className={'assembly-point point-'+i+(active===i?' open':'')} style={{left:d.x+'%',top:d.y+'%'}} onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)} onFocus={()=>setActive(i)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setActive(null)}}><button className="assembly-trigger" aria-label={'Explore '+d.title} aria-expanded={active===i} aria-controls={'assembly-note-'+i} onClick={()=>setActive(i)}>0{i+1}</button><div className="assembly-popover" id={'assembly-note-'+i} hidden={active!==i}><span>0{i+1} / ASSEMBLY NOTES</span><strong>{d.title}</strong><p>{d.text}</p></div></div>)}</div><figcaption><span>EXPLODED VIEW</span><span>Hover or tap the numbers ↗</span></figcaption><div className="assembled-display"><img src="/images/maglev-assembly-cutout.png" alt="Assembled MAG-LEV CAD model with background removed"/><span>ASSEMBLED MODEL</span></div></figure></div>
 <div className="workshop-scrapbook"><BuildWalk/></div>
 <div className="workshop-companion" aria-hidden="true" style={{top:(180+progress*390)+'px'}}><svg viewBox="0 0 50 64"><path d="M25 9V3m-3 0h6"/><rect x="10" y="10" width="30" height="23" rx="10"/><circle cx="20" cy="21" r="2"/><circle cx="30" cy="21" r="2"/><path d="M21 27h8M17 36h16l3 14H14zM14 39l-7 7m29-7 7-5M20 51l-3 8m13-8 3 8"/></svg><span>··</span></div><button className="workshop-motion" onClick={()=>setMotion(!motion)} aria-pressed={!motion}>{motion?'Pause companion':'Resume companion'}</button>
 </article>}

function Projects(){return <><header className="projects-opening wrap"><div className="opening-block opening-block-a" aria-hidden="true"/><div className="opening-block opening-block-b" aria-hidden="true"/><div className="opening-block opening-block-c" aria-hidden="true"/><h1>What I’ve built</h1><a className="opening-arrow" href="#selected-projects" aria-label="Explore projects below">↓</a></header><section id="selected-projects" className="project-studies wrap" aria-label="Selected projects">{projects.map(p=>{if(p.index==='01')return <MaglevStudy key={p.index}/>;const theme=projectThemes[p.index];return <article className={'project-study study-'+p.index} key={p.index} aria-labelledby={'study-'+p.index}><header className="study-heading"><span className="eyebrow">{p.index} / {p.tag}</span><h2 id={'study-'+p.index}>{p.title}</h2><ul className="study-tags" aria-label="Project topics">{theme.tags.map(t=><li key={t}>{t}</li>)}</ul></header><div className="study-body"><div className="study-copy"><h3>{theme.focus}</h3><p>{p.description}</p><div className="study-note"><span className="eyebrow">{p.index==='02'?'SYSTEM PIPELINE':p.index==='03'?'THE EXPERIENCE':'DESIGN NOTES'}</span><p>{theme.note}</p></div>{p.index==='03'&&<p className="prototype-status">Original interface preview · Interactive prototype coming next</p>}</div><div className="study-media">{p.index==='01'||p.index==='04'?<div className="study-pair"><figure><img src={p.image} alt={p.imageAlt} loading="lazy"/><figcaption>{p.index==='01'?'Assembly study':'Product concept'}</figcaption></figure><figure><img src={p.index==='01'?p.photos?.[0].src:p.photos?.[2].src} alt={p.index==='01'?'Physical magnetic levitation prototype':'Early waste-sorting concept sketch'} loading="lazy"/><figcaption>{p.index==='01'?'Physical prototype':'Early exploration'}</figcaption></figure></div>:<><span className="media-label">{p.index==='03'?'BOWER / INTERFACE STUDY':'MBOT / FIELD NOTES'}</span><ProjectPhotos project={p}/></>}</div></div></article>})}</section></>}
function Research(){return <><h1 className="visually-hidden">Research</h1><section className="research-list research-direct narrow" aria-label="Research">{research.map((r,i)=><article key={r.title}><div className={'research-thumb thumb-'+i}><img src={r.image} alt={r.imageAlt} loading="lazy" decoding="async"/></div><div><span className="eyebrow">{r.year}</span><h2>{r.title}</h2><span className="accent-line"/>{r.description.split('\n\n').map((paragraph,j)=><p key={j}>{paragraph}</p>)}<ul className="research-keywords" aria-label="Research keywords">{r.keywords.map(keyword=><li key={keyword}>{keyword}</li>)}</ul><a className="text-link" href={r.url} target="_blank" rel="noopener noreferrer" aria-label={"Visit research page: "+r.title+" (opens in a new tab)"}>Visit research page ↗</a></div></article>)}</section></>}
function Social(){const [arrival,children,spark]=socialStory.chapters;const photo=(chapter:typeof arrival)=><figure className={'news-photo news-photo-'+chapter.id}><img src={chapter.image} alt={chapter.alt} loading="lazy"/><figcaption>{chapter.caption}</figcaption></figure>;return <article className="social-news">
 <header className="news-header"><span className="eyebrow">SOCIAL RESPONSIBILITY</span><h1>{socialStory.title}</h1><div className="organization-identity"><img src="/images/teentors-logo.png" alt="Teentors Education logo"/><div><strong>Teentors Education</strong><span className="eyebrow">GUIZHOU · JAN–APR 2024</span></div></div></header>
 <div className="news-body"><p>{arrival.body[0]}</p>
 <figure className="news-photo news-photo-landscape"><img src="/images/guizhou-view.png" alt="River winding between hills in Guizhou" loading="lazy"/><figcaption>Guizhou · A view from my gap year</figcaption></figure>
 <p>{arrival.body[1]}</p><p>{socialStory.firstDay}</p>
 <div className="news-photo-pair"><figure className="news-photo"><img src="/images/guizhou-first-room.webp" alt="My room on the first day in Guizhou" loading="lazy"/><figcaption>My room when I arrived</figcaption></figure><figure className="news-photo"><img src="/images/guizhou-first-mattress.webp" alt="A temporary mattress wrapped in black garbage bags" loading="lazy"/><figcaption>Wrapping the temporary mattress in garbage bags</figcaption></figure></div>
 {photo(arrival)}<p>{children.body[0]}</p>
 <div className="news-photo-pair">{photo(children)}<figure className="news-photo news-photo-gifts"><img src="/images/guizhou-gift.jpg" alt="Handwritten notes and colorful folded paper gifts from my students" loading="lazy"/><figcaption>Handwritten notes and little gifts from my students</figcaption></figure></div>
 <p>{socialStory.homeVisit[0]}</p><figure className="news-photo news-photo-home-visit"><img src="/images/guizhou-home-visit.webp" alt="Visiting a student at home in Guizhou" loading="lazy"/><figcaption>A home visit that changed how I thought about support</figcaption></figure><p>{socialStory.homeVisit[1]}</p><p>{spark.body[0]}</p>{photo(spark)}<p>{spark.body[1]}</p></div>
 </article>}
function Internships(){return <><Intro title="Internships" description="From equity research to maritime cybersecurity."/><section className="internship-list wrap" aria-label="Internship experience">{internships.map((job,i)=><article className={'internship-entry internship-'+job.id} key={job.id}>
 <header className="internship-heading"><div><span className="eyebrow">0{i+1} / {job.location}</span><h2>{job.company}</h2><h3>{job.role}</h3><p>{job.team}</p></div><span className="internship-date">{job.date}</span></header>
 <p className="internship-summary">{job.summary}</p>
 <div className="internship-contributions">{job.contributions.map(item=><div key={item.title}><h4>{item.title}</h4><p>{item.text}</p></div>)}</div>
 <ul className="internship-tags" aria-label="Skills">{job.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>
 {job.photos.length>0&&<div className={'internship-photos '+(job.photos.length===1?'single':'')}>{job.photos.map(photo=><figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy"/><figcaption>{photo.caption}{'sourceUrl' in photo&&<a className="photo-credit" href={photo.sourceUrl} target="_blank" rel="noreferrer">Photo: {photo.credit} ↗</a>}</figcaption></figure>)}</div>}
 </article>)}</section></>}
export function PortfolioPage({section}:{section:string}){return <main id="main" tabIndex={-1} className={section==='annie'?'annie-page':'page'}>{section==='annie'?<Annie/>:section==='projects'?<Projects/>:section==='research'?<Research/>:section==='social-responsibility'?<Social/>:<Internships/>}</main>}
