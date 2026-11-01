'use client';
import {useEffect,useRef} from 'react';

// Silent, looping brand film (rendered from video-src/film.html). It plays only while on screen,
// and stays on its poster for visitors who prefer reduced motion. Phones get the lighter 720p file.
export default function EnzymeFilm(){
 const ref=useRef<HTMLVideoElement>(null);
 useEffect(()=>{
  const v=ref.current;if(!v)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){v.removeAttribute('autoplay');v.pause();return}
  const io=new IntersectionObserver(([e])=>{if(e.isIntersecting)v.play().catch(()=>{});else v.pause()},{threshold:.15});
  io.observe(v);return()=>io.disconnect();
 },[]);
 return <section className="film-section" aria-label="AHWAN LAB enzyme science film"><div className="container">
  <div className="film-frame">
   <video ref={ref} muted loop playsInline autoPlay preload="metadata" poster="/video/enzyme-science-poster.jpg" aria-label="Animation: a molecule network folds into an enzyme that splits a substrate, followed by AHWAN LAB quality facts">
    <source src="/video/enzyme-science-720.mp4" type="video/mp4" media="(max-width: 900px)"/>
    <source src="/video/enzyme-science.mp4" type="video/mp4"/>
    <source src="/video/enzyme-science.webm" type="video/webm"/>
   </video>
  </div>
 </div></section>;
}
