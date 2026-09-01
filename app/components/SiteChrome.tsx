'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';

export default function SiteChrome(){
 const [showTop,setShowTop]=useState(false);
 useEffect(()=>{const onScroll=()=>setShowTop(window.scrollY>520);window.addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>window.removeEventListener('scroll',onScroll)},[]);
 return <>
  <footer className="site-footer">
   <div className="container">
    <div className="footer-main">
     <div className="footer-brand"><Link href="/" className="footer-logo"><img src="/logo/lockup-white.png" width="176" height="104" alt="Paul Global"/></Link><p>Engineered for performance.<br/>Manufactured in-house. Built for global markets.</p><a href="mailto:exports@paulglobal.com" className="footer-email">exports@paulglobal.com</a><span>Chandigarh, India</span></div>
     <div className="footer-column"><h4>Explore</h4><Link href="/">Home</Link><Link href="/products">Products</Link><a href="/#technical">Technical Capability</a><a href="/#manufacturing">Manufacturing</a><a href="/#markets">Global B2B</a></div>
     <div className="footer-column"><h4>Products</h4><Link href="/products#poultry-nutrition">Poultry</Link><Link href="/products#dairy-cattle">Dairy & Cattle</Link><Link href="/products#aquaculture">Aquaculture</Link><Link href="/products#enzymes">Enzymes</Link><Link href="/products#probiotics-prebiotics">Probiotics & Prebiotics</Link><Link href="/products#feed-additives">Feed Additives</Link></div>
     <div className="footer-column"><h4>For Buyers</h4><a href="/#contact">Request a Quote</a><a href="/#contact">Send a Requirement</a><a href="/#contact">Technical Enquiry</a><a href="/#contact">Distribution Enquiry</a><a href="/#contact">Contact Us</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Paul Global. All rights reserved.</span><span>Animal Nutrition · In-house Manufacturing · Global Export</span><a href="#top">Back to top ↑</a></div>
   </div>
  </footer>
  <button aria-label="Back to top" className={`back-to-top ${showTop?'visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑<span>Top</span></button>
 </>
}
