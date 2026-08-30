const categories = [
  ['01','Poultry Nutrition','Gut health, digestion, performance and feed efficiency solutions.'],
  ['02','Dairy & Cattle','Nutrition, mineral, digestive and performance support for livestock.'],
  ['03','Aquaculture','Pond, water quality, microbial and aquatic health solutions.'],
  ['04','Enzymes','Specialty enzymes supporting digestion and feed performance.'],
  ['05','Probiotics & Prebiotics','Microbial and prebiotic solutions for animal nutrition.'],
  ['06','Feed Additives','Functional nutrition products for modern feed programs.'],
];

export default function Home(){return <main>
  <header className="hero"><div className="container"><nav className="nav"><div className="logo">PAUL GLOBAL</div><div className="navlinks"><a href="#products">Products</a><a href="#about">About</a><a href="#markets">Global Markets</a><a href="#contact">Contact</a></div><a className="btn btn-gold" href="#contact">Request a Quote ↗</a></nav>
    <div className="hero-copy"><div className="eyebrow">Animal Nutrition · Global Export</div><h1 className="serif">Nutrition that moves<br/>across borders.</h1><p>Animal nutrition and feed solutions connecting trusted Indian manufacturing with international markets.</p><div style={{display:'flex',gap:12,marginTop:30}}><a className="btn btn-gold" href="#products">Explore Products ↗</a><a className="btn btn-light" href="#about">Our Story</a></div></div>
  </div></header>

  <section className="section" id="products"><div className="container"><div className="section-head"><div><div className="eyebrow">Our portfolio</div><h2 className="serif">Solutions by<br/>category.</h2></div><p className="muted" style={{maxWidth:430}}>Browse the Paul Global portfolio by application. Each category leads to a structured product catalogue designed for international buyers.</p></div>
    <div className="categories">{categories.map(([n,t,d])=><a className="category" href={`/products#${t.toLowerCase().replaceAll(' ','-')}`} key={t}><span>{n}</span><h3 className="serif">{t}</h3><span>{d}</span></a>)}</div>
  </div></section>

  <section className="section strip"><div className="container"><div className="section-head"><div><div className="eyebrow">Built for international trade</div><h2 className="serif">From formulation<br/>to foreign markets.</h2></div><p style={{maxWidth:440,color:'#c4d0ca',lineHeight:1.8}}>Paul Global brings together an export-focused commercial identity with the product and technical portfolio of Gujarat Enzyme.</p></div><div className="stats"><div className="stat"><strong>03</strong><span>Core animal sectors</span></div><div className="stat"><strong>06</strong><span>Portfolio categories</span></div><div className="stat"><strong>B2B</strong><span>Export model</span></div><div className="stat"><strong>01</strong><span>Global partner network</span></div></div></div></section>

  <section className="section feature" id="about"><div className="container feature-grid"><div><div className="eyebrow">The Paul Global approach</div><h2 className="serif">A sharper way to<br/>buy animal nutrition.</h2><p className="muted">We are building a product-first export platform where distributors, feed companies and international buyers can quickly discover the right solution, understand its application and send a commercial enquiry.</p><a className="btn btn-gold" href="#contact">Talk to our export team ↗</a></div><div className="feature-panel"><div className="eyebrow">Technology partner</div><h3>Gujarat Enzyme</h3><p style={{lineHeight:1.8,color:'#cbd8d1'}}>Paul Global's portfolio is supported by the product and technical range represented across poultry, dairy & cattle and aquaculture catalogues.</p><div style={{marginTop:35,paddingTop:22,borderTop:'1px solid rgba(255,255,255,.18)'}}>Product catalogue · Technical information · Export enquiries</div></div></div></section>

  <section className="section" id="markets"><div className="container"><div className="eyebrow">Global markets</div><h2 className="serif">A portfolio built<br/>for distribution.</h2><p className="muted" style={{maxWidth:650}}>Designed for importers, distributors, feed manufacturers, animal-health businesses and private-label partners seeking dependable animal nutrition solutions.</p></div></section>

  <section className="section strip" id="contact"><div className="container"><div className="eyebrow">Start a conversation</div><h2 className="serif">Looking for the right<br/>nutrition solution?</h2><p style={{color:'#c4d0ca',maxWidth:560,lineHeight:1.8}}>Tell us your market, application and product requirement. Our export team will help you identify the right portfolio and commercial route.</p><a className="btn btn-gold" href="mailto:exports@paulglobal.com">Request a Quote ↗</a></div></section>
  <footer className="footer"><div className="container footer-grid"><div><div className="logo">PAUL GLOBAL</div><small>Animal Nutrition & Feed Solutions</small></div><div><small>In collaboration with Gujarat Enzyme</small></div><div><small>© 2026 Paul Global</small></div></div></footer>
</main>}
