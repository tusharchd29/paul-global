'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import Logo from './Logo';
import {SITE} from '../site';
import {products,categories,categoryMeta,slugify,productSlug} from '../products/data';

const REVEAL='.section-head,.offer-card,.category,.formulation-card,.process-grid>div,.doc-card,.faq-grid details,.tech-step,.directory-card,.product-card,.detail-card,.stats-grid>div,.problem-panel,.finder-panel,.catalogue-intro,.enquiry-form';
const NAV=[['/solutions','Solution Finder'],['/products','Ingredients'],['/#formulations','Our Formulations'],['/export','Export'],['/#company','Company']];

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
     <div className="footer-brand"><Link href="/" className="footer-logo" aria-label={SITE.name}><Logo tagline/></Link><p>Customized enzyme, probiotic and yeast solutions for poultry and animal health — built to your specification.</p><a href={`mailto:${SITE.email}`} className="footer-email">{SITE.email}</a><a href={SITE.phoneHref} className="footer-email">{SITE.phone}</a><span>{SITE.address.join(' ')}</span></div>
     <div className="footer-column"><h4>Explore</h4><Link href="/">Home</Link><Link href="/solutions">Solution Finder</Link><Link href="/products">Ingredients</Link><a href="/#offer">Custom Solutions</a><Link href="/export">Export &amp; Distributors</Link><a href="/#quality">Quality</a><a href="/#company">Our Company</a><a href="/#contact">Share a Requirement</a></div>
     <div className="footer-column"><h4>Our Formulations</h4>{products.filter(p=>p.category==='Our Formulations').map(p=><Link key={p.name} href={`/products/${productSlug(p)}`}>{p.name}</Link>)}</div>
     <div className="footer-column"><h4>Ingredients</h4>{categories.filter(c=>c!=='Our Formulations').map(c=><Link key={c} href={`/products#${slugify(c)}`}>{categoryMeta[c].label}</Link>)}</div>
         </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span><span>{SITE.tagline}</span><a href="#top">Back to top ↑</a></div>
   </div>
  </footer>
  <a className="whatsapp-fab" href={SITE.whatsapp()} target="_blank" rel="noopener" aria-label="Chat with AHWAN LAB on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3.2 29l7.3-1.9c1.8 1 3.9 1.5 5.9 1.5 7 0 12.7-5.7 12.7-12.6S23 3 16 3Zm0 23.1c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.3 1.1 1.2-4.2-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.2 9.9 10 5.2 16 5.2s10.8 4.7 10.8 10.4S21.9 26.1 16 26.1Zm5.9-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg><span>WhatsApp</span></a>
  <button aria-label="Back to top" className={`back-to-top ${showTop?'visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑<span>Top</span></button>
 </>
}
