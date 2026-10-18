'use client';
import {useEffect,useRef,useState} from 'react';
const REQUESTS=['A specific enzyme','A specific probiotic strain','Yeast culture','Make my own composition','A custom solution for a problem','One of your formulations','Import / distributorship','Other'];
// Links from the Solution Finder carry ?need=&product=&message= so the buyer's problem arrives pre-filled.
const NEED:Record<string,string>={problem:REQUESTS[4],ingredient:REQUESTS[0],composition:REQUESTS[3],distributor:REQUESTS[6]};

// `interest` preselects "What do you need?" on pages aimed at one kind of buyer (e.g. importers).
export default function EnquiryForm({interest}:{interest?:string}={}){
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 const [error,setError]=useState('');
 const formRef=useRef<HTMLFormElement>(null);
 useEffect(()=>{
  const params=new URLSearchParams(window.location.search);const form=formRef.current;if(!form)return;
  const set=(name:string,value:string|null|undefined)=>{const el=form.elements.namedItem(name) as HTMLInputElement|null;if(el&&value)el.value=value};
  set('interest',NEED[params.get('need')||'']||interest);set('product',params.get('product'));set('message',params.get('message'));
 },[]);

 const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  const form=e.currentTarget;
  setStatus('sending');
  setError('');
  try{
   const res=await fetch('/api/enquiry',{method:'POST',body:new FormData(form)});
   const data=await res.json().catch(()=>({ok:false,error:'Something went wrong.'}));
   if(!res.ok||!data.ok){
    setStatus('error');
    setError(data.error||'Something went wrong. Please try again.');
    return;
   }
   form.reset();
   setStatus('sent');
  }catch{
   setStatus('error');
   setError('Could not reach the server. Please check your connection and try again.');
  }
 };

 if(status==='sent'){
  return <div className="enquiry-form"><div className="form-success"><div className="eyebrow">Requirement received</div><h3 className="serif">Thank you. Let's take it from here.</h3><p>Our team can review your requirement and follow up with the right commercial or technical response.</p><button type="button" className="btn btn-light" onClick={()=>setStatus('idle')}>Send another enquiry</button></div></div>;
 }

 return <form ref={formRef} className="enquiry-form" onSubmit={onSubmit}>
  <div className="form-row"><label>Full name<input required name="name" placeholder="Your name"/></label><label>Company name<input required name="company" placeholder="Company / organisation"/></label></div>
  <div className="form-row"><label>Business email<input required type="email" name="email" placeholder="name@company.com"/></label><label>Country<input required name="country" placeholder="Country / state"/></label></div>
  <div className="form-row"><label>What do you need?<select name="interest" defaultValue={interest||''}><option value="" disabled>Select one</option>{REQUESTS.map(r=><option key={r}>{r}</option>)}</select></label><label>Ingredient / product<input name="product" placeholder="e.g. Phytase 10,000 FTU/g, or your blend name"/></label></div>
  <label>Tell us about your requirement<textarea required name="message" rows={5} placeholder="Specification or composition, application, species, quantity and pack — or describe the problem you are seeing…"/></label>
  <label className="upload-field">Attach specification / RFQ<input type="file" name="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv"/></label>
  {status==='error'&&<p className="form-error" role="alert">{error}</p>}
  <div className="form-submit"><small>By submitting, you are asking AHWAN LAB to respond to your business enquiry.</small><button className="btn btn-gold" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send My Requirement ↗'}</button></div>
 </form>;
}
