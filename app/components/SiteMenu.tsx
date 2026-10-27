'use client';
import Link from 'next/link';
import {createContext,useContext,useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {SITE} from '../site';
import {products,productSlug} from '../products/data';
import {industries,industrySlug} from '../industries/data';

// Site-wide menu: a three-line button in every header opens one slide-in panel listing every page.
// The provider wraps the whole body so any header (server or client) can place a MenuButton.
const MenuContext=createContext<{open:boolean;setOpen:(v:boolean)=>void}>({open:false,setOpen:()=>{}});

const PAGES:[string,string][]=[['/','Home'],['/solutions','Solutions by Industry'],['/industries','Industries'],['/products','Products & Ingredients'],['/#formulations','Our Formulations'],['/#offer','Custom Solutions'],['/export','Export & Distributors'],['/#quality','Quality'],['/about','About Us'],['/#contact','Contact']];
const formulations=products.filter(p=>p.category==='Our Formulations');

export function MenuButton({tabIndex}:{tabIndex?:number}){
 const {open,setOpen}=useContext(MenuContext);
 return <button type="button" className="menu-button" tabIndex={tabIndex} aria-label="Open menu" aria-controls="site-menu" aria-expanded={open} onClick={()=>setOpen(true)}><span/><span/><span/></button>;
}

export default function SiteMenu({children}:{children:React.ReactNode}){
 const [open,setOpen]=useState(false);
 const pathname=usePathname();
 const panelRef=useRef<HTMLDivElement>(null);
 const opener=useRef<Element|null>(null);

 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{
  if(!open)return;
  opener.current=document.activeElement;
  document.documentElement.classList.add('menu-open');
  panelRef.current?.querySelector<HTMLElement>('.menu-close')?.focus();
  // Escape closes; Tab stays inside the panel while it is open.
  const onKey=(e:KeyboardEvent)=>{
   if(e.key==='Escape'){setOpen(false);return}
   if(e.key!=='Tab'||!panelRef.current)return;
   const items=[...panelRef.current.querySelectorAll<HTMLElement>('a,button')];
   const first=items[0],last=items[items.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  };
  document.addEventListener('keydown',onKey);
  return()=>{document.removeEventListener('keydown',onKey);document.documentElement.classList.remove('menu-open');(opener.current as HTMLElement|null)?.focus?.()};
 },[open]);

 // Any link click closes the panel, including same-page anchors such as /#contact.
 const close=()=>setOpen(false);
 const isCurrent=(href:string)=>href===pathname||(href!=='/'&&!href.includes('#')&&pathname.startsWith(href));

 return <MenuContext.Provider value={{open,setOpen}}>
  {children}
  <div className={`site-menu ${open?'open':''}`} id="site-menu" aria-hidden={!open} inert={!open}>
   <div className="menu-backdrop" onClick={close}/>
   <div className="menu-panel" role="dialog" aria-modal="true" aria-label="Site menu" ref={panelRef}>
    <div className="menu-top"><span className="eyebrow">Menu</span><button type="button" className="menu-close" aria-label="Close menu" onClick={close}><span/><span/></button></div>
    <nav className="menu-main" aria-label="Main">{PAGES.map(([href,label],i)=><Link key={href} href={href} onClick={close} style={{"--i":i} as React.CSSProperties} aria-current={isCurrent(href)?'page':undefined}>{label}</Link>)}</nav>
    <div className="menu-groups">
     <div><h4>Industries</h4>{industries.map(i=><Link key={i.name} href={`/industries/${industrySlug(i)}`} onClick={close}>{i.name}</Link>)}</div>
     <div><h4>Our formulations</h4>{formulations.map(p=><Link key={p.name} href={`/products/${productSlug(p)}`} onClick={close}>{p.name}</Link>)}<h4 style={{marginTop:24}}>Get in touch</h4><a href={SITE.phoneHref}>{SITE.phone}</a><a href={SITE.whatsapp()} target="_blank" rel="noopener">WhatsApp</a><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
    </div>
    <Link className="btn btn-gold menu-cta" href="/#contact" onClick={close}>Share your requirement</Link>
   </div>
  </div>
 </MenuContext.Provider>;
}
