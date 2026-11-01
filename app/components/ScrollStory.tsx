'use client';
import {useEffect,useRef,useState} from 'react';

// "Three ways to work with us" as a pinned scroll story. On wide screens the panel holds still while
// the visitor scrolls, the enzyme ring fills arc by arc and each way to work takes its turn.
// Without JavaScript, on phones and for reduced motion it is a plain stacked list of the same cards.
export type Step=[no:string,title:string,text:string,cta:string];

export default function ScrollStory({steps}:{steps:Step[]}){
 const ref=useRef<HTMLElement>(null);
 const [on,setOn]=useState(false);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const el=ref.current;if(!el)return;
  const mq=window.matchMedia('(min-width: 961px) and (prefers-reduced-motion: no-preference)');
  let frame=0;
  const update=()=>{
   frame=0;
   const r=el.getBoundingClientRect(),run=r.height-window.innerHeight;
   const p=Math.min(1,Math.max(0,-r.top/Math.max(run,1)));
   el.style.setProperty('--p',p.toFixed(4));
   setActive(Math.min(steps.length-1,Math.floor(p*steps.length*.999)));
  };
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
  const apply=()=>{
   setOn(mq.matches);
   window.removeEventListener('scroll',onScroll);
   if(mq.matches){window.addEventListener('scroll',onScroll,{passive:true});update()}
  };
  apply();mq.addEventListener('change',apply);
  return()=>{mq.removeEventListener('change',apply);window.removeEventListener('scroll',onScroll);cancelAnimationFrame(frame)};
 },[steps.length]);

 const C=2*Math.PI*120,seg=C/steps.length;
 return <section ref={ref} id="offer" className={`story ${on?'story-on':''}`} style={{['--steps' as string]:steps.length}}>
  <div className="story-sticky"><div className="container story-grid">
   <div className="story-copy">
    <div className="eyebrow">Customized solutions</div>
    <h2 className="serif">Three ways<br/><em>to work with us.</em></h2>
    <p className="muted">Whatever you start with — an ingredient, a formula or a field problem — the outcome is a product built to your specification.</p>
    <div className="story-progress" aria-hidden="true"><span/></div>
    <ol className="story-steps">{steps.map(([n,t,d,cta],i)=><li key={n} className={on&&i===active?'is-active':on&&i<active?'is-done':''}>
     <a href="#contact" className="story-step"><span className="offer-no">{n}</span><div><h3 className="serif">{t}</h3><p>{d}</p><strong>{cta} →</strong></div></a>
    </li>)}</ol>
   </div>
   <div className="story-visual" aria-hidden="true">
    <svg viewBox="0 0 300 300">
     <defs><linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5eead4"/><stop offset="1" stopColor="#6f9be8"/></linearGradient></defs>
     <circle cx="150" cy="150" r="120" className="ring-track"/>
     {steps.map((_,i)=><circle key={i} cx="150" cy="150" r="120" className={`ring-arc ${on&&i<=active?'lit':''}`} strokeDasharray={`${seg-10} ${C}`} strokeDashoffset={-i*seg} transform="rotate(-90 150 150)"/>)}
     <g className="ring-orbit"><circle cx="150" cy="30" r="6"/><circle cx="270" cy="150" r="4"/><circle cx="66" cy="235" r="5"/></g>
    </svg>
    <div className="story-core"><span className="story-num">{steps[on?active:0][0]}</span><span className="story-label">{['Ingredient','Composition','Problem'][on?active:0]}</span></div>
   </div>
  </div></div>
 </section>;
}
