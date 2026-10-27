import {MenuButton} from './components/SiteMenu';
import Logo from './components/Logo';
import QualitySection from './components/QualitySection';
import {SITE} from './site';
import {industries,industrySlug} from './industries/data';

const families=[
 {name:'Enzymes',num:'01',desc:'Biocatalysts for food, feed and industrial processes—selected to suit the application and operating conditions.',href:'/products#enzymes'},
 {name:'Probiotics',num:'02',desc:'Purpose-selected microbial strains for animal nutrition, food and other suitable applications.',href:'/products#probiotics'},
 {name:'Myeast®',num:'03',desc:'Yeast-based solutions for relevant feed and industrial applications, with product specifications confirmed before supply.',href:'/products#myeast'}
];
const featuredIndustries=industries.filter(i=>/animal feed|human health|food|starch|textile|paper|detergent|wastewater|biofuel|agriculture|pharma|polymer|soil/i.test(i.name)).slice(0,9);

export default function Home(){return <main className="home-industrial">
<header className="industrial-hero">
  <div className="industrial-hero-image" aria-hidden="true">
    <video className="industrial-bg-video" autoPlay muted loop playsInline preload="metadata" poster="https://images.pexels.com/videos/32386621/pexels-photo-32386621.jpeg?auto=compress&cs=tinysrgb&w=1920">
      <source src="https://videos.pexels.com/video-files/32386621/32386621-hd_1920_1080_25fps.mp4" type="video/mp4"/>
    </video>
  </div>
  <div className="container">
    <nav className="nav industrial-nav">
      <a href="/" className="logo" aria-label={SITE.name}><Logo tagline/></a>
      <div className="navlinks"><a href="/products">Products</a><a href="/industries">Industries</a><a href="/about#manufacturing">Manufacturing</a><a href="/about#research">R&amp;D &amp; Quality</a><a href="/about">About</a><a href="/contact">Contact</a></div>
      <div className="nav-actions"><a className="btn btn-gold" href="/contact">Discuss your application</a><MenuButton/></div>
    </nav>
    <div className="industrial-hero-copy">
      <div className="industrial-kicker"><span></span> AHWAN LAB / ENZYME &amp; BIOTECHNOLOGY SOLUTIONS</div>
      <h1 className="serif">Biotechnology for<br/><em>better-performing processes.</em></h1>
      <p>Enzymes, probiotic strains and yeast-based solutions for food, feed, agriculture and industrial applications—supported by application-led product selection and manufacturing expertise.</p>
      <div className="industrial-hero-actions"><a className="btn btn-gold" href="/products">Explore product ranges <span aria-hidden="true">↗</span></a><a className="industrial-secondary" href="/industries">Explore applications <span aria-hidden="true">→</span></a></div>
      <div className="industrial-hero-note"><span>01 / ENZYMES</span><span>02 / PROBIOTICS</span><span>03 / YEAST</span></div>
    </div>
    <div className="industrial-hero-caption"><span>RESEARCH-LED BIOTECHNOLOGY</span><span>AHMEDABAD, GUJARAT · INDIA</span></div>
  </div>
</header>

<section className="industrial-intro section">
  <div className="container industrial-intro-grid">
    <div><div className="eyebrow">About AHWAN LAB</div><h2 className="serif">Biological science.<br/><em>Practical applications.</em></h2></div>
    <div><p className="industrial-lead">We bring enzyme technology and microbial solutions closer to the needs of manufacturers. From selecting a product range to discussing an application-specific requirement, our focus is on fit-for-purpose solutions and clear technical specifications.</p><a className="industrial-inline-link" href="/about">Learn about our approach <span>↗</span></a></div>
  </div>
  <div className="container industrial-family-grid">
    {families.map(f=><a className="industrial-family-card" href={f.href} key={f.name}><span className="industrial-card-number">{f.num}</span><div><h3 className="serif">{f.name}</h3><p>{f.desc}</p><strong>Explore range <span>↗</span></strong></div></a>)}
  </div>
</section>

<section className="industrial-applications section" id="industries">
  <div className="container">
    <div className="industrial-section-heading"><div><div className="eyebrow">Applications</div><h2 className="serif">One technology.<br/><em>Many industries.</em></h2></div><p>Enzymes and microbial technologies can support a broad range of processes. Product suitability, performance and specification should be assessed for each application.</p></div>
    <div className="industrial-industry-grid">{featuredIndustries.map((industry,i)=><a href={`/industries/${industrySlug(industry)}`} className="industrial-industry-card" key={industry.name}><span>{String(i+1).padStart(2,'0')}</span><h3 className="serif">{industry.name}</h3><span className="industrial-arrow">↗</span><p>{industry.short}</p></a>)}</div>
    <div className="industrial-more-link"><a className="industrial-inline-link" href="/industries">Explore all applications <span>↗</span></a></div>
  </div>
</section>

<section className="industrial-manufacturing section" id="manufacturing">
  <div className="container industrial-manufacturing-grid">
    <div className="industrial-manufacturing-visual" aria-label="Illustrative industrial manufacturing footage from free stock video">
      <video className="industrial-section-video" autoPlay muted loop playsInline preload="metadata" poster="https://images.pexels.com/videos/32386559/pexels-photo-32386559.jpeg?auto=compress&cs=tinysrgb&w=1200">
        <source src="https://videos.pexels.com/video-files/32386559/32386559-hd_1920_1080_25fps.mp4" type="video/mp4"/>
      </video>
      <div className="industrial-stock-label">ILLUSTRATIVE STOCK FOOTAGE</div>
      <div className="industrial-visual-top"><span>BIOTECHNOLOGY MANUFACTURING</span><span>AHWAN LAB</span></div>
      <div className="industrial-visual-bottom"><span>FERMENTATION</span><span>PROCESSING</span><span>QUALITY</span></div>
    </div>
    <div className="industrial-manufacturing-copy"><div className="eyebrow">Manufacturing &amp; quality</div><h2 className="serif">From process knowledge<br/><em>to reliable supply.</em></h2><p>Our business story is rooted in enzyme and microbial biotechnology, manufacturing know-how and a commitment to product consistency. The right solution begins with understanding the application and confirming the relevant product specification.</p><p>Facility details, production capabilities, certifications and technical claims will be presented only where they are verified for AHWAN LAB and its manufacturing arrangements.</p><a className="industrial-inline-link" href="/about#manufacturing">Explore manufacturing &amp; quality <span>↗</span></a></div>
  </div>
</section>

<section className="industrial-featured section">
  <div className="container">
    <div className="industrial-section-heading"><div><div className="eyebrow">How we work</div><h2 className="serif">A solution shaped<br/><em>around your process.</em></h2></div><p>Tell us the application, desired outcome and operating conditions. Our team can help identify relevant product ranges and the technical information needed for evaluation.</p></div>
    <div className="industrial-family-grid">
      <div className="industrial-family-card"><span className="industrial-card-number">01</span><div><h3 className="serif">Understand the application</h3><p>Start with the process, substrate, operating conditions and target result.</p></div></div>
      <div className="industrial-family-card"><span className="industrial-card-number">02</span><div><h3 className="serif">Review product fit</h3><p>Compare available grades and technical specifications for the intended use.</p></div></div>
      <div className="industrial-family-card"><span className="industrial-card-number">03</span><div><h3 className="serif">Confirm supply details</h3><p>Agree documentation, packaging, quantity and commercial terms before order.</p></div></div>
    </div>
    <div className="industrial-more-link"><a className="industrial-inline-link" href="/contact">Talk to our team <span>↗</span></a></div>
  </div>
</section>

<section className="industrial-partner-band">
  <div className="container industrial-partner-content"><div><div className="eyebrow">Let's discuss your application</div><h2 className="serif">Bring us your<br/><em>process challenge.</em></h2></div><p>Share your industry, application, target specification and estimated quantity. We can start with the problem you need to solve, even if you do not yet know which enzyme or microbial solution is suitable.</p><a className="btn btn-gold" href="/contact">Make an enquiry <span>↗</span></a></div>
</section>

<QualitySection/>
</main>}
