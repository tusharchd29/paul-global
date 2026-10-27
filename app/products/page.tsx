import Link from 'next/link';
import {MenuButton} from '../components/SiteMenu';
import Logo from '../components/Logo';
import {SITE} from '../site';
import {industries,industrySlug} from '../industries/data';

export const metadata={title:'Products | AHWAN LAB',description:'Explore enzyme, probiotic and yeast-based biotechnology product ranges for industrial and agricultural applications.'};
const ranges=[
 {id:'enzymes',no:'01',title:'Enzymes',desc:'Biological catalysts used to support targeted reactions across food processing, animal feed, agriculture and industrial applications.',uses:['Food & beverage processing','Animal feed','Textile & paper','Starch, biofuel & industrial processing']},
 {id:'probiotics',no:'02',title:'Probiotics',desc:'Selected beneficial microorganisms for appropriate animal nutrition, food and other biotechnology applications. Strain, viable count and format must be confirmed by grade.',uses:['Animal nutrition','Food & fermentation','Agriculture','Application-specific microbial solutions']},
 {id:'myeast',no:'03',title:'Myeast®',desc:'A yeast-based product range for relevant applications. Product form, composition, specification and suitability are confirmed for each intended use.',uses:['Feed applications','Biological processing','Custom application review','Technical product evaluation']}
];
export default function ProductsPage(){return <main className="products-page">
<header className="products-header"><div className="container"><div className="products-nav"><Link className="logo" href="/" aria-label={SITE.name}><Logo tagline/></Link><nav className="products-links"><Link href="/">Home</Link><Link href="/industries">Industries</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav><div className="nav-actions"><Link className="btn btn-gold" href="/contact">Ask about a product</Link><MenuButton/></div></div><div className="products-title"><div className="eyebrow">AHWAN LAB · Product ranges</div><h1 className="serif">Biotechnology<br/><em>for real-world applications.</em></h1><p>Explore our core product families. For exact product names, activity, strain, grade, formulation, packaging and availability, contact us to confirm the current technical specification.</p></div></div></header>
<section className="section"><div className="container">
<div className="product-discovery-heading"><div><div className="eyebrow">Our portfolio</div><h2 className="serif">Three core<br/><em>product families.</em></h2></div><p>Selection begins with the application and operating conditions. We can help identify a suitable range and the technical information required for evaluation.</p></div>
<div className="product-industry-directory">{ranges.map(r=><article className="product-industry-link" id={r.id} key={r.id}><span>{r.no}</span><div><h3 className="serif">{r.title}</h3><p>{r.desc}</p><ul>{r.uses.map(u=><li key={u}>{u}</li>)}</ul><Link href="/contact">Request product information ↗</Link></div><b>↗</b></article>)}</div>
<div className="product-discovery-divider">APPLICATION-LED PRODUCT SELECTION</div>
<div className="industrial-section-heading"><div><div className="eyebrow">Browse by industry</div><h2 className="serif">Start with your<br/><em>process.</em></h2></div><p>Explore relevant application areas, then contact us to discuss a product's fit for your process.</p></div>
<div className="product-industry-directory">{industries.map((i,n)=><Link className="product-industry-link" key={i.name} href={`/industries/${industrySlug(i)}`}><span>{String(n+1).padStart(2,'0')}</span><div><h3 className="serif">{i.name}</h3><p>{i.short}</p></div><b>↗</b></Link>)}</div>
</div></section>
<section className="industrial-partner-band"><div className="container industrial-partner-content"><div><div className="eyebrow">Need help choosing?</div><h2 className="serif">Tell us about<br/><em>your application.</em></h2></div><p>Share the process, target outcome, operating conditions and expected quantity. We'll help you identify the information needed to assess product suitability.</p><Link className="btn btn-gold" href="/contact">Discuss a requirement ↗</Link></div></section>
</main>}
