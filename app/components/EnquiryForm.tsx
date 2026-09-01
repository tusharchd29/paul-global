'use client';
import {useState} from 'react';

export default function EnquiryForm(){
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 const [error,setError]=useState('');

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

 return <form className="enquiry-form" onSubmit={onSubmit}>
  <div className="form-row"><label>Full name<input required name="name" placeholder="Your name"/></label><label>Company name<input required name="company" placeholder="Company / organisation"/></label></div>
  <div className="form-row"><label>Business email<input required type="email" name="email" placeholder="name@company.com"/></label><label>Country<input required name="country" placeholder="Country / market"/></label></div>
  <div className="form-row"><label>I'm interested in<select name="interest" defaultValue=""><option value="" disabled>Select a category</option><option>Poultry Nutrition</option><option>Dairy & Cattle</option><option>Aquaculture</option><option>Enzymes</option><option>Probiotics & Prebiotics</option><option>Feed Additives</option></select></label><label>Product name<input name="product" placeholder="If known"/></label></div>
  <label>Tell us about your requirement<textarea required name="message" rows={5} placeholder="Application, quantity, specification, market or any technical question…"/></label>
  <label className="upload-field">Attach specification / RFQ<input type="file" name="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv"/></label>
  {status==='error'&&<p className="form-error" role="alert">{error}</p>}
  <div className="form-submit"><small>By submitting, you are asking Paul Global to respond to your business enquiry.</small><button className="btn btn-gold" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send My Requirement ↗'}</button></div>
 </form>;
}
