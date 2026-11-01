'use client';
import {useEffect,useRef} from 'react';

// Full-bleed silent background film behind the hero (rendered from video-src/film.html?bg; phones
// get the ?bg&portrait cut, with the enzyme above the headline instead of beside it).
// It plays muted on loop, pauses while scrolled away, and stays on its poster for reduced motion.
export default function HeroVideo(){
 const ref=useRef<HTMLVideoElement>(null);
 useEffect(()=>{
  const v=ref.current;if(!v)return;
  // Phones get the portrait cut and its own poster (enzyme formed), so a still frame still reads well
  if(window.matchMedia('(max-width: 700px)').matches)v.poster='/video/hero-bg-portrait-poster.jpg';
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){v.removeAttribute('autoplay');v.pause();return}
  const io=new IntersectionObserver(([e])=>{if(e.isIntersecting)v.play().catch(()=>{});else v.pause()});
  io.observe(v);return()=>io.disconnect();
 },[]);
 return <div className="hero-media" aria-hidden="true">
  <video ref={ref} muted loop playsInline autoPlay preload="auto" poster="/video/hero-bg-poster.jpg" tabIndex={-1}>
   <source src="/video/hero-bg-portrait.mp4" type="video/mp4" media="(max-width: 700px)"/>
   <source src="/video/hero-bg-720.mp4" type="video/mp4" media="(max-width: 900px)"/>
   <source src="/video/hero-bg.mp4" type="video/mp4"/>
   <source src="/video/hero-bg.webm" type="video/webm"/>
  </video>
 </div>;
}
