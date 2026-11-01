'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import Link from 'next/link';
import {SITE} from '../site';
import {AREAS,FEED,solutions,matchSolutions,productByName,productHref,solutionIndustry,isFeed,type Area,type Solution} from './data';
import {industries} from '../industries/data';
import {slugify as slug} from '../products/data';

// Industries that have problems in the finder, in the order of the Industries page.
const INDUSTRIES=industries.map(i=>i.name).filter(n=>solutions.some(s=>solutionIndustry(s)===n));
const industryLabel=(n:string)=>n===FEED?'Poultry & feed':n;
const EXAMPLES:Record<string,string[]>={'':['My eggs have thin shells','Cloudy juice after pressing','High ammonia in our effluent','Stains stay after a cold wash'],[FEED]:['My eggs have thin shells','Strong ammonia smell in the shed','Birds are not gaining weight','DCP is making feed too expensive']};

export default function SolutionFinder(){
 const [industry,setIndustry]=useState('');
 const [area,setArea]=useState<Area|''>('');
 const [text,setText]=useState('');
 const [picked,setPicked]=useState<Solution|null>(null);
 const resultRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{const params=new URLSearchParams(window.location.search);const p=solutions.find(s=>s.id===params.get('p'));const q=params.get('q');const i=INDUSTRIES.find(n=>slug(n)===params.get('i'));if(i)setIndustry(i);if(q)setText(q);if(p){setIndustry(solutionIndustry(p));setPicked(p);setTimeout(()=>resultRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),150)}},[]);
 const matched=useMemo(()=>matchSolutions(text),[text]);
 const list=useMemo(()=>{let base=text.trim()?matched:solutions;if(industry)base=base.filter(s=>solutionIndustry(s)===industry);return industry===FEED&&area?base.filter(s=>s.areas.includes(area)):base},[industry,area,text,matched]);
 const pickIndustry=(n:string)=>{setIndustry(n);setArea('');setPicked(null);history.replaceState(null,'',n?`?i=${slug(n)}`:location.pathname)};
 const examples=EXAMPLES[industry]??[];
 const place=(s:Solution)=>isFeed(s)?(area?` (${area})`:''):` (${solutionIndustry(s)})`;
 const choose=(s:Solution)=>{setPicked(s);history.replaceState(null,'',`?p=${s.id}`);setTimeout(()=>resultRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),60)};
 const enquiry=(s:Solution)=>{const names=[...s.primary,...s.also].map(x=>x.name);const pick=names.length?names:s.ingredients.map(x=>x.name);return `/?need=problem&product=${encodeURIComponent(pick.join(', ')||'Custom blend')}&message=${encodeURIComponent(`Problem: ${s.label}${place(s)}\nWhat I'm seeing: ${text||s.symptom}\n\nPlease advise on the right ${isFeed(s)?'product and dose':'enzymes or cultures and dose'}.`)}#contact`};
 return <div className="finder">
  <div className="finder-panel">
   <div className="finder-step"><span className="finder-step-no">1</span><div><strong>Which industry?</strong><div className="finder-chips">{['',...INDUSTRIES].map(n=><button key={n||'all'} className={`finder-chip ${industry===n?'active':''}`} onClick={()=>pickIndustry(n)}>{n?industryLabel(n):'All'}</button>)}</div>{industry===FEED&&<div className="finder-chips">{(['',...AREAS] as const).map(a=><button key={a||'all'} className={`finder-chip ${area===a?'active':''}`} onClick={()=>setArea(a)}>{a||'All birds'}</button>)}</div>}</div></div>
   <div className="finder-step"><span className="finder-step-no">2</span><div className="finder-grow"><strong>Describe what you&rsquo;re seeing</strong><div className="finder-search"><input value={text} onChange={e=>setText(e.target.value)} placeholder={industry&&industry!==FEED?`Describe the problem in your ${industry.toLowerCase()} process…`:'e.g. eggs breaking in the tray, cloudy juice, high ammonia in effluent…'} aria-label="Describe the problem"/>{text&&<button onClick={()=>setText('')} aria-label="Clear">×</button>}</div>{!text&&examples.length>0&&<div className="finder-examples">Try: {examples.map(x=><button key={x} onClick={()=>setText(x)}>{x}</button>)}</div>}</div></div>
   <div className="finder-step"><span className="finder-step-no">3</span><div className="finder-grow"><strong>{text.trim()?(list.length?'Closest matches':'No match yet'):'Or pick the problem'}</strong>
    <div className="finder-grid">{list.map((s,i)=><button key={s.id} style={{animationDelay:`${i*40}ms`}} className={`finder-card ${picked?.id===s.id?'active':''}`} onClick={()=>choose(s)}><span>{isFeed(s)?s.areas.join(' · '):industryLabel(solutionIndustry(s))}</span><h3 className="serif">{s.label}</h3><p>{s.symptom}</p></button>)}</div>
    {text.trim()&&!list.length&&<div className="finder-empty"><p>We couldn&rsquo;t match that to a known problem — every farm and plant is different. Send it to our team and we&rsquo;ll work out a solution with you.</p><a className="btn btn-gold" href={`/?need=problem&message=${encodeURIComponent(`${industry?`Industry: ${industry}\n`:''}What I'm seeing: ${text}`)}#contact`}>Ask our team</a></div>}
   </div></div>
  </div>
  <div ref={resultRef} className="finder-result-anchor">{picked&&<Result key={picked.id} s={picked} enquiryHref={enquiry(picked)} whatsappHref={SITE.whatsapp(`Hello AHWAN LAB, I need help with: ${picked.label}${place(picked)}. ${text}`.trim())}/>}</div>
 </div>
}

function Result({s,enquiryHref,whatsappHref}:{s:Solution;enquiryHref:string;whatsappHref:string}){
 return <section className="finder-result">
  <div className="finder-result-head"><div><div className="eyebrow">Recommended solution</div><h2 className="serif">{s.label}</h2><p>{s.why}</p></div><div className="finder-actions"><a className="btn btn-light" href={whatsappHref} target="_blank" rel="noopener">WhatsApp us</a><a className="btn btn-gold" href={enquiryHref}>Send this to our team</a></div></div>
  {s.caution&&<p className="finder-caution">{s.caution}</p>}
  {s.primary.length>0&&<div className="finder-picks">{s.primary.map(x=><Pick key={x.name} name={x.name} reason={x.reason} label="Use"/>)}</div>}
  {s.also.length>0&&<><h4 className="finder-sub">Also helps</h4><div className="finder-picks small">{s.also.map(x=><Pick key={x.name} name={x.name} reason={x.reason} label="Also consider"/>)}</div></>}
  <Supporting s={s}/>
  <div className="finder-box dark finder-track"><div><div className="eyebrow">What to track</div><ul>{s.track.map(x=><li key={x}>{x}</li>)}</ul></div><p className="finder-box-note">{isFeed(s)?'Dose and inclusion rates should be confirmed with your nutritionist or veterinarian.':'Dose, temperature, pH and contact time are set in a lab or plant trial with our technical team.'}</p></div>
 </section>
}

// Supporting ingredients grouped by catalogue (Enzymes, Probiotics, Yeast) so buyers see the
// enzymes and strains behind each problem next to our own formulation, with their standard spec.
const GROUPS=[['Enzymes','Enzymes'],['Probiotics','Probiotics'],['Yeast','Yeast']] as const;
function Supporting({s}:{s:Solution}){
 const rows=s.ingredients.map(x=>({...x,p:productByName(x.name)})).filter(x=>x.p);
 return <div className="finder-support">
  <div className="finder-support-head"><div><div className="eyebrow">{s.primary.length?'Supporting enzymes, probiotics & yeast':isFeed(s)?'Recommended enzymes & probiotics':'Recommended enzymes & cultures'}</div><h3 className="serif">{s.primary.length?'Use alongside, or build your own blend':isFeed(s)?'Build your custom microbial blend':'Ingredients for this process'}</h3></div><p>Each is supplied on its own at the activity or CFU count you need, or blended to your specification.</p></div>
  {GROUPS.map(([cat,label])=>{const items=rows.filter(x=>x.p!.category===cat);return items.length>0&&<div className="finder-support-group" key={cat}><span className={`finder-badge ${cat.toLowerCase()}`}>{cat==='Probiotics'&&!isFeed(s)?'Microbial cultures':label}</span><div className="finder-support-grid">{items.map(({name,reason,p})=><Link key={name} href={productHref(name)} className="finder-ingredient"><span className="finder-ingredient-type">{p!.type}</span><h4 className="serif">{name}</h4><p>{reason}</p><span className="finder-ingredient-spec">{p!.grades?.[0].spec}<em>{[...new Set(p!.grades?.map(g=>g.form))].join(' · ')}</em></span></Link>)}</div></div>})}
 </div>
}

function Pick({name,reason,label}:{name:string;reason:string;label:string}){
 const p=productByName(name);
 return <Link href={productHref(name)} className="finder-pick">{p?.image&&<img src={p.image} alt="" loading="lazy"/>}<div><span className="finder-pick-label">{label}</span><h3 className="serif">{name}</h3><p>{reason}</p>{p?.dosage[0]&&<p className="finder-dose"><strong>Dose:</strong> {p.dosage[0]}</p>}<span className="product-cta">Full details</span></div></Link>
}
