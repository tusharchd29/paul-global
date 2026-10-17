'use client';
import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import {products,categories,categoryMeta,problemGuide,slugify,productSlug} from './data';

export default function ProductCatalogue(){
 const [cat,setCat]=useState(''); const [problem,setProblem]=useState(''); const [q,setQ]=useState('');
 useEffect(()=>{const hash=decodeURIComponent(window.location.hash.replace('#',''));const match=categories.find(c=>slugify(c)===hash);if(match){setCat(match);setTimeout(()=>document.getElementById('product-list')?.scrollIntoView({behavior:'smooth',block:'start'}),100)}},[]);
 const active=Boolean(cat||problem);
 const items=useMemo(()=>{
  if(problem)return products.filter(p=>p.problemTags.includes(problem));
  if(cat)return products.filter(p=>p.category===cat&&`${p.name} ${p.type}`.toLowerCase().includes(q.toLowerCase()));
  return [];
 },[cat,problem,q]);
 const chooseCategory=(c:string)=>{setCat(c);setProblem('');setQ('');history.replaceState(null,'',`#${slugify(c)}`);setTimeout(()=>document.getElementById('product-list')?.scrollIntoView({behavior:'smooth',block:'start'}),30)};
 const chooseProblem=(label:string)=>{setProblem(label);setCat('');setQ('');history.replaceState(null,'',window.location.pathname);setTimeout(()=>document.getElementById('product-list')?.scrollIntoView({behavior:'smooth',block:'start'}),30)};
 const clearFilter=()=>{setCat('');setProblem('');history.replaceState(null,'',window.location.pathname)};
 return <div className="catalogue">
  <div className="catalogue-intro"><div><div className="eyebrow">Browse by category</div><h2 className="serif">Pick an ingredient.<br/>We&rsquo;ll match your spec.</h2></div><p className="muted">Enzymes, probiotic strains and yeast cultures in standard grades — or produced to the activity, CFU count, form and pack you need.</p></div>
  <div className="category-directory">{categories.map(c=>{const m=categoryMeta[c];const count=products.filter(p=>p.category===c).length;return <button key={c} onClick={()=>chooseCategory(c)} className={`directory-card ${cat===c?'active':''}`}><span className="directory-arrow">↗</span><h3 className="serif">{m.label}</h3><p>{m.intro}</p><strong>{count} products</strong></button>})}</div>
  <div className="catalogue-or"><span>not sure what you need? start with the problem</span></div>
  <div className="problem-finder">{problemGuide.map(g=><div className="problem-sector" key={g.sector}><span className="problem-sector-label">{g.sector}</span><div className="problem-chip-row">{g.items.map(it=><button key={it.label} onClick={()=>chooseProblem(it.label)} className={`problem-chip ${problem===it.label?'active':''}`}>{it.label}</button>)}</div></div>)}</div>
  <div className="problem-custom"><p>These link to formulations we have already built. Every farm is different — describe what you&rsquo;re seeing and we&rsquo;ll develop a customized solution with you.</p><a className="btn btn-light" href="/#contact">Describe your problem ↗</a></div>
  {active && <section id="product-list" className="selected-products"><div className="selected-head"><div><div className="eyebrow">{problem?'Your problem':categoryMeta[cat]?.label}</div><h2 className="serif">{problem||categoryMeta[cat]?.label}<span className="slash"> / </span>Products</h2><p className="muted">{problem?'Our own formulations built for this problem — each can also be customized to your programme.':categoryMeta[cat]?.intro}</p></div><button className="text-button" onClick={clearFilter}>← Start over</button></div>
   {cat && <div className="product-tools"><input aria-label="Search selected category" value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${categoryMeta[cat]?.label}…`}/><span>{items.length} products</span></div>}
   <div className="product-grid">{items.map((p,i)=><Link href={`/products/${productSlug(p)}`} key={`${p.category}-${p.name}`} className="product-link"><article className="product-card"><div className="product-meta"><span>{String(i+1).padStart(2,'0')}</span><span>{p.type}</span></div>{p.image?<img className="product-thumb" src={p.image} alt="" loading="lazy"/>:<div className="product-mark">AL</div>}<h3 className="serif">{p.name}</h3><p>{p.summary}</p>{p.grades&&<p className="product-spec">{p.grades[0].spec}</p>}<span className="product-cta">{p.grades?'Specification & grades ↗':'Composition, benefits & dose ↗'}</span></article></Link>)}</div>
   {!items.length&&<div className="empty-state"><h3 className="serif">No matching products</h3><p className="muted">Try another search term.</p></div>}
  </section>}
  {!active&&<div className="catalogue-note"><span className="eyebrow">Your composition?</span><strong className="serif">Bring your own formula, or ask for any activity, strain or form.</strong><Link className="btn btn-gold" href="/#contact">Share your requirement ↗</Link></div>}
 </div>
}
