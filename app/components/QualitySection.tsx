import {SITE} from '../site';

// Documents a buyer's import registration usually asks for. Each is shared on request, per product.
const DOCUMENTS=[
 ['COA','Certificate of Analysis','Activity, CFU count and key parameters for each batch supplied.'],
 ['SDS','Safety Data Sheet','Handling, storage and safety data for each product.'],
 ['TDS','Technical Data Sheet','Composition, specification, recommended dose and application.'],
 ['COO','Certificate of Origin','Issued for each export shipment.'],
];
const CHECKS=[
 ['Specification agreed first','Activity, strain, CFU count, carrier, form and pack are confirmed in writing with you before production.'],
 ['Tested against it','Each batch is checked against the agreed specification before it is packed.'],
 ['Traceable by batch','Every pack carries a batch number that links back to its Certificate of Analysis.'],
 ['Packed to travel','25 kg HDPE drums or bags, sealed and labelled, or packed as agreed for your market.'],
];

export default function QualitySection(){return <section className="section quality-section" id="quality"><div className="container">
 <div className="section-head"><div><div className="eyebrow">Quality</div><h2 className="serif">Quality you can<br/><em>put on paper.</em></h2></div><p className="muted" style={{maxWidth:470}}>Quality assurance and quality control are the heart of our business. Every product is matched to a specification agreed with you, and documented for your records and your import registration.</p></div>
 <div className="process-grid">{CHECKS.map(([t,d],i)=><div key={t}><span className="offer-no">{String(i+1).padStart(2,'0')}</span><h3 className="serif">{t}</h3><p>{d}</p></div>)}</div>
 <div className="doc-grid">{DOCUMENTS.map(([code,name,d])=><div className="doc-card" key={code}><span className="doc-code">{code}</span><h3 className="serif">{name}</h3><p>{d}</p></div>)}</div>
 {SITE.certifications.length>0&&<div className="cert-row"><span className="eyebrow">Certifications</span>{SITE.certifications.map(c=><span className="cert-badge" key={c}>{c}</span>)}</div>}
 <p className="ingredient-note">Need a document for a specific product or registration? <a href={`mailto:${SITE.email}`}>Ask for it at {SITE.email} ↗</a></p>
</div></section>}
