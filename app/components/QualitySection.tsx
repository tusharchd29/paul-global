import {SITE} from '../site';

// Documents a buyer's import registration usually asks for. Each is shared on request, per product.
const DOCUMENTS=[
 ['COA','Certificate of Analysis','Batch-specific parameters, where available for the supplied product.'],
 ['SDS','Safety Data Sheet','Product handling, storage and safety information, where applicable.'],
 ['TDS','Technical Data Sheet','Available technical specifications and application guidance.'],
 ['COO','Certificate of Origin','Origin documentation, where applicable to the shipment.'],
];
const CHECKS=[
 ['Specification agreed first','Product requirements and the applicable specification are reviewed before supply.'],
 ['Tested against it','Applicable batch testing and release information are confirmed for the product.'],
 ['Traceable by batch','Batch traceability and supporting documentation are confirmed for the supplied product.'],
 ['Packed to travel','Available packaging formats are confirmed against the product and destination requirements.'],
];

export default function QualitySection(){return <section className="section quality-section" id="quality"><div className="container">
 <div className="section-head"><div><div className="eyebrow">Quality</div><h2 className="serif">How we keep<br/><em>quality in check.</em></h2></div><p className="muted" style={{maxWidth:470}}>We review the technical requirements for the selected product and confirm the applicable specification, batch documentation and export paperwork before supply.</p></div>
 <div className="process-grid">{CHECKS.map(([t,d],i)=><div key={t}><span className="offer-no">{String(i+1).padStart(2,'0')}</span><h3 className="serif">{t}</h3><p>{d}</p></div>)}</div>
 <div className="doc-grid">{DOCUMENTS.map(([code,name,d])=><div className="doc-card" key={code}><span className="doc-code">{code}</span><h3 className="serif">{name}</h3><p>{d}</p></div>)}</div>
 {SITE.certifications.length>0&&<div className="cert-row"><span className="eyebrow">Certifications</span>{SITE.certifications.map(c=><span className="cert-badge" key={c}>{c}</span>)}</div>}
 <p className="ingredient-note">Need a document for a specific product or registration? <a href={`mailto:${SITE.email}`}>Ask for it at {SITE.email}</a></p>
</div></section>}
