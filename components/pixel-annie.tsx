import {useEffect} from 'react';
export default function PixelAnnie(){useEffect(()=>{

const root=document.createElement('div');root.className='pixel-companion';root.innerHTML='<button class="pixel-button" aria-label="Pixel Annie: back to project top"><span class="pixel-sprite"></span></button><button class="pixel-hide" aria-label="Hide Pixel Annie">×</button>';document.body.append(root);
const sprite=root.querySelector<HTMLElement>('.pixel-sprite')!,hide=root.querySelector<HTMLElement>('.pixel-hide')!;let hidden=false,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,lastScroll=0,raf=0;
const controls=document.createElement('div');controls.className='companion-controls';controls.innerHTML='<button class="pause">Pause motion</button><button class="restore">Show Annie</button>';document.body.append(controls);const pause=controls.querySelector<HTMLElement>('.pause')!;function label(){pause.textContent=paused?'Play motion':'Pause motion'}label();pause.onclick=()=>{paused=!paused;label()};controls.querySelector<HTMLElement>('.restore')!.onclick=()=>{hidden=false;root.style.display='block'};hide.onclick=()=>{hidden=true;root.style.display='none'};root.querySelector<HTMLElement>('.pixel-button')!.onclick=()=>window.scrollTo({top:0,behavior:paused?'instant':'smooth'});
function position(){
 const opening=document.querySelector('.projects-opening')?.getBoundingClientRect();
 const atTop=!!opening&&opening.bottom>innerHeight*.7;
 const edge=Math.max(0,...Array.from(document.querySelectorAll('.project-study')).map(el=>el.getBoundingClientRect().right));
 const fits=innerWidth>=1100&&(atTop||innerWidth-edge>=94);
 root.style.visibility=fits?'visible':'hidden';controls.style.display=fits?'flex':'none';
 const scale=atTop?1:.4;
 const x=atTop?(innerWidth-180)/2:innerWidth-84;
 const y=atTop?120:innerHeight-120;
 root.style.transform=`translate(${x}px,${y}px) scale(${scale})`;
 hide.style.visibility=fits?'visible':'hidden';raf=0
}
const onScroll=()=>{lastScroll=performance.now();if(!raf)raf=requestAnimationFrame(position)};addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',position);position();
const timer=setInterval(()=>{if(hidden)return;const t=performance.now(),p=scrollY/340;let f=2;if(!paused){if(p<.15)f=Math.floor(t/400)%10<4?Math.floor(t/400)%2:2;else f=t-lastScroll<180?Math.floor(t/500)%2:((Math.floor(t/150)%28===0)?3:2)}sprite.style.backgroundPosition=`${f*100/3}% 0`},150);

return ()=>{clearInterval(timer);cancelAnimationFrame(raf);removeEventListener("scroll",onScroll);removeEventListener("resize",position);root.remove();controls.remove()};
},[]);return null}
