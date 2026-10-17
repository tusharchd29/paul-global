'use client';
import {useEffect,useRef,useState} from 'react';

// Counts up to `to` once the number scrolls into view. Server HTML carries the final value,
// so the figure is right without JavaScript and for visitors who prefer reduced motion.
export default function Counter({to,suffix=''}:{to:number;suffix?:string}){
 const ref=useRef<HTMLSpanElement>(null);
 const [value,setValue]=useState(to);
 useEffect(()=>{
  const el=ref.current;
  if(!el||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  setValue(0);
  let frame=0;
  const io=new IntersectionObserver(([entry])=>{
   if(!entry.isIntersecting)return;
   io.disconnect();
   const start=performance.now();
   const tick=(now:number)=>{const t=Math.min(1,(now-start)/1400);setValue(Math.round(to*(1-Math.pow(1-t,3))));if(t<1)frame=requestAnimationFrame(tick)};
   frame=requestAnimationFrame(tick);
  },{threshold:.4});
  io.observe(el);
  return()=>{io.disconnect();cancelAnimationFrame(frame)};
 },[to]);
 return <span ref={ref}>{value.toLocaleString('en-US')}{suffix}</span>;
}
