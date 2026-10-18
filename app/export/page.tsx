import Link from 'next/link';
import Logo from '../components/Logo';
import EnquiryForm from '../components/EnquiryForm';
import QualitySection from '../components/QualitySection';
import {SITE} from '../site';
import {products,productSlug} from '../products/data';

export const metadata={title:'Export & Distributors | AHWAN LAB',description:'Import enzymes, probiotics, yeast and ready formulations for poultry and animal feed from AHWAN LAB, India — supplied to your specification, with COA, SDS and TDS. Distributor enquiries welcome.'};

const formulations=products.filter(p=>p.category==='Our Formulations');
const why=[
 ['01','Built to your specification','Activity, CFU count, carrier and form matched to your market, your feed and your registration — not a fixed catalogue grade.'],
 ['02','Documents for registration','COA, SDS and TDS for each product, and Certificate of Origin for each shipment, to support your import registration.'],
 ['03','From trial lot to full lots','Start with samples and a trial quantity, then move to regular commercial lots as your market grows.'],
];
const terms=[
 ['Incoterms','Quoted FOB India or CIF your nearest port, in USD.'],
 ['Packing','25 kg HDPE drums or bags, palletised for export, or packed as agreed — including your own label.'],
 ['Samples','Samples for evaluation and trials, sent by courier before the first order.'],
 ['Quotation','Quantity, lead time and payment terms confirmed with each quotation.'],
];
const offer=['Product range across enzymes, probiotics, yeast and ready formulations','Technical support on dose, application and field trials','Documents for product registration in your country','Private-label packing for your own brand','Territory arrangements discussed with committed partners'];
const lookFor=['An established business in feed additives, premixes or animal health','A sales network reaching feed mills, integrators or farms','Ability to handle import registration in your country','Interest in building the range over the long term'];
const faqs=[
 ['Do you supply buyers outside India?','Yes. We supply importers, distributors and feed manufacturers outside India. Share your country, products and quantity and we will send a quotation.'],
 ['Can you help with product registration in my country?','We provide the product documents usually asked for — COA, SDS, TDS and Certificate of Origin. Tell us what your authority requires and we will confirm what we can supply.'],
 ['Can I get samples before ordering?','Yes. We send samples for evaluation and field trials before the first commercial order.'],
 ['Can you pack under my brand?','Yes. We can supply in your pack size and with your own label, to the specification we agree with you.'],
];

export default function Export(){return <main className="products-page">
 <header className="products-header"><div className="container"><div className="products-nav"><Link className="logo" href="/" aria-label={SITE.name}><Logo tagline/></Link><nav className="products-links"><Link href="/">Home</Link><Link href="/products">Ingredients</Link><a href="#quality">Quality</a><a href="#distributor">Distributors</a><a href="#contact">Contact</a></nav><a className="btn btn-gold" href="#contact">Request a Quotation ↗</a></div><div className="products-title"><div className="eyebrow">AHWAN LAB · Export &amp; distributors</div><h1 className="serif">Supplied from India.<br/><em>Built for your market.</em></h1><p>Enzymes, probiotic strains, yeast cultures and ready formulations for poultry and animal feed — made to your specification, documented for your registration and packed for export.</p><div className="hero-actions"><a className="btn btn-gold" href="#contact">Request a quotation ↗</a><a className="btn btn-light" href="#distributor">Become a distributor</a></div></div></div><div className="hero-orbit" aria-hidden="true"><span>SPECIFICATION</span><span>DOCUMENTS</span><span>EXPORT</span></div></header>

 <section className="section portfolio-tease"><div className="container">
  <div className="section-head"><div><div className="eyebrow">For importers</div><h2 className="serif">Why import<br/><em>from AHWAN LAB.</em></h2></div><p className="muted" style={{maxWidth:470}}>For importers, distributors and feed manufacturers who need a dependable source of feed enzymes, probiotics and yeast.</p></div>
  <div className="offer-grid">{why.map(([n,t,d])=><a className="offer-card" href="#contact" key={n}><span className="offer-no">{n}</span><h3 className="serif">{t}</h3><p>{d}</p><strong>Request a quotation ↗</strong></a>)}</div>
 </div></section>

 <section className="section process-section" id="terms"><div className="container">
  <div className="section-head"><div><div className="eyebrow">Export terms</div><h2 className="serif">How we<br/><em>ship to you.</em></h2></div></div>
  <div className="process-grid">{terms.map(([t,d],i)=><div key={t}><span className="offer-no">{String(i+1).padStart(2,'0')}</span><h3 className="serif">{t}</h3><p>{d}</p></div>)}</div>
 </div></section>

 <QualitySection/>

 <section className="section technical" id="distributor"><div className="container"><div className="technical-grid">
  <div><div className="eyebrow">Become a distributor</div><h2 className="serif">Represent AHWAN LAB<br/><em>in your country.</em></h2><p className="lead">We are looking for distribution partners in poultry and animal-health markets. You bring the market; we bring the product range, the documents and the technical support.</p><ul className="strength-list">{offer.map(s=><li key={s}>{s}</li>)}</ul><div className="hero-actions"><a className="btn btn-gold" href="#contact">Apply to distribute ↗</a><a className="btn btn-light" href={SITE.whatsapp('Hello AHWAN LAB, I am interested in becoming a distributor in:')} target="_blank" rel="noopener">WhatsApp us</a></div></div>
  <div className="technical-board"><div className="board-top"><span>AHWAN LAB</span><span>PARTNERS WE LOOK FOR</span></div><div className="tech-steps">{lookFor.map((s,i)=><div className="tech-step" key={s}><span className="tech-step-label">{String(i+1).padStart(2,'0')}</span><h4 className="serif">{s}</h4></div>)}</div></div>
 </div></div></section>

 <section className="section dark-section"><div className="container">
  <div className="section-head"><div><div className="eyebrow">Ready to distribute</div><h2 className="serif">Our own<br/><em>formulations.</em></h2></div><p className="market-copy">Formulations we have developed and use in the industry ourselves — a ready range to launch in your market, or a base for a blend made to your specification.</p></div>
  <div className="formulation-grid">{formulations.map(p=><Link className="formulation-card" href={`/products/${productSlug(p)}`} key={p.name}>{p.image&&<img src={p.image} alt={`${p.name} drum`} loading="lazy"/>}<div><h3 className="serif">{p.name}</h3><p>{p.tagline}</p></div></Link>)}</div>
 </div></section>

 <section className="section faq-section"><div className="container">
  <div className="section-head"><div><div className="eyebrow">Importer questions</div><h2 className="serif">Before you<br/><em>request a quote.</em></h2></div></div>
  <div className="faq-grid">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
 </div></section>

 <section className="section contact-section" id="contact"><div className="container">
  <div className="contact-heading"><div><div className="eyebrow">Request a quotation</div><h2 className="serif">Tell us your<br/><em>market.</em></h2><p className="muted">Share your country, the products you are interested in, the quantity and the documents your registration needs — or tell us about your distribution business.</p></div>
   <div className="contact-details"><div><span className="eyebrow">Phone / WhatsApp</span><p><a href={SITE.phoneHref}>{SITE.phone}</a> · <a href={SITE.whatsapp('Hello AHWAN LAB, I would like an export quotation for:')} target="_blank" rel="noopener">Chat on WhatsApp ↗</a></p></div><div><span className="eyebrow">Email</span><p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div></div></div>
  <EnquiryForm interest="Import / distributorship"/>
 </div></section>
</main>}
