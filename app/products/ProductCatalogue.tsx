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
  <div className="catalogue-intro"><div><div className="eyebrow">Start with your problem</div><h2 className="serif">Tell us what&rsquo;s going wrong.<br/>We&rsquo;ll point you to the fix.</h2></div><p className="muted">Feed cost, gut health, ammonia, mineral gaps — pick the problem closest to what you&rsquo;re seeing, and we&rsquo;ll show the products built to solve it.</p></div>
  <div className="problem-finder">{problemGuide.map(g=><div className="problem-sector" key={g.sector}><span className="problem-sector-label">{g.sector}</span><div className="problem-chip-row">{g.items.map(it=><button key={it.label} onClick={()=>chooseProblem(it.label)} className={`problem-chip ${problem===it.label?'active':''}`}>{it.label}</button>)}</div></div>)}</div>
  <div className="problem-custom"><p>Not seeing your exact problem? Every farm is different — describe what you\u2019re seeing and our technical team will work through the diagnosis with you.</p><a className="btn btn-light" href="/#contact">Describe your problem ↗</a></div>
  <div className="catalogue-or"><span>or browse by product category</span></div>
  <div className="category-directory">{categories.map(c=>{const m=categoryMeta[c];const count=products.filter(p=>p.category===c).length;return <button key={c} onClick={()=>chooseCategory(c)} className={`directory-card ${cat===c?'active':''}`}><span className="directory-arrow">↗</span><h3 className="serif">{m.label}</h3><p>{m.intro}</p><strong>{count} products</strong></button>})}</div>
  {active && <section id="product-list" className="selected-products"><div className="selected-head"><div><div className="eyebrow">{problem?'Your problem':categoryMeta[cat]?.label}</div><h2 className="serif">{problem||categoryMeta[cat]?.label}<span className="slash"> / </span>Products</h2><p className="muted">{problem?'Products the catalogue identifies as a fit for this problem, across all relevant sectors.':categoryMeta[cat]?.intro}</p></div><button className="text-button" onClick={clearFilter}>← Start over</button></div>
   {cat && <div className="product-tools"><input aria-label="Search selected category" value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${categoryMeta[cat]?.label} products…`}/><span>{items.length} products</span></div>}
   <div className="product-grid">{items.map((p,i)=><Link href={`/products/${productSlug(p)}`} key={`${p.category}-${p.name}`} className="product-link"><article className="product-card"><div className="product-meta"><span>{String(i+1).padStart(2,'0')}</span><span>{p.type}</span></div><div className="product-mark">PG</div><h3 className="serif">{p.name}</h3><p>{p.summary}</p><span className="product-cta">Technical / commercial details ↗</span></article></Link>)}</div>
   {!items.length&&<div className="empty-state"><h3 className="serif">No matching products</h3><p className="muted">Try another search term.</p></div>}
  </section>}
  {!active&&<div className="catalogue-note"><span className="eyebrow">Need technical information?</span><strong className="serif">Our technical team can help identify the right solution.</strong><Link className="btn btn-gold" href="/#technical">Explore technical capability ↗</Link></div>}
 </div>
}
