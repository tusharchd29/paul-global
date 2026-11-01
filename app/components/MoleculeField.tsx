'use client';
import {useEffect,useRef} from 'react';

// Animated "enzyme network" behind the hero: drifting nodes linked by thin bonds, a few larger
// glowing "active sites", a gentle pull toward the pointer, and parallax on scroll. Pure canvas,
// no libraries. It pauses when off screen or in a background tab, and draws a single still frame
// for visitors who prefer reduced motion.
type Node={x:number;y:number;vx:number;vy:number;r:number;hub:boolean;phase:number};

export default function MoleculeField(){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=ref.current;if(!canvas)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w=0,h=0,dpr=1,nodes:Node[]=[],frame=0,visible=true,scrollY=0;
  const pointer={x:-9999,y:-9999,active:false};
  const LINK=130;

  const seed=()=>{
   const count=Math.round(Math.min(110,Math.max(36,(w*h)/14000)));
   nodes=Array.from({length:count},(_,i)=>({
    x:Math.random()*w,y:Math.random()*h,
    vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,
    r:i%11===0?3.4:1.1+Math.random()*1.3,hub:i%11===0,phase:Math.random()*Math.PI*2,
   }));
  };
  const resize=()=>{
   const rect=canvas.getBoundingClientRect();
   dpr=Math.min(window.devicePixelRatio||1,2);w=rect.width;h=rect.height;
   canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
   ctx.setTransform(dpr,0,0,dpr,0,0);seed();
  };

  const draw=(t:number)=>{
   ctx.clearRect(0,0,w,h);
   const shift=scrollY*.25;
   for(const n of nodes){
    if(!reduce){
     n.x+=n.vx;n.y+=n.vy;
     if(pointer.active){const dx=pointer.x-n.x,dy=pointer.y+shift-n.y,d=Math.hypot(dx,dy);if(d<200&&d>1){n.x+=dx/d*.35;n.y+=dy/d*.35}}
     if(n.x<-20)n.x=w+20;else if(n.x>w+20)n.x=-20;
     if(n.y<-20)n.y=h+20;else if(n.y>h+20)n.y=-20;
    }
   }
   // bonds
   for(let i=0;i<nodes.length;i++){
    const a=nodes[i];
    for(let j=i+1;j<nodes.length;j++){
     const b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=dx*dx+dy*dy;
     if(d<LINK*LINK){const o=(1-Math.sqrt(d)/LINK)*.42;ctx.strokeStyle=`rgba(120,190,255,${o})`;ctx.lineWidth=a.hub||b.hub?1:.6;ctx.beginPath();ctx.moveTo(a.x,a.y-shift);ctx.lineTo(b.x,b.y-shift);ctx.stroke()}
    }
   }
   // atoms
   for(const n of nodes){
    const y=n.y-shift;
    if(n.hub){
     const pulse=reduce?1:1+Math.sin(t/900+n.phase)*.35;
     const g=ctx.createRadialGradient(n.x,y,0,n.x,y,22*pulse);
     g.addColorStop(0,'rgba(94,234,212,.55)');g.addColorStop(1,'rgba(94,234,212,0)');
     ctx.fillStyle=g;ctx.beginPath();ctx.arc(n.x,y,22*pulse,0,Math.PI*2);ctx.fill();
     ctx.fillStyle='#8ff5e3';
    }else ctx.fillStyle='rgba(190,215,255,.85)';
    ctx.beginPath();ctx.arc(n.x,y,n.r,0,Math.PI*2);ctx.fill();
   }
  };

  const loop=(t:number)=>{draw(t);if(visible&&!document.hidden)frame=requestAnimationFrame(loop);else frame=0};
  const start=()=>{if(!frame&&!reduce)frame=requestAnimationFrame(loop)};

  resize();
  if(reduce)draw(0);else start();

  const ro=new ResizeObserver(()=>{resize();if(reduce)draw(0)});ro.observe(canvas);
  const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)start()});io.observe(canvas);
  const onMove=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=pointer.y>0&&pointer.y<r.height};
  const onLeave=()=>{pointer.active=false};
  const onScroll=()=>{scrollY=window.scrollY};
  const onVis=()=>{if(!document.hidden)start()};
  window.addEventListener('pointermove',onMove,{passive:true});
  document.addEventListener('pointerleave',onLeave);
  window.addEventListener('scroll',onScroll,{passive:true});
  document.addEventListener('visibilitychange',onVis);
  return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();window.removeEventListener('pointermove',onMove);document.removeEventListener('pointerleave',onLeave);window.removeEventListener('scroll',onScroll);document.removeEventListener('visibilitychange',onVis)};
 },[]);
 return <canvas ref={ref} className="molecule-field" aria-hidden="true"/>;
}
