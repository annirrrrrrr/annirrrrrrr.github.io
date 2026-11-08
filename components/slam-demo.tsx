import {useEffect,useRef,useState} from 'react';

// Illustrative maze geometry, not recorded MBot telemetry.
const walls=[
 [40,40,600,40],[600,40,600,440],[600,440,40,440],[40,440,40,40],
 [150,40,150,320],[150,320,270,320],[270,160,270,320],
 [270,160,420,160],[420,160,420,350],[420,350,510,350],
 [510,40,510,250],[270,440,270,390],
];
const route=[[90,390],[90,90],[90,370],[310,370],[310,390],[550,390],[550,290],[460,290],[460,100],[460,290],[550,290],[550,390],[340,390],[340,230]];
const lengths=route.slice(1).map((p,i)=>Math.hypot(p[0]-route[i][0],p[1]-route[i][1]));
const total=lengths.reduce((a,b)=>a+b,0);
function pose(t:number){let distance=t*total;for(let i=0;i<lengths.length;i++){if(distance<=lengths[i]){const a=route[i],b=route[i+1],f=distance/lengths[i];return {x:a[0]+(b[0]-a[0])*f,y:a[1]+(b[1]-a[1])*f,angle:Math.atan2(b[1]-a[1],b[0]-a[0])};}distance-=lengths[i];}return {x:340,y:230,angle:-Math.PI/2};}
function hit(x:number,y:number,a:number){const dx=Math.cos(a),dy=Math.sin(a);let best=170;for(const [x1,y1,x2,y2] of walls){const sx=x2-x1,sy=y2-y1,den=dx*sy-dy*sx;if(Math.abs(den)<.00001)continue;const qx=x1-x,qy=y1-y;const t=(qx*sy-qy*sx)/den,u=(qx*dy-qy*dx)/den;if(t>=0&&u>=0&&u<=1&&t<best)best=t;}return {x:x+dx*best,y:y+dy*best,wall:best<170};}
export default function SlamDemo(){
 const canvas=useRef<HTMLCanvasElement>(null),stage=useRef<HTMLDivElement>(null),clock=useRef(0),seen=useRef(new Map<string,[number,number]>());
 const [running,setRunning]=useState(true),[revision,setRevision]=useState(0),[phase,setPhase]=useState(0);
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)setRunning(false)},[]);
 useEffect(()=>{let frame=0,last=0,visible=true,lastPhase=-1;const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;last=0});if(stage.current)observer.observe(stage.current);
 const draw=(now:number)=>{frame=requestAnimationFrame(draw);if(!visible){last=0;return;}const dt=last?Math.min((now-last)/1000,.05):0;last=now;if(running)clock.current=Math.min(clock.current+dt,40);const t=clock.current/40;const p=pose(t),currentPhase=t<.34?0:t<.75?1:2;if(currentPhase!==lastPhase){lastPhase=currentPhase;setPhase(currentPhase)}
 const c=canvas.current,ctx=c?.getContext('2d');if(!c||!ctx)return;const ratio=window.devicePixelRatio||1,w=c.clientWidth,h=c.clientHeight;if(c.width!==Math.round(w*ratio)||c.height!==Math.round(h*ratio)){c.width=Math.round(w*ratio);c.height=Math.round(h*ratio)}ctx.setTransform(c.width/640,0,0,c.height/480,0,0);ctx.clearRect(0,0,640,480);
 ctx.strokeStyle='#b7cad01c';ctx.lineWidth=1;for(let x=20;x<640;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,480);ctx.stroke()}for(let y=20;y<480;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(640,y);ctx.stroke()}
 ctx.lineCap='round';ctx.strokeStyle='#60737e40';ctx.lineWidth=5;for(const [a,b,c,d] of walls){ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(c,d);ctx.stroke()}
 // Planned route and already-travelled trajectory are separate visual layers.
 ctx.setLineDash([5,7]);ctx.strokeStyle='#e9b86d6b';ctx.lineWidth=2;ctx.beginPath();route.forEach((v,i)=>i?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.stroke();ctx.setLineDash([]);
 ctx.strokeStyle='#e9b86d';ctx.lineWidth=2.5;ctx.beginPath();for(let i=0;i<=Math.floor(t*400);i++){const q=pose(i/400);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)}ctx.lineTo(p.x,p.y);ctx.stroke();
 for(let i=0;i<64;i++){const a=i*Math.PI*2/64+clock.current*.12,q=hit(p.x,p.y,a);ctx.strokeStyle=i%4===0?'#55d9cf25':'#55d9cf0a';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();if(q.wall){seen.current.set(Math.round(q.x/4)+','+Math.round(q.y/4),[q.x,q.y]);}}
 ctx.fillStyle='#72e7da';for(const [x,y] of seen.current.values())ctx.fillRect(x-1.5,y-1.5,3,3);
 // Particle cloud depicts pose hypotheses, not a path-planning algorithm.
 const spread=9+19*(1-t);for(let i=0;i<48;i++){const a=i*2.39996,r=spread*Math.sqrt((i+.5)/48);const x=p.x+Math.cos(a)*r,y=p.y+Math.sin(a)*r;ctx.fillStyle=i%4===0?'#ffc88caa':'#c7a5ff88';ctx.beginPath();ctx.arc(x,y,1.8,0,Math.PI*2);ctx.fill()}
 ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.scale(1.4,1.4);ctx.shadowBlur=18;ctx.shadowColor='#7ef0df55';ctx.fillStyle='#e7ba55';ctx.beginPath();ctx.roundRect(-14,-12,28,24,6);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#101e2a';ctx.fillRect(-9,-16,15,5);ctx.fillRect(-9,11,15,5);ctx.fillStyle='#e8f2ee';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#243a48';ctx.beginPath();ctx.arc(0,0,5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(18,0);ctx.stroke();ctx.restore();
 ctx.strokeStyle='#e9b86d';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(340,230,10,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#d5e2e7';ctx.font='10px monospace';ctx.fillText('GOAL',323,210);ctx.fillStyle='#8ca9b4';ctx.fillText('START',65,418);
 if(t===1&&running)setRunning(false);
 };frame=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(frame);observer.disconnect()}},[running,revision]);
 return <div className="slam-demo" ref={stage}><div className="slam-toolbar"><span><i/> MBOT / LIVE EXPLAINER</span><span>TOP VIEW · 2D</span></div><canvas ref={canvas} role="img" aria-label="Illustrative MBot navigating a maze: teal LiDAR returns gradually map walls, purple particles represent location estimates, and an amber line shows the planned route."/><div className="slam-legend"><span><i className="scan"/>Mapped walls</span><span><i className="particles"/>Pose particles</span><span><i className="path"/>Planned route</span></div><div className="slam-playback"><span>{['01 / Scan the surroundings','02 / Estimate position','03 / Navigate the map'][phase]}</span><div><button onClick={()=>setRunning(!running)}>{running?'Pause':'Play'}</button><button onClick={()=>{clock.current=0;seen.current.clear();setRevision(v=>v+1);setRunning(true)}}>Replay ↺</button></div></div><p className="slam-disclosure">Illustrative animation · Not a recorded run. Particles show localization hypotheses; the route shows path planning.</p></div>
}
