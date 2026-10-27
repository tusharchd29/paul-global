'use client';
import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import {products,categories,categoryMeta,slugify,productSlug} from './data';
import {solutions} from '../solutions/data';

export default function ProductCatalogue(){
 const [cat,setCat]=useState(''); const [q,setQ]=useState('');
 useEffect(()=>{const hash=decodeURIComponent(window.location.hash.replace('#',''));const match=categories.find(c=>slugify(c)===hash);if(match){setCat(match);setTimeout(()=>document.getElementById('product-list')?.scrollIntoView({behavior:'smooth',block:'start'}),100)}},[]);
 const searching=!cat&&q.trim().length>1; const active=Boolean(cat)||searching;
 const items=useMemo(()=>{const t=q.toLowerCase().trim();const hit=(p:typeof products[number])=>`${p.name} ${p.type} ${p.summary} ${p.tagline}`.toLowerCase().includes(t);
  if(cat)return products.filter(p=>p.category===cat&&hit(p));
  return searching?products.filter(hit):[];
 },[cat,q,searching]);
 const chooseCategory=(c:string)=>{setCat(c);setQ('');history.replaceState(null,'',`#${slugify(c)}`);setTimeout(()=>document.getElementById('product-list')?.scrollIntoView({behavior:'smooth',block:'start'}),30)};
 const clearFilter=()=>{setCat('');setQ('');history.replaceState(null,'',window.location.pathname)};
 return <div className="catalogue">
  <div className="catalogue-intro"><div><div className="eyebrow">Browse by category</div><h2 className="serif">Pick an ingredient.<br/>We&rsquo;ll match your spec.</h2></div><p className="muted">Enzymes, probiotic strains and yeast cultures in standard grades — or produced to the activity, CFU count, form and pack you need.</p></div>
  <div className="catalogue-search"><input value={cat?'':q} onChange={e=>{setCat('');setQ(e.target.value)}} placeholder="Search all 57 ingredients and formulations — e.g. phytase, Bacillus, egg shell…" aria-label="Search all products"/></div>
  <div className="category-directory">{categories.map(c=>{const m=categoryMeta[c];const count=products.filter(p=>p.category===c).length;return <button key={c} onClick={()=>chooseCategory(c)} className={`directory-card ${cat===c?'active':''}`}><h3 className="serif">{m.label}</h3><p>{m.intro}</p><strong>{count} products</strong></button>})}</div>
  <div className="catalogue-or"><span>POULTRY &amp; FEED PROBLEM FINDER</span></div>
  <div className="problem-finder"><div className="problem-chip-row">{solutions.slice(0,4).map(s=><Link key={s.id} href={`/solutions?p=${s.id}`} className="problem-chip">{s.label}</Link>)}</div></div>
  <div className="problem-custom"><p>For poultry and feed-specific issues, explore these common starting points or open the dedicated finder. For other sectors, choose your industry above.</p><Link className="btn btn-light" href="/solutions">Open Solution Finder</Link></div>
  {active && <section id="product-list" className="selected-products"><div className="selected-head"><div><div className="eyebrow">{searching?'Search':categoryMeta[cat]?.label}</div><h2 className="serif">{searching?`“${q.trim()}”`:categoryMeta[cat]?.label}<span className="slash"> / </span>Products</h2><p className="muted">{searching?`${items.length} matching ingredients and formulations.`:categoryMeta[cat]?.intro}</p></div><button className="text-button" onClick={clearFilter}>← Start over</button></div>
   {cat && <div className="product-tools"><input aria-label="Search selected category" value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${categoryMeta[cat]?.label}…`}/><span>{items.length} products</span></div>}
   <div className="product-grid">{items.map((p,i)=><Link href={`/products/${productSlug(p)}`} key={`${p.category}-${p.name}`} className="product-link"><article className="product-card"><div className="product-meta"><span>{String(i+1).padStart(2,'0')}</span><span>{p.type}</span></div>{p.image?<img className="product-thumb" src={p.image} alt="" loading="lazy"/>:<div className="product-mark">AL</div>}<h3 className="serif">{p.name}</h3><p>{p.summary}</p>{p.grades&&<p className="product-spec">{p.grades[0].spec}</p>}<span className="product-cta">{p.grades?'Specification & grades':'Composition, benefits & dose'}</span></article></Link>)}</div>
   {!items.length&&<div className="empty-state"><h3 className="serif">No matching products</h3><p className="muted">Try another term — or <a href="/#contact">ask us</a>, we supply to your specification.</p></div>}
  </section>}
  {!active&&<div className="catalogue-note"><span className="eyebrow">Your composition?</span><strong className="serif">Bring your own formula, or ask for any activity, strain or form.</strong><Link className="btn btn-gold" href="/#contact">Share your requirement</Link></div>}
 </div>
}
