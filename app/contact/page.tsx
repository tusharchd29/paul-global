import Link from 'next/link';
import {MenuButton} from '../components/SiteMenu';
import Logo from '../components/Logo';
import EnquiryForm from '../components/EnquiryForm';
import {SITE} from '../site';

export const metadata={title:'Contact & Enquiries | AHWAN LAB',description:'Share your industrial enzyme, microbial culture or formulation requirement with AHWAN LAB.'};

export default function ContactPage(){return <main className="contact-page">
 <header className="products-header"><div className="container"><div className="products-nav"><Link className="logo" href="/" aria-label={SITE.name}><Logo tagline/></Link><nav className="products-links"><Link href="/">Home</Link><Link href="/products">Products</Link><Link href="/industries">Industries</Link><Link href="/about">About</Link></nav><div className="nav-actions"><MenuButton/></div></div><div className="products-title"><div className="eyebrow">AHWAN LAB · Contact</div><h1 className="serif">Tell us what your<br/><em>process needs.</em></h1><p>Share the application, target specification and estimated quantity. If you are unsure which ingredient fits, describe the challenge and our team can review it with you.</p></div></div></header>
 <section className="section industrial-contact contact-page-section"><div className="container"><div className="industrial-contact-heading"><div><div className="eyebrow">Business enquiries</div><h2 className="serif">Start with<br/><em>the details.</em></h2><p>Fields marked as required help us route your request to the right person.</p></div><div className="industrial-contact-details"><div><span>Address</span><p>{SITE.address.map(l=><span key={l}>{l}<br/></span>)}</p></div><div><span>Phone / WhatsApp</span><p><a href={SITE.phoneHref}>{SITE.phone}</a> · <a href={SITE.whatsapp()} target="_blank" rel="noopener">WhatsApp</a></p></div><div><span>Email</span><p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div></div></div><EnquiryForm/></div></section>
</main>}