'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {products,categories,categoryMeta,slugify} from './data';

export default function ProductCatalogue(){
 const [cat,setCat]=useState('All'); const [q,setQ]=useState('');
 const filtered=useMemo(()=>products.filter(p=>(cat==='All'||p.category===cat)&&`${p.name} ${p.type}`.toLowerCase().includes(q.toLowerCase())),[cat,q]);
 const grouped=useMemo(()=>categories.map(c=>({c,items:filtered.filter(p=>p.category===c)})).filter(x=>x.items.length),[filtered]);
 return <div>
  <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) auto',gap:14,margin:'48px 0 24px'}}>
   <input aria-label="Search products" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by product name or type…" style={{padding:'17px 20px',border:'1px solid #d6ddd5',borderRadius:4,background:'#fff',fontSize:15,outline:'none'}}/>
   <select aria-label="Filter category" value={cat} onChange={e=>setCat(e.target.value)} style={{padding:'17px 20px',border:'1px solid #d6ddd5',borderRadius:4,background:'#fff',fontSize:15,minWidth:210}}><option>All</option>{categories.map(c=><option key={c}>{c}</option>)}</select>
  </div>
  <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:45}}>{['All',...categories].map(c=><button key={c} onClick={()=>setCat(c)} style={{border:'1px solid '+(cat===c?'#173d32':'#d6ddd5'),background:cat===c?'#173d32':'transparent',color:cat===c?'#fff':'#173d32',padding:'10px 15px',borderRadius:999,cursor:'pointer',fontSize:12}}>{c==='All'?'All products':categoryMeta[c]?.label}</button>)}</div>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',marginBottom:30}}><div className="eyebrow">Portfolio directory</div><div style={{fontSize:12,color:'#738078'}}>{filtered.length} products / solutions</div></div>
  {cat==='All' && !q ? <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:14,marginBottom:70}}>{categories.map(c=>{const m=categoryMeta[c]; return <button key={c} onClick={()=>setCat(c)} style={{textAlign:'left',background:'#173d32',color:'#fff',padding:28,minHeight:190,border:'0',cursor:'pointer',position:'relative'}}><span style={{fontSize:11,letterSpacing:'.15em',color:'#c9a86a'}}>{m.number}</span><h2 className="serif" style={{fontSize:32,margin:'25px 0 12px'}}>{m.label}</h2><p style={{color:'#cbd8d1',lineHeight:1.6,fontSize:13,margin:0}}>{m.intro}</p><span style={{position:'absolute',right:24,bottom:24,color:'#c9a86a',fontSize:12,fontWeight:700}}>{products.filter(p=>p.category===c).length} products ↗</span></button>})}</div> : null}
  {grouped.map(({c,items})=><section key={c} id={slugify(c)} style={{marginBottom:70}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'end',borderBottom:'1px solid #d6ddd5',paddingBottom:18,marginBottom:18}}><div><div className="eyebrow">{categoryMeta[c]?.number} · Category</div><h2 className="serif" style={{fontSize:42,margin:'8px 0 5px'}}>{categoryMeta[c]?.label||c}</h2><p className="muted" style={{margin:0}}>{categoryMeta[c]?.intro}</p></div><span style={{fontSize:12,color:'#738078'}}>{items.length} items</span></div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:12}}>{items.map((p,i)=><Link href={`/products/${slugify(p.name)}`} key={`${p.category}-${p.name}`}><article className="product-card" style={{background:'#fff',padding:24,border:'1px solid #e0e5df',height:'100%',boxSizing:'border-box'}}><div style={{display:'flex',justifyContent:'space-between',fontSize:10,letterSpacing:'.13em',color:'#8a958e'}}><span>{String(i+1).padStart(2,'0')}</span><span>{p.type}</span></div><h3 className="serif" style={{fontSize:25,margin:'28px 0 9px'}}>{p.name}</h3><p style={{color:'#68746d',fontSize:13,lineHeight:1.6,minHeight:42,marginBottom:20}}>{p.summary}</p><span style={{fontSize:12,fontWeight:700,color:'#173d32'}}>View details ↗</span></article></Link>)}</div>
  </section>)}
  {!filtered.length && <div style={{padding:'70px 20px',textAlign:'center',background:'#fff',border:'1px solid #e0e5df'}}><h2 className="serif">No matching products</h2><p className="muted">Try another product name or reset the category filter.</p><button onClick={()=>{setQ('');setCat('All')}} className="btn btn-gold">Reset catalogue</button></div>}
 </div>
}
