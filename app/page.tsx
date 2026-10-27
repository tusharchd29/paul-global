import EnquiryForm from './components/EnquiryForm';
import {MenuButton} from './components/SiteMenu';
import Logo from './components/Logo';
import QualitySection from './components/QualitySection';
import {SITE} from './site';
import {industries,industrySlug} from './industries/data';
import {products,categoryMeta,slugify,productSlug} from './products/data';

const families=['Enzymes','Probiotics','Yeast'];
const familyDescriptions:Record<string,string>={
  Enzymes:'Industrial enzyme options for defined processing requirements, available subject to current product and specification confirmation.',
  Probiotics:'Microbial cultures for relevant applications, with strain, viable count and format confirmed against the product specification.',
  Yeast:'Yeast-based ingredients for suitable industrial and biological applications, subject to product availability and technical fit.'
};
const featuredIndustries=industries.filter(i=>/food|starch|textile|paper|detergent|wastewater|biofuel|agriculture|pharma|polymer/i.test(i.name)).slice(0,8);
const featuredProducts=products.filter(p=>p.category!=='Our Formulations').slice(0,4);

export default function Home(){return <main className="home-industrial">
<header className="industrial-hero">
  <div className="industrial-hero-image" aria-hidden="true">
    <video className="industrial-bg-video" autoPlay muted loop playsInline preload="metadata" poster="https://images.pexels.com/videos/30183210/pexels-photo-30183210.jpeg?auto=compress&cs=tinysrgb&w=1920">
      <source src="https://videos.pexels.com/video-files/30183210/30183210-hd_1920_1080_25fps.mp4" type="video/mp4"/>
    </video>
  </div>
  <div className="container">
    <nav className="nav industrial-nav">
      <a href="/" className="logo" aria-label={SITE.name}><Logo tagline/></a>
      <div className="navlinks"><a href="/products">Products</a><a href="/industries">Industries</a><a href="#manufacturing">Manufacturing &amp; Quality</a><a href="/export">Export</a><a href="/about">About</a><a href="#contact">Contact</a></div>
      <div className="nav-actions"><a className="btn btn-gold" href="#contact">Discuss your requirement</a><MenuButton/></div>
    </nav>
    <div className="industrial-hero-copy">
      <div className="industrial-kicker"><span></span> AHWAN LAB / INDUSTRIAL BIOTECHNOLOGY</div>
      <h1 className="serif">Enzyme solutions<br/><em>for complex processes.</em></h1>
      <p>Industrial enzymes, microbial cultures and tailored formulations—matched to your application, process and specification.</p>
      <div className="industrial-hero-actions"><a className="btn btn-gold" href="/products">Explore products <span aria-hidden="true">↗</span></a><a className="industrial-secondary" href="/solutions">Find a solution <span aria-hidden="true">→</span></a></div>
      <div className="industrial-hero-note"><span>01 / APPLICATION</span><span>02 / SPECIFICATION</span><span>03 / SUPPLY</span></div>
    </div>
    <div className="industrial-hero-caption"><span>SCIENCE APPLIED TO INDUSTRY</span><span>INDIA · INDUSTRIAL MARKETS</span></div>
  </div>
</header>

<section className="industrial-intro section">
  <div className="container industrial-intro-grid">
    <div><div className="eyebrow">What we supply</div><h2 className="serif">The right ingredient.<br/><em>The right specification.</em></h2></div>
    <div><p className="industrial-lead">We help industrial buyers identify and source enzyme and microbial solutions for defined applications—whether you know the ingredient you need or want to start with a process challenge.</p><a className="industrial-inline-link" href="/products">Explore the product range <span>↗</span></a></div>
  </div>
  <div className="container industrial-family-grid">
    {families.map((family,i)=><a className="industrial-family-card" href={`/products#${slugify(family)}`} key={family}><span className="industrial-card-number">0{i+1}</span><div><h3 className="serif">{categoryMeta[family]?.label||family}</h3><p>{familyDescriptions[family]}</p><strong>Explore range <span>↗</span></strong></div></a>)}
  </div>
</section>

<section className="industrial-applications section" id="industries">
  <div className="container">
    <div className="industrial-section-heading"><div><div className="eyebrow">Solutions by application</div><h2 className="serif">Different industries.<br/><em>Specific requirements.</em></h2></div><p>Explore applications and identify the product families relevant to your process. Final suitability depends on the product grade and agreed technical specification.</p></div>
    <div className="industrial-industry-grid">{featuredIndustries.map((industry,i)=><a href={`/industries/${industrySlug(industry)}`} className="industrial-industry-card" key={industry.name}><span>0{i+1}</span><h3 className="serif">{industry.name}</h3><span className="industrial-arrow">↗</span><p>{industry.short}</p></a>)}</div>
    <div className="industrial-more-link"><a className="industrial-inline-link" href="/industries">View all industries <span>↗</span></a></div>
  </div>
</section>

<section className="industrial-manufacturing section" id="manufacturing">
  <div className="container industrial-manufacturing-grid">
    <div className="industrial-manufacturing-visual" aria-label="Illustrative industrial manufacturing footage from free stock video">
      <video className="industrial-section-video" autoPlay muted loop playsInline preload="none" poster="https://images.pexels.com/videos/31767897/pexels-photo-31767897.jpeg?auto=compress&cs=tinysrgb&w=1200">
        <source src="https://videos.pexels.com/video-files/31767897/31767897-hd_1920_1080_25fps.mp4" type="video/mp4"/>
      </video>
      <div className="industrial-stock-label">ILLUSTRATIVE STOCK FOOTAGE</div>
      <div className="industrial-visual-top"><span>MANUFACTURING PARTNERSHIP</span><span>AHWAN LAB</span></div>
      
      <div className="industrial-visual-bottom"><span>SCIENCE</span><span>PROCESS</span><span>APPLICATION</span></div>
    </div>
    <div className="industrial-manufacturing-copy"><div className="eyebrow">Manufacturing &amp; quality</div><h2 className="serif">Built on a clear<br/><em>specification.</em></h2><p>AHWAN LAB’s portfolio is manufactured through its manufacturing partner, Gujarat Enzyme. Product availability, specifications, documentation and claims are confirmed product by product before supply.</p><p>We aim to make technical information easier to evaluate—from the requested activity or strain to the product form, pack and documentation required for your application.</p><a className="industrial-inline-link" href="/about">Learn about AHWAN LAB <span>↗</span></a><p className="industrial-note">Manufacturing imagery and facility-specific claims will be added only where media rights and the underlying facts are confirmed.</p></div>
  </div>
</section>

<section className="industrial-featured section">
  <div className="container">
    <div className="industrial-section-heading"><div><div className="eyebrow">Product discovery</div><h2 className="serif">Start with the<br/><em>ingredient you need.</em></h2></div><p>Browse selected catalogue entries. Confirm current availability, activity, strain, grade and packaging with our team before ordering.</p></div>
    <div className="industrial-product-grid">{featuredProducts.map((product,i)=><a className="industrial-product-card" href={`/products/${productSlug(product)}`} key={product.name}><div className="industrial-product-image">{product.image?<img src={product.image} alt="" loading="lazy"/>:<span>AHWAN LAB</span>}</div><div className="industrial-product-meta"><span>{product.category}</span><span>0{i+1}</span></div><h3 className="serif">{product.name}</h3><p>{product.tagline}</p><strong>View product <span>↗</span></strong></a>)}</div>
    <div className="industrial-more-link"><a className="industrial-inline-link" href="/products">Browse full catalogue <span>↗</span></a></div>
  </div>
</section>

<section className="industrial-partner-band">
  <div className="container industrial-partner-content"><div><div className="eyebrow">From requirement to supply</div><h2 className="serif">A clear brief makes<br/><em>a better starting point.</em></h2></div><p>Share your industry, application, target specification and estimated quantity. If you do not know which enzyme or culture you need, describe the process challenge and we can review it with you.</p><a className="btn btn-gold" href="#contact">Discuss your requirement <span>↗</span></a></div>
</section>

<QualitySection/>

<section className="section industrial-contact" id="contact"><div className="container"><div className="industrial-contact-heading"><div><div className="eyebrow">Contact AHWAN LAB</div><h2 className="serif">Let's discuss<br/><em>your process.</em></h2><p>Tell us what you are trying to achieve and the specification you need to meet.</p></div><div className="industrial-contact-details"><div><span>Address</span><p>{SITE.address.map(l=><span key={l}>{l}<br/></span>)}</p></div><div><span>Phone / WhatsApp</span><p><a href={SITE.phoneHref}>{SITE.phone}</a> · <a href={SITE.whatsapp()} target="_blank" rel="noopener">WhatsApp</a></p></div><div><span>Email</span><p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div></div></div><EnquiryForm/></div></section>
</main>}
