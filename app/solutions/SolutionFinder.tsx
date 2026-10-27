'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import Link from 'next/link';
import {SITE} from '../site';
import {AREAS,solutions,matchSolutions,productByName,productHref,type Area,type Solution} from './data';
import {industries,industrySlug} from '../industries/data';
import {products,productSlug} from '../products/data';

const examples=['My eggs have thin shells','Strong ammonia smell in the shed','Birds are not gaining weight','DCP is making feed too expensive'];

export default function SolutionFinder(){
 const [area,setArea]=useState<Area|''>('');
 const [text,setText]=useState('');
 const [picked,setPicked]=useState<Solution|null>(null);
 const [industryName,setIndustryName]=useState('');
 const selectedIndustry=industries.find(i=>i.name===industryName);
 const resultRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{const params=new URLSearchParams(window.location.search);const p=solutions.find(s=>s.id===params.get('p'));const q=params.get('q');if(q)setText(q);if(p){setPicked(p);setTimeout(()=>resultRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),150)}},[]);
 const matched=useMemo(()=>matchSolutions(text),[text]);
 const list=useMemo(()=>{const base=text.trim()?matched:solutions;return area?base.filter(s=>s.areas.includes(area)):base},[area,text,matched]);
 const choose=(s:Solution)=>{setPicked(s);history.replaceState(null,'',`?p=${s.id}`);setTimeout(()=>resultRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),60)};
 const enquiry=(s:Solution)=>{const names=[...s.primary,...s.also].map(x=>x.name);return `/?need=problem&product=${encodeURIComponent(names.join(', ')||'Custom blend')}&message=${encodeURIComponent(`Problem: ${s.label}${area?` (${area})`:''}\nWhat I'm seeing: ${text||s.symptom}\n\nPlease advise on the right product and dose.`)}#contact`};
 return <div className="finder">
  <section className="industry-solution-explorer" aria-labelledby="industry-explorer-title">
   <div className="industry-solution-heading"><div><div className="eyebrow">Solutions across industries</div><h2 id="industry-explorer-title" className="serif">Start with your<br/><em>process or industry.</em></h2></div><p>Our detailed problem-matching library currently focuses on poultry and feed. For other industries, choose your sector to explore common enzyme or microbial applications and request a product-specific recommendation.</p></div>
   <div className="industry-solution-options">{industries.map(i=><button type="button" key={i.name} className={`industry-solution-option ${industryName===i.name?'active':''}`} onClick={()=>setIndustryName(industryName===i.name?'':i.name)}><span>{i.name}</span><b aria-hidden="true">↗</b></button>)}</div>
   {selectedIndustry&&<div className="industry-solution-results">
    <div className="industry-solution-results-head"><div><span className="eyebrow">Application guide</span><h3 className="serif">{selectedIndustry.name}</h3><p>{selectedIndustry.intro}</p></div><Link className="btn btn-light" href={`/industries/${industrySlug(selectedIndustry)}`}>Industry details ↗</Link></div>
    <div className="industry-use-grid">{selectedIndustry.uses.map((use,i)=>{const p=products.find(product=>product.name.toLowerCase()===use.name.toLowerCase());return <article className="industry-use-card" key={use.name}><span>APPLICATION {String(i+1).padStart(2,'0')}</span><h4 className="serif">{use.name}</h4><p>{use.role}</p>{p?<Link href={`/products/${productSlug(p)}`}>View ingredient ↗</Link>:<Link href={`/?need=ingredient&product=${encodeURIComponent(use.name)}&message=${encodeURIComponent(`Industry: ${selectedIndustry.name}\nIngredient/application: ${use.name}\nUse: ${use.role}\nPlease confirm availability, specification and suitability.`)}#contact`}>Ask about availability ↗</Link>}</article>})}</div>
    {selectedIndustry.enquiry&&selectedIndustry.enquiry.length>0&&<p className="industry-solution-note">Also worth enquiring about: {selectedIndustry.enquiry.join(', ')}. Availability and grade must be confirmed.</p>}
    <div className="industry-solution-cta"><p>Need help with a different process challenge in {selectedIndustry.name}?</p><Link className="btn btn-gold" href={`/?need=problem&message=${encodeURIComponent(`Industry: ${selectedIndustry.name}\nPlease help identify a suitable enzyme or microbial solution for my process.`)}#contact`}>Describe your requirement</Link></div>
   </div>}
  </section>
  <div className="poultry-finder-divider"><span>OR USE THE DETAILED POULTRY &amp; FEED PROBLEM FINDER</span></div>
  <div className="finder-panel">
   <div className="finder-step"><span className="finder-step-no">1</span><div><strong>Who is it for?</strong><div className="finder-chips">{(['',...AREAS] as const).map(a=><button key={a||'all'} className={`finder-chip ${area===a?'active':''}`} onClick={()=>setArea(a)}>{a||'All'}</button>)}</div></div></div>
   <div className="finder-step"><span className="finder-step-no">2</span><div className="finder-grow"><strong>Describe what you&rsquo;re seeing</strong><div className="finder-search"><input value={text} onChange={e=>setText(e.target.value)} placeholder="e.g. eggs breaking in the tray, birds not gaining weight…" aria-label="Describe the problem"/>{text&&<button onClick={()=>setText('')} aria-label="Clear">×</button>}</div>{!text&&<div className="finder-examples">Try: {examples.map(x=><button key={x} onClick={()=>setText(x)}>{x}</button>)}</div>}</div></div>
   <div className="finder-step"><span className="finder-step-no">3</span><div className="finder-grow"><strong>{text.trim()?(list.length?'Closest matches':'No match yet'):'Or pick the problem'}</strong>
    <div className="finder-grid">{list.map((s,i)=><button key={s.id} style={{animationDelay:`${i*40}ms`}} className={`finder-card ${picked?.id===s.id?'active':''}`} onClick={()=>choose(s)}><span>{s.areas.join(' · ')}</span><h3 className="serif">{s.label}</h3><p>{s.symptom}</p></button>)}</div>
    {text.trim()&&!list.length&&<div className="finder-empty"><p>We couldn&rsquo;t match that to a known problem — every farm is different. Send it to our team and we&rsquo;ll work out a solution with you.</p><a className="btn btn-gold" href={`/?need=problem&message=${encodeURIComponent(`What I'm seeing: ${text}`)}#contact`}>Ask our team</a></div>}
   </div></div>
  </div>
  <div ref={resultRef} className="finder-result-anchor">{picked&&<Result key={picked.id} s={picked} enquiryHref={enquiry(picked)} whatsappHref={SITE.whatsapp(`Hello AHWAN LAB, I need help with: ${picked.label}${area?` (${area})`:''}. ${text}`.trim())}/>}</div>
 </div>
}

function Result({s,enquiryHref,whatsappHref}:{s:Solution;enquiryHref:string;whatsappHref:string}){
 return <section className="finder-result">
  <div className="finder-result-head"><div><div className="eyebrow">Recommended solution</div><h2 className="serif">{s.label}</h2><p>{s.why}</p></div><div className="finder-actions"><a className="btn btn-light" href={whatsappHref} target="_blank" rel="noopener">WhatsApp us</a><a className="btn btn-gold" href={enquiryHref}>Send this to our team</a></div></div>
  {s.caution&&<p className="finder-caution">{s.caution}</p>}
  {s.primary.length>0&&<div className="finder-picks">{s.primary.map(x=><Pick key={x.name} name={x.name} reason={x.reason} label="Use"/>)}</div>}
  {s.also.length>0&&<><h4 className="finder-sub">Also helps</h4><div className="finder-picks small">{s.also.map(x=><Pick key={x.name} name={x.name} reason={x.reason} label="Also consider"/>)}</div></>}
  <Supporting s={s}/>
  <div className="finder-box dark finder-track"><div><div className="eyebrow">What to track</div><ul>{s.track.map(x=><li key={x}>{x}</li>)}</ul></div><p className="finder-box-note">Dose and inclusion rates should be confirmed with your nutritionist or veterinarian.</p></div>
 </section>
}

// Supporting ingredients grouped by catalogue (Enzymes, Probiotics, Yeast) so buyers see the
// enzymes and strains behind each problem next to our own formulation, with their standard spec.
const GROUPS=[['Enzymes','Enzymes'],['Probiotics','Probiotics'],['Yeast','Yeast']] as const;
function Supporting({s}:{s:Solution}){
 const rows=s.ingredients.map(x=>({...x,p:productByName(x.name)})).filter(x=>x.p);
 return <div className="finder-support">
  <div className="finder-support-head"><div><div className="eyebrow">{s.primary.length?'Supporting enzymes, probiotics & yeast':'Recommended enzymes & probiotics'}</div><h3 className="serif">{s.primary.length?'Use alongside, or build your own blend':'Build your custom microbial blend'}</h3></div><p>Each is supplied on its own at the activity or CFU count you need, or blended to your specification.</p></div>
  {GROUPS.map(([cat,label])=>{const items=rows.filter(x=>x.p!.category===cat);return items.length>0&&<div className="finder-support-group" key={cat}><span className={`finder-badge ${cat.toLowerCase()}`}>{label}</span><div className="finder-support-grid">{items.map(({name,reason,p})=><Link key={name} href={productHref(name)} className="finder-ingredient"><span className="finder-ingredient-type">{p!.type}</span><h4 className="serif">{name}</h4><p>{reason}</p><span className="finder-ingredient-spec">{p!.grades?.[0].spec}<em>{[...new Set(p!.grades?.map(g=>g.form))].join(' · ')}</em></span></Link>)}</div></div>})}
 </div>
}

function Pick({name,reason,label}:{name:string;reason:string;label:string}){
 const p=productByName(name);
 return <Link href={productHref(name)} className="finder-pick">{p?.image&&<img src={p.image} alt="" loading="lazy"/>}<div><span className="finder-pick-label">{label}</span><h3 className="serif">{name}</h3><p>{reason}</p>{p?.dosage[0]&&<p className="finder-dose"><strong>Dose:</strong> {p.dosage[0]}</p>}<span className="product-cta">Full details</span></div></Link>
}
