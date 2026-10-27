// Brand and contact details for AHWAN LAB.
export const SITE={
 name:'AHWAN LAB',
 tagline:'Industrial Biotechnology',
 email:'info@ahwanlab.com',
 phone:'+91 86997 33446',
 phoneHref:'tel:+918699733446',
 whatsapp:(text='Hello AHWAN LAB, I have a requirement:')=>`https://wa.me/918699733446?text=${encodeURIComponent(text)}`,
 // Certifications shown on the Quality section. Add only certificates you hold, e.g. 'ISO 9001:2015',
 // 'FAMI-QS', 'GMP+', 'Halal'. The row stays hidden while this list is empty.
 certifications:[] as string[],
 address:['9, Orient, Near NABARD,','Usmanpura, Ahmedabad - 380 013','Gujarat, India'],
};
