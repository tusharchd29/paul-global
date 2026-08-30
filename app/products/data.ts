export type Product={name:string;category:string;type:string;summary:string;applications:string[];benefits:string[]};
const make=(names:string[],category:string,type:string,application:string)=>names.map(name=>({name,category,type,summary:`${name} is part of the ${category.toLowerCase()} portfolio.`,applications:[application],benefits:['Available for international B2B enquiry','Technical information available on request']}));
export const products:Product[]=[
...make(['EnzyBond','Nutri9','M-MOS','BiomaS','AGX','Phytaaz','POWER PRO ACE','Lysozyme A','MUCINZYME','LitteraZ'],'Poultry Nutrition','Poultry solution','Poultry nutrition and feed programs'),
...make(['Neoliv','NEOBOLITE','Myeast','Neobiotic-Rz36Cr','Neobiotic-Rz36Cr Star','Spherucal','NEOMILK','NEOBIOTIC','ZYMIX','Neomin 9','M-MOS','Neomin 18','Rockett','Neovitaz AD3.E','Utrocent plus Vet.','Buffering Start','BooosT'],'Dairy & Cattle','Livestock nutrition','Dairy and cattle nutrition programs'),
...make(['Aquabiotic','M-MOS','Aquabiotic WS','Myeast AQUA','AQUABIOTIC NRB','NITROCLEAN','RHODOKLIN','AQUA PROTEXX','Neoliv Aqua'],'Aquaculture','Aquaculture solution','Aquaculture and pond-management programs'),
...make(['Amylase','Beta Galactosidase','Beta Glucanase','Mannanase','Bromelain','Catalase','Cellulase','Lipase','Phytase','Protease','Xylanase','Serratiopeptidase'],'Enzymes','Enzyme','Feed, nutrition and technical enzyme applications'),
...make(['Bacillus','Lactobacillus','Bifidobacterium','Enterococcus'],'Probiotics & Prebiotics','Microbial solution','Animal nutrition and microbial programs'),
...make(['Prebiotics'],'Probiotics & Prebiotics','Prebiotic solution','Animal nutrition and feed programs'),
...make(['Mineral supplements','Yeast-based solutions','Functional nutrition solutions'],'Feed Additives','Functional nutrition','Animal feed and nutrition programs'),
];
export const categories=[...new Set(products.map(p=>p.category))];
export const categoryMeta:Record<string,{label:string;intro:string;number:string}>={
 'Poultry Nutrition':{label:'Poultry',intro:'Solutions for poultry nutrition, gut health, digestion and feed programs.',number:'01'},
 'Dairy & Cattle':{label:'Dairy & Cattle',intro:'Nutrition and functional solutions for dairy and livestock applications.',number:'02'},
 'Aquaculture':{label:'Aquaculture',intro:'Microbial, pond and aquatic nutrition solutions for professional aquaculture programs.',number:'03'},
 'Enzymes':{label:'Enzymes',intro:'A technical enzyme portfolio for feed and nutrition applications.',number:'04'},
 'Probiotics & Prebiotics':{label:'Probiotics & Prebiotics',intro:'Microbial and prebiotic solutions represented across the animal nutrition portfolio.',number:'05'},
 'Feed Additives':{label:'Feed Additives',intro:'Functional nutrition product families for feed-industry buyers.',number:'06'}
};
export function slugify(v:string){return v.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
export function productSlug(p:Product){return `${slugify(p.category)}--${slugify(p.name)}`}
export function getProduct(slug:string){return products.find(p=>productSlug(p)===slug)}
