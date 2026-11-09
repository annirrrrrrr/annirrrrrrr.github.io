import {useEffect,useRef} from 'react';

export default function ResearchParticles(){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=ref.current!,host=canvas.parentElement!,ctx=canvas.getContext('2d');
  if(!ctx)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),touch=matchMedia('(pointer: coarse)');
  let width=0,height=0,raf=0,mouse={x:-1000,y:-1000};
  let dots:{x:number;y:number;dx:number;dy:number;r:number}[]=[];
  let masks:{left:number;top:number;right:number;bottom:number}[]=[];
  const interactive=()=>!motion.matches&&!touch.matches&&innerWidth>700;
  function draw(){
   raf=0;ctx!.clearRect(0,0,width,height);let moving=false;
   for(const d of dots){
    const vx=d.x-mouse.x,vy=d.y-mouse.y,dist=Math.hypot(vx,vy),force=interactive()?Math.max(0,1-dist/120)*22:0;
    const tx=dist?vx/dist*force:0,ty=dist?vy/dist*force:0;
    d.dx+=(tx-d.dx)*.12;d.dy+=(ty-d.dy)*.12;
    if(Math.abs(tx-d.dx)+Math.abs(ty-d.dy)>.08)moving=true;
    const x=d.x+d.dx,y=d.y+d.dy;
    if(masks.some(b=>x>b.left&&x<b.right&&y>b.top&&y<b.bottom))continue;
    ctx!.beginPath();ctx!.arc(x,y,d.r,0,Math.PI*2);ctx!.fillStyle='rgba(66,123,149,.48)';ctx!.fill();
   }
   if(moving&&interactive()&&!document.hidden)raf=requestAnimationFrame(draw);
  }
  function schedule(){if(!raf)raf=requestAnimationFrame(draw)}
  function resize(){
   const rect=host.getBoundingClientRect();width=host.clientWidth;height=host.scrollHeight;
   const scale=Math.min(devicePixelRatio||1,2);canvas.width=width*scale;canvas.height=height*scale;canvas.style.height=height+'px';ctx!.setTransform(scale,0,0,scale,0,0);
   masks=Array.from(host.querySelectorAll('.research-direct article>div,.research-um-logo')).map(el=>{const r=el.getBoundingClientRect();return {left:r.left-rect.left-12,top:r.top-rect.top-12,right:r.right-rect.left+12,bottom:r.bottom-rect.top+12}});
   dots=[];for(let y=14;y<height;y+=24)for(let x=12;x<width;x+=25){const seed=Math.sin(x*12.9898+y*78.233)*43758.5453;const n=seed-Math.floor(seed);if(n>.38)dots.push({x:x+n*16,y:y+n*12,dx:0,dy:0,r:.9+n*.85})}schedule();
  }
  function move(e:PointerEvent){if(!interactive())return;const r=host.getBoundingClientRect();mouse={x:e.clientX-r.left,y:e.clientY-r.top};schedule()}
  function leave(){mouse={x:-1000,y:-1000};schedule()}
  const observer=new ResizeObserver(resize);observer.observe(host);host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);motion.addEventListener('change',leave);touch.addEventListener('change',leave);resize();
  return()=>{observer.disconnect();cancelAnimationFrame(raf);host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);motion.removeEventListener('change',leave);touch.removeEventListener('change',leave)};
 },[]);
 return <canvas ref={ref} className="research-particles" aria-hidden="true"/>;
}
