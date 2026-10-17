'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import Link from 'next/link';
import {AREAS,solutions,matchSolutions,productByName,productHref,type Area,type Solution} from './data';

const examples=['My eggs have thin shells','Strong ammonia smell in the shed','Birds are not gaining weight','DCP is making feed too expensive'];

export default function SolutionFinder(){
 const [area,setArea]=useState<Area|''>('');
 const [text,setText]=useState('');
 const [picked,setPicked]=useState<Solution|null>(null);
 const resultRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{const params=new URLSearchParams(window.location.search);const p=solutions.find(s=>s.id===params.get('p'));const q=params.get('q');if(q)setText(q);if(p){setPicked(p);setTimeout(()=>resultRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),150)}},[]);
 const matched=useMemo(()=>matchSolutions(text),[text]);
 const list=useMemo(()=>{const base=text.trim()?matched:solutions;return area?base.filter(s=>s.areas.includes(area)):base},[area,text,matched]);
 const choose=(s:Solution)=>{setPicked(s);history.replaceState(null,'',`?p=${s.id}`);setTimeout(()=>resultRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),60)};
 const enquiry=(s:Solution)=>{const names=[...s.primary,...s.also].map(x=>x.name);return `/?need=problem&product=${encodeURIComponent(names.join(', ')||'Custom blend')}&message=${encodeURIComponent(`Problem: ${s.label}${area?` (${area})`:''}\nWhat I'm seeing: ${text||s.symptom}\n\nPlease advise on the right product and dose.`)}#contact`};
 return <div className="finder">
  <div className="finder-panel">
   <div className="finder-step"><span className="finder-step-no">1</span><div><strong>Who is it for?</strong><div className="finder-chips">{(['',...AREAS] as const).map(a=><button key={a||'all'} className={`finder-chip ${area===a?'active':''}`} onClick={()=>setArea(a)}>{a||'All'}</button>)}</div></div></div>
   <div className="finder-step"><span className="finder-step-no">2</span><div className="finder-grow"><strong>Describe what you&rsquo;re seeing</strong><div className="finder-search"><input value={text} onChange={e=>setText(e.target.value)} placeholder="e.g. eggs breaking in the tray, birds not gaining weight…" aria-label="Describe the problem"/>{text&&<button onClick={()=>setText('')} aria-label="Clear">×</button>}</div>{!text&&<div className="finder-examples">Try: {examples.map(x=><button key={x} onClick={()=>setText(x)}>{x}</button>)}</div>}</div></div>
   <div className="finder-step"><span className="finder-step-no">3</span><div className="finder-grow"><strong>{text.trim()?(list.length?'Closest matches':'No match yet'):'Or pick the problem'}</strong>
    <div className="finder-grid">{list.map((s,i)=><button key={s.id} style={{animationDelay:`${i*40}ms`}} className={`finder-card ${picked?.id===s.id?'active':''}`} onClick={()=>choose(s)}><span>{s.areas.join(' · ')}</span><h3 className="serif">{s.label}</h3><p>{s.symptom}</p></button>)}</div>
    {text.trim()&&!list.length&&<div className="finder-empty"><p>We couldn&rsquo;t match that to a known problem — every farm is different. Send it to our team and we&rsquo;ll work out a solution with you.</p><a className="btn btn-gold" href={`/?need=problem&message=${encodeURIComponent(`What I'm seeing: ${text}`)}#contact`}>Ask our team ↗</a></div>}
   </div></div>
  </div>
  <div ref={resultRef} className="finder-result-anchor">{picked&&<Result key={picked.id} s={picked} enquiryHref={enquiry(picked)}/>}</div>
 </div>
}

function Result({s,enquiryHref}:{s:Solution;enquiryHref:string}){
 return <section className="finder-result">
  <div className="finder-result-head"><div><div className="eyebrow">Recommended solution</div><h2 className="serif">{s.label}</h2><p>{s.why}</p></div><a className="btn btn-gold" href={enquiryHref}>Send this to our team ↗</a></div>
  {s.caution&&<p className="finder-caution">{s.caution}</p>}
  {s.primary.length>0&&<div className="finder-picks">{s.primary.map(x=><Pick key={x.name} name={x.name} reason={x.reason} label="Use"/>)}</div>}
  {s.also.length>0&&<><h4 className="finder-sub">Also helps</h4><div className="finder-picks small">{s.also.map(x=><Pick key={x.name} name={x.name} reason={x.reason} label="Also consider"/>)}</div></>}
  <div className="finder-split">
   <div className="finder-box"><div className="eyebrow">{s.primary.length?'Build a custom blend from':'Custom microbial blend from'}</div>{s.ingredients.length?<ul>{s.ingredients.map(x=><li key={x.name}><Link href={productHref(x.name)}>{x.name}</Link><span>{x.reason}</span></li>)}</ul>:<p>Ask us about a custom herbal or nutritional blend for this problem.</p>}<p className="finder-box-note">Any of these can be supplied on their own, or blended to your specification.</p></div>
   <div className="finder-box dark"><div className="eyebrow">What to track</div><ul>{s.track.map(x=><li key={x}>{x}</li>)}</ul><p className="finder-box-note">Dose and inclusion rates should be confirmed with your nutritionist or veterinarian.</p></div>
  </div>
 </section>
}

function Pick({name,reason,label}:{name:string;reason:string;label:string}){
 const p=productByName(name);
 return <Link href={productHref(name)} className="finder-pick">{p?.image&&<img src={p.image} alt="" loading="lazy"/>}<div><span className="finder-pick-label">{label}</span><h3 className="serif">{name}</h3><p>{reason}</p>{p?.dosage[0]&&<p className="finder-dose"><strong>Dose:</strong> {p.dosage[0]}</p>}<span className="product-cta">Full details ↗</span></div></Link>
}
