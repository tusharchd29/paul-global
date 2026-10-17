'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import Logo from './Logo';
import {SITE} from '../site';
import {products,categories,categoryMeta,slugify,productSlug} from '../products/data';

export default function SiteChrome(){
 const [showTop,setShowTop]=useState(false);
 useEffect(()=>{const onScroll=()=>setShowTop(window.scrollY>520);window.addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>window.removeEventListener('scroll',onScroll)},[]);
 return <>
  <footer className="site-footer">
   <div className="container">
    <div className="footer-main">
     <div className="footer-brand"><Link href="/" className="footer-logo" aria-label={SITE.name}><Logo tagline/></Link><p>Customized enzyme, probiotic and yeast solutions for poultry and animal health — built to your specification.</p><a href={`mailto:${SITE.email}`} className="footer-email">{SITE.email}</a><span>{SITE.address.join(' ')}</span></div>
     <div className="footer-column"><h4>Explore</h4><Link href="/">Home</Link><Link href="/products">Products</Link><a href="/#offer">Custom Solutions</a><a href="/#company">Our Company</a><a href="/#contact">Share a Requirement</a></div>
     <div className="footer-column"><h4>Our Formulations</h4>{products.filter(p=>p.category==='Our Formulations').map(p=><Link key={p.name} href={`/products/${productSlug(p)}`}>{p.name}</Link>)}</div>
     <div className="footer-column"><h4>Ingredients</h4>{categories.filter(c=>c!=='Our Formulations').map(c=><Link key={c} href={`/products#${slugify(c)}`}>{categoryMeta[c].label}</Link>)}</div>
         </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span><span>{SITE.tagline}</span><a href="#top">Back to top ↑</a></div>
   </div>
  </footer>
  <button aria-label="Back to top" className={`back-to-top ${showTop?'visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑<span>Top</span></button>
 </>
}
