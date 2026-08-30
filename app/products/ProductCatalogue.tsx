'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {products,categories,categoryMeta,slugify,productSlug} from './data';

export default function ProductCatalogue(){
 const [cat,setCat]=useState(''); const [q,setQ]=useState('');
 const items=useMemo(()=>cat?products.filter(p=>p.category===cat&&`${p.name} ${p.type}`.toLowerCase().includes(q.toLowerCase())):[],[cat,q]);
 const choose=(c:string)=>{setCat(c);setQ('');setTimeout(()=>document.getElementById('product-list')?.scrollIntoView({behavior:'smooth',block:'start'}),30)};
 return <div className="catalogue">
  <div className="catalogue-intro"><div><div className="eyebrow">01 · Choose a category</div><h2 className="serif">Start with the<br/>application.</h2></div><p className="muted">Select a category first. We will then show only the products belonging to that portfolio, keeping the catalogue clean and easy to navigate.</p></div>
  <div className="category-directory">{categories.map(c=>{const m=categoryMeta[c];const count=products.filter(p=>p.category===c).length;return <button key={c} onClick={()=>choose(c)} className={`directory-card ${cat===c?'active':''}`}><span className="directory-no">{m.number}</span><span className="directory-arrow">↗</span><h3 className="serif">{m.label}</h3><p>{m.intro}</p><strong>{count} products</strong></button>})}</div>
  {cat && <section id="product-list" className="selected-products"><div className="selected-head"><div><div className="eyebrow">02 · {categoryMeta[cat]?.label}</div><h2 className="serif">{categoryMeta[cat]?.label}<span className="slash"> / </span>Products</h2><p className="muted">{categoryMeta[cat]?.intro}</p></div><button className="text-button" onClick={()=>setCat('')}>← All categories</button></div>
   <div className="product-tools"><input aria-label="Search selected category" value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${categoryMeta[cat]?.label} products…`}/><span>{items.length} products</span></div>
   <div className="product-grid">{items.map((p,i)=><Link href={`/products/${productSlug(p)}`} key={`${p.category}-${p.name}`} className="product-link"><article className="product-card"><div className="product-meta"><span>{String(i+1).padStart(2,'0')}</span><span>{p.type}</span></div><div className="product-mark">PG</div><h3 className="serif">{p.name}</h3><p>{p.summary}</p><span className="product-cta">Technical / commercial details ↗</span></article></Link>)}</div>
   {!items.length&&<div className="empty-state"><h3 className="serif">No matching products</h3><p className="muted">Try another search term.</p></div>}
  </section>}
  {!cat&&<div className="catalogue-note"><span className="eyebrow">03 · Need technical information?</span><strong className="serif">Our technical team can help identify the right solution.</strong><Link className="btn btn-gold" href="/#technical">Explore technical capability ↗</Link></div>}
 </div>
}
