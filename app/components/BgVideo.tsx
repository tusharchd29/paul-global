'use client';
import {useEffect,useRef,useState} from 'react';

// Muted, looping background video. It stays invisible until the clip actually plays, so a
// missing file, a slow connection or a blocked autoplay leaves the section's own background
// showing. Visitors who prefer reduced motion never get the video.
export default function BgVideo({src,poster,className=''}:{src:string;poster?:string;className?:string}){
 const ref=useRef<HTMLVideoElement>(null);
 const [show,setShow]=useState(false);
 const [off,setOff]=useState(true);
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  setOff(false);
 },[]);
 useEffect(()=>{
  const v=ref.current;
  if(!v)return;
  // Only play while on screen, to save battery and bandwidth.
  const io=new IntersectionObserver(([e])=>{if(e.isIntersecting)v.play().catch(()=>{});else v.pause();});
  io.observe(v);
  return()=>io.disconnect();
 },[off]);
 if(off)return null;
 return <video ref={ref} className={`bg-video${show?' is-playing':''} ${className}`} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onPlaying={()=>setShow(true)} onError={()=>setOff(true)}/>;
}
