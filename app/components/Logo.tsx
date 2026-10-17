import {SITE} from '../site';

// Text lockup of the AHWAN LAB mark from the brochure: wordmark, dot arc and tagline.
export default function Logo({tagline=false,className=''}:{tagline?:boolean;className?:string}){
 return <span className={`brand ${className}`}>
  <span className="brand-word">AHWAN<b>LAB</b><svg className="brand-dots" viewBox="0 0 28 26" aria-hidden="true"><circle cx="4" cy="9" r="1.6"/><circle cx="11" cy="4.5" r="2.2"/><circle cx="19.5" cy="3.5" r="2.8"/><circle cx="25" cy="10" r="3"/><circle cx="23" cy="20" r="2.4"/></svg></span>
  {tagline&&<small className="brand-tagline">{SITE.tagline}</small>}
 </span>;
}
