import Link from 'next/link';
import {MenuButton} from '../components/SiteMenu';
import Logo from '../components/Logo';
import QualitySection from '../components/QualitySection';
import {SITE} from '../site';
import {industries,industrySlug} from '../industries/data';
import {categoryMeta,slugify} from '../products/data';
export const metadata={title:'About Us | AHWAN LAB',description:'AHWAN LAB develops customized enzyme, probiotic and yeast solutions, manufactured at a partner facility in Gujarat, India, for animal feed, food and industry.'};
const pillars=[
 ['Mission','Quality enzymes at affordable prices','Deliver quality enzymes at affordable prices, to global standards.'],
 ['Vision','Leadership in enzyme solutions','Gain leadership positions in poultry, animal-health and industrial enzymes.'],
 ['Approach','Tailor-made for your application','Every product is matched to a specification agreed with you — activity, strain, form and pack.'],
];
const model=[
 ['Your requirement','You share the ingredient, composition or problem, with the application and quantity.'],
 ['Our specification','Our technical team matches activity, strains, carrier and form to your application.'],
 ['Partner manufacturing','Produced at our partner manufacturing facility in Gujarat, India, to the agreed specification.'],
 ['Documented supply','Supplied in your format, with COA, SDS and TDS on request, in India or for export.'],
];
export default function About(){return <main className="products-page">
 <header className="products-header"><div className="container"><div className="products-nav"><Link className="logo" href="/" aria-label={SITE.name}><Logo tagline/></Link><nav className="products-links"><Link href="/">Home</Link><Link href="/industries">Industries</Link><Link href="/products">Ingredients</Link><Link href="/export">Export</Link><a href="/#contact">Contact</a></nav><div className="nav-actions"><Link className="btn btn-gold" href="/#contact">Share Your Requirement</Link><MenuButton/></div></div><div className="products-title"><div className="eyebrow">AHWAN LAB · About us</div><h1 className="serif">A better option for<br/><em>biotechnology products.</em></h1><p>AHWAN LAB develops customized enzyme, probiotic and yeast solutions. The profound knowledge and rich experience of our business associates in enzyme technology have helped us earn a distinguished position in our market segment.</p></div></div></header>

 <section className="section portfolio-tease"><div className="container">
  <div className="section-head"><div><div className="eyebrow">What drives us</div><h2 className="serif">Mission, vision<br/><em>and approach.</em></h2></div></div>
  <div className="offer-grid">{pillars.map(([k,t,d])=><div className="offer-card" key={k}><span className="offer-no">{k}</span><h3 className="serif">{t}</h3><p>{d}</p></div>)}</div>
 </div></section>

 <section className="section technical"><div className="container"><div className="technical-grid">
  <div><div className="eyebrow">How we work</div><h2 className="serif">Our science.<br/><em>Partner manufacturing.</em></h2><p className="lead">We focus on what matters to the buyer — the right specification, technical support and dependable supply. Our products are manufactured at a partner facility in Gujarat, India, to the specification we agree with you.</p><div className="hero-actions"><a className="btn btn-gold" href="/#contact">Share your requirement</a><Link className="btn btn-light" href="/export">Export &amp; distributors</Link></div></div>
  <div className="technical-board"><div className="board-top"><span>AHWAN LAB</span><span>FROM REQUIREMENT TO SUPPLY</span></div><div className="tech-steps">{model.map(([t,d],i)=><div className="tech-step" key={t}><span className="tech-step-label">{String(i+1).padStart(2,'0')}</span><h4 className="serif">{t}</h4><p>{d}</p></div>)}</div></div>
 </div></div></section>

 <section className="section"><div className="container">
  <div className="section-head"><div><div className="eyebrow">What we supply</div><h2 className="serif">Three product<br/><em>families.</em></h2></div><p className="muted" style={{maxWidth:470}}>Supplied on their own to your specification, or blended into a formulation.</p></div>
  <div className="categories catalogue-tease ingredient-tease">{['Enzymes','Probiotics','Yeast'].map(c=><Link className="category" href={`/products#${slugify(c)}`} key={c}><h3 className="serif">{categoryMeta[c].label}</h3><p>{categoryMeta[c].intro}</p><strong>Browse {categoryMeta[c].label.toLowerCase()}</strong></Link>)}</div>
  <div className="enquiry-list" style={{marginTop:40}}><span className="eyebrow">Industries we serve</span><div className="problem-chip-row">{industries.map(i=><Link className="problem-chip" key={i.name} href={`/industries/${industrySlug(i)}`}>{i.name}</Link>)}</div></div>
 </div></section>

 <QualitySection/>
</main>}
