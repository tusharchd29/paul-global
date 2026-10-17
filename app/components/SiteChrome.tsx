'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import Logo from './Logo';
import {SITE} from '../site';
import {products,categories,categoryMeta,slugify,productSlug} from '../products/data';

const REVEAL='.section-head,.offer-card,.category,.formulation-card,.process-grid>div,.faq-grid details,.tech-step,.directory-card,.product-card,.detail-card,.stats-grid>div,.problem-panel,.finder-panel,.catalogue-intro,.enquiry-form';
const NAV=[['/solutions','Solution Finder'],['/products','Ingredients'],['/#formulations','Our Formulations'],['/#company','Company']];

export default function SiteChrome(){
 const [showTop,setShowTop]=useState(false);
 const pathname=usePathname();
 useEffect(()=>{const onScroll=()=>setShowTop(window.scrollY>520);window.addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>window.removeEventListener('scroll',onScroll)},[]);
 // Scroll-reveal: cards and section headings fade up as they enter the viewport, staggered
 // within their row. Classes are added from here so content stays visible without JS, and
 // removed once played so they don't fight the cards' own hover transforms.
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const els=[...document.querySelectorAll<HTMLElement>(REVEAL)].filter(el=>el.getBoundingClientRect().top>window.innerHeight*.9);
  els.forEach(el=>{const i=el.parentElement?[...el.parentElement.children].indexOf(el):0;el.style.setProperty('--reveal-delay',`${Math.min(i,6)*70}ms`);el.classList.add('reveal')});
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target as HTMLElement;io.unobserve(el);el.classList.add('in');setTimeout(()=>{el.classList.remove('reveal','in');el.style.removeProperty('--reveal-delay')},1300)}),{rootMargin:'0px 0px -8% 0px'});
  els.forEach(el=>io.observe(el));
  return()=>io.disconnect();
 },[pathname]);
 return <>
  <header className={`sticky-bar ${showTop?'visible':''}`} aria-hidden={!showTop}><div className="container"><Link href="/" className="logo" aria-label={SITE.name} tabIndex={showTop?0:-1}><Logo/></Link><nav>{NAV.map(([href,label])=><Link key={href} href={href} tabIndex={showTop?0:-1}>{label}</Link>)}</nav><Link className="btn btn-gold" href="/#contact" tabIndex={showTop?0:-1}>Share Your Requirement ↗</Link></div></header>
  <footer className="site-footer">
   <div className="container">
    <div className="footer-main">
     <div className="footer-brand"><Link href="/" className="footer-logo" aria-label={SITE.name}><Logo tagline/></Link><p>Customized enzyme, probiotic and yeast solutions for poultry and animal health — built to your specification.</p><a href={`mailto:${SITE.email}`} className="footer-email">{SITE.email}</a><span>{SITE.address.join(' ')}</span></div>
     <div className="footer-column"><h4>Explore</h4><Link href="/">Home</Link><Link href="/solutions">Solution Finder</Link><Link href="/products">Ingredients</Link><a href="/#offer">Custom Solutions</a><a href="/#company">Our Company</a><a href="/#contact">Share a Requirement</a></div>
     <div className="footer-column"><h4>Our Formulations</h4>{products.filter(p=>p.category==='Our Formulations').map(p=><Link key={p.name} href={`/products/${productSlug(p)}`}>{p.name}</Link>)}</div>
     <div className="footer-column"><h4>Ingredients</h4>{categories.filter(c=>c!=='Our Formulations').map(c=><Link key={c} href={`/products#${slugify(c)}`}>{categoryMeta[c].label}</Link>)}</div>
         </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span><span>{SITE.tagline}</span><a href="#top">Back to top ↑</a></div>
   </div>
  </footer>
  <button aria-label="Back to top" className={`back-to-top ${showTop?'visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑<span>Top</span></button>
 </>
}
