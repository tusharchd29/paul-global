import ProductCatalogue from './ProductCatalogue';
import {MenuButton} from '../components/SiteMenu';
import Link from 'next/link';
import Logo from '../components/Logo';
import {industries,industrySlug} from '../industries/data';
export const metadata={title:'Products | Industrial Enzymes, Probiotics & Yeast | AHWAN LAB',description:'Explore enzymes, probiotic strains, yeast and formulations by ingredient or application across food, starch, textile, paper, detergents, agriculture, wastewater, biofuel and animal feed.'};
export default function Products(){return <main className="products-page"><header className="products-header"><div className="container"><div className="products-nav"><Link className="logo" href="/" aria-label="AHWAN LAB"><Logo tagline/></Link><nav className="products-links"><Link href="/">Home</Link><Link href="/industries">Industries</Link><Link href="/export">Export</Link><Link href="/about">Company</Link><a href="/#contact">Contact</a></nav><div className="nav-actions"><Link className="btn btn-gold" href="/#contact">Discuss your requirement</Link><MenuButton/></div></div><div className="products-title"><div className="eyebrow">AHWAN LAB · Product discovery</div><h1 className="serif">Find the right<br/><em>ingredient or solution.</em></h1><p>Start with an ingredient, browse by industry, or describe a process challenge. Poultry and animal feed remain part of our range—not the limit of it.</p></div></div></header>
<section className="section"><div className="container">
 <div className="product-discovery-heading"><div><div className="eyebrow">Browse by application</div><h2 className="serif">What industry<br/><em>do you work in?</em></h2></div><p>Choose an industry to see relevant applications, ingredient families and products listed for that use. Product fit and availability are confirmed against the current technical specification.</p></div>
 <div className="product-industry-directory">{industries.map((industry,i)=><Link className="product-industry-link" href={`/industries/${industrySlug(industry)}`} key={industry.name}><span>0{i+1}</span><div><h3 className="serif">{industry.name}</h3><p>{industry.short}</p></div><b aria-hidden="true">↗</b></Link>)}</div>
 <div className="product-discovery-divider"><span>OR BROWSE BY INGREDIENT</span></div>
 <ProductCatalogue/>
</div></section></main>}
