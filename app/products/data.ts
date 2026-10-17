export type Row=[string,string];
export type Grade={spec:string;form:string;pack:string};
export type Product={name:string;category:string;type:string;tagline:string;summary:string;image?:string;notice?:string;sections?:{title:string;body:string}[];composition?:{title:string;rows:Row[]}[];points?:string[];benefits:string[];dosage:string[];presentation?:string;storage?:string;matrix?:{note:string;columns:string[];rows:[string,string,string][]};grades?:Grade[];problemTags:string[]};

// The "problem map" routes a buyer's stated problem to the right products. Product names
// below must match the exact `name` values further down this file. Every link is taken from
// the indication / benefit lists printed in the AHWAN LAB brochure.
export type ProblemGroup={sector:string;items:{label:string;productNames:string[]}[]};
export const problemGuide:ProblemGroup[]=[
 {sector:'Poultry',items:[
  {label:'Weak egg shells or skeletal integrity',productNames:['Calshell']},
  {label:'Poor FCR or weight gain',productNames:['Progrow','Livoshield','XP-Zyme','Calshell']},
  {label:'Gut health or mortality',productNames:['Progrow']},
  {label:'Ammonia in litter',productNames:['Progrow']},
  {label:'Liver stress or low immunity',productNames:['Livoshield']},
  {label:'High phosphorus / DCP cost',productNames:['Phytomin Pro','XP-Zyme']},
  {label:'Protein digestion or protein cost',productNames:['Digesmo-Pro']},
  {label:'Fibre (NSP) in the diet',productNames:['XP-Zyme']},
 ]},
];
const PROBLEM_TAGS:Record<string,string[]>=(()=>{const m:Record<string,string[]>={};problemGuide.forEach(g=>g.items.forEach(it=>it.productNames.forEach(n=>{(m[n]=m[n]||[]).push(it.label)})));return m})();

// Finished poultry formulations, transcribed from the AHWAN LAB brochure (composition, indication,
// dose and presentation exactly as printed; obvious spelling slips corrected).
const formulations:Omit<Product,'category'|'problemTags'>[]=[
 {name:'Calshell',type:'Calcium supplement',tagline:'Calcium granules to improve egg shell',image:'/products/calshell.png',
  summary:'Calcium granules built on a microcrystalline hydroxyapatite complex (MCHC), delivering calcium and phosphorus together with vitamin D3, vitamin B12, magnesium and manganese.',
  notice:'Animal feed supplement — for animal use only, not for human use.',
  composition:[{title:'Each 5 g contains MCHC equivalent to',rows:[['Calcium','165 mg'],['Phosphorus','75 mg'],['Vitamin D3','500 IU'],['Vitamin B12','5 mcg'],['Magnesium','2 mg'],['Manganese','10 mg']]}],
  benefits:['Improves egg shell quality','Better weight gain in broiler','Better skeletal integrity'],
  dosage:['500 g to 1 kg per ton of poultry feed, or as per the advice of consultants.']},
 {name:'Progrow',type:'Probiotic · enzyme · yeast',tagline:'Multistrain probiotic with enzyme and yeast',image:'/products/progrow.png',
  summary:'A multistrain probiotic (3,600 million CFU/g) combined with a five-enzyme profile and Saccharomyces yeast (1,800 million CFU/g) for gut health, digestibility and uniform growth.',
  composition:[
   {title:'Probiotic profile — 3,600 million CFU/g',rows:[['Bacillus sp.',''],['Lactobacillus sp.',''],['Enterococcus sp.',''],['Streptococcus sp.',''],['Pediococcus sp.','']]},
   {title:'Enzyme profile',rows:[['Protease','90,000 U/g'],['Cellulase','45,000 U/g'],['Amylase','63,000 U/g'],['Phytase','18,000 U/g'],['Xylanase','27,000 U/g']]},
   {title:'Yeast profile — 1,800 million CFU/g',rows:[['Saccharomyces sp.','']]},
  ],
  sections:[
   {title:'Role of probiotics in poultry',body:'Maintain and improve the gut microflora as an external supplement, and reduce pathogenic load by competitive exclusion.'},
   {title:'Role of enzymes in poultry',body:'Maintain or improve bird performance by increasing the nutritional value of feed ingredients and reducing feed costs.'},
   {title:'Role of yeast in poultry',body:'Supports performance, digestibility, mucosal development and immunomodulatory functions. S. boulardii increases the production and secretion of glycoproteins — namely the secretory component of immunoglobulin A — and, supplemented into poultry feed, helps prevent colonisation by Clostridium difficile, a food-associated pathogen causing gastroenteritis. S. cerevisiae also produces invertase, which hydrolyses sucrose into glucose and fructose, making more glucose available to the bird and to other microorganisms in the surrounding environment.'},
  ],
  benefits:['Optimises gut health, enhancing digestibility and nutrient absorption','Helps body-weight gain','Reduces mortality','Improves FCR','Reduces ammonia production in litter','Uniform growth','Supportive therapy for bacterial and viral diseases'],
  dosage:['Poultry mash feed — Starter: 200 g / ton','Grower: 150 g / ton','Finisher: 100 g / ton','Morning drinking water: 1 g in 2 litres of water, or as directed by a veterinarian.'],
  presentation:'25 kg powder'},
 {name:'Livoshield',type:'Herbal liver protector',tagline:'Herbal liver protector',image:'/products/livoshield.png',
  summary:'A blend of six medicinal herbs — Eclipta alba, Picrorhiza kurroa, Tephrosia purpurea, Cichorium endivia, Phyllanthus niruri and Terminalia chebula — for liver protection, FCR and growth.',
  composition:[{title:'Blend of medicinal herbs',rows:[['Eclipta alba',''],['Picrorhiza kurroa',''],['Tephrosia purpurea',''],['Cichorium endivia',''],['Phyllanthus niruri',''],['Terminalia chebula','']]}],
  benefits:['Liver upgradation and protection','Better FCR and growth','Growth promoter','Builds immunity'],
  dosage:['200 g per ton of poultry feed, or as directed by a veterinarian.'],
  presentation:'30 kg powder'},
 {name:'Phytomin Pro',type:'Phytase enzyme',tagline:'Micronised powder phytase enzyme',image:'/products/phytomin-pro.png',
  summary:'A micronised phytase powder with a minimum activity of 5,000 FTU/g that releases phytate-bound phosphorus, minerals and nutrients — reducing the need for costly inorganic phosphorus.',
  composition:[{title:'Each gram contains',rows:[['Phytase (minimum activity)','5,000 FTU']]}],
  points:['When added to the feed it facilitates the release of phytate-bound phosphorus.','It also helps release other minerals like calcium and magnesium.','Other trace minerals like copper and zinc, and phytate-bound nutrients like protein, amino acids and starch, are also released.','Phytomin Pro therefore works as an excellent source of phosphorus, helping reduce the inclusion rate of inorganic / organic phosphorus like DCP, MCP or bone meal.'],
  benefits:['Reduces supplementation of costly inorganic phosphorus in the feed, thereby reducing feed cost','Increases the utilisation and efficiency of minerals, protein and other nutrients','Reduces the cost of feed and thereby the cost of production'],
  dosage:['Layers: per ton of feed with 2–4 kg of DCP / ton — contact us for the inclusion rate.','Broilers: 100–200 g / ton of feed with 2–6 kg of DCP / ton.','Breeders: as recommended by the nutritionist / veterinarian.','Please consult the veterinarian / nutritionist while using the product.']},
 {name:'Digesmo-Pro',type:'Protease enzyme blend',tagline:'Optimizing protein digestion',image:'/products/digesmo-pro.png',
  summary:'An acid and alkaline protease blend with cellulase, amylase and Lactobacillus sporogenes that breaks protein down into the amino acids and peptides poultry need.',
  sections:[{title:'Why it matters',body:'Protein is one of the most expensive but essential components of poultry feed. The challenge is to use protein more efficiently and control feed cost without compromising bird performance at any stage of the life cycle. Digesmo-Pro is specially developed to break protein molecules down into the amino acids and peptides needed by poultry, significantly increasing the digestibility of protein.'}],
  composition:[{title:'Composition',rows:[['Acid & alkaline protease','NLT 500,000 U/g'],['Cellulase','NLT 50,000 U/g'],['Amylase','NLT 50,000 U/g'],['Lactobacillus sporogenes','NLT 10 million /g'],['Powered by protein hydrolysate, amino acids & minerals','']]},{title:'Operating range',rows:[['Effective pH range','3.5 to 9.5'],['Effective temperature range','10 to 90 °C']]}],
  benefits:['Improves protein digestibility and absorption','Allows lower-quality protein sources to be included in feed to manage feed cost','Improves nutrient absorption and reduces nitrogen excretion, helping protect the environment'],
  dosage:['150 g to 330 g per ton of poultry feed.'],
  storage:'Room temperature',
  matrix:{note:'Calculated matrix value at the recommended inclusion of 330 g per ton of poultry feed. The final CP% of feed should be worked out based on the type of feed ingredients used as substitutes.',columns:['Broiler — pre-starter / starter CP 7–9%, finisher CP 9–12%','Layer — laying phase CP 7–11%'],
   rows:[['ME','50–60 Kcal','50–60 Kcal'],['Methionine','0.03%','0.03%'],['Lysine','0.12%','0.12%'],['Methionine + Cysteine','0.07%','0.07%'],['Threonine','0.08%','0.13%'],['Valine','0.12%','0.15%'],['Arginine','0.15%','0.16%'],['Tryptophan','0.03%','0.03%'],['Leucine','0.20%','0.13%'],['Isoleucine','0.11%','0.8%'],['Histidine','0.06%','0.05%'],['Phenylalanine','0.13%','0.12%']]}},
 {name:'XP-Zyme',type:'Xylanase · phytase blend',tagline:'Unique blend of thermostable xylanase and phytase enzyme powder',image:'/products/xp-zyme.png',
  summary:'A thermostable xylanase (160,000 U/g) and phytase (5,000 U/g) powder that breaks down plant cell-wall hemicellulose and releases phytate-bound phosphorus.',
  sections:[
   {title:'Xylanase',body:'Xylanase (endo-1,4-β-xylanase) degrades the linear polysaccharide xylan into xylose, breaking down hemicellulose — one of the major components of plant cell walls.'},
   {title:'Phytase',body:'Phytase is a phosphatase enzyme that catalyses the hydrolysis of phytic acid — the indigestible, organic form of phosphorus found in grains and oil seeds — releasing a usable form of inorganic phosphorus.'},
  ],
  composition:[{title:'Each gram contains',rows:[['Xylanase','160,000 U'],['Phytase','5,000 U']]}],
  benefits:['Flexibility in diet formulation','Improves weight gain','Improves feed efficiency'],
  dosage:['100 g per ton of poultry feed, or as directed by a poultry consultant.']},
];

// Raw-material catalogues (enzymes, probiotics, yeast) as listed in the brochure tables.
// One entry per ingredient; where the brochure lists a powder and a water-soluble grade,
// both appear as grades of the same product.
const PACK='25 kg HDPE drum or bag';
const CFU='5 to 20 billion CFU per g';
const range=(a:string,b:string,u:string)=>`${a} to ${b} ${u}`;
const ENZYMES:{name:string;summary:string;grades:Grade[]}[]=[
 {name:'Phytase',summary:'Hydrolyses phytate (phytic acid) to release bound phosphorus and minerals from grains and oil seeds.',grades:[{spec:range('100,000','200,000','FTU/g'),form:'Powder',pack:PACK},{spec:range('100,000','200,000','FTU/g'),form:'Water soluble powder',pack:PACK}]},
 {name:'Protease',summary:'Hydrolyses proteins into peptides and amino acids, improving protein digestibility.',grades:[{spec:range('100,000','1,000,000','U/g'),form:'Powder',pack:PACK},{spec:range('100,000','1,000,000','U/g'),form:'Water soluble powder',pack:PACK}]},
 {name:'Cellulase',summary:'Breaks down cellulose, the main structural polysaccharide of plant cell walls.',grades:[{spec:range('100,000','1,100,000','U/g'),form:'Powder',pack:PACK},{spec:range('100,000','200,000','FTU/g'),form:'Water soluble powder',pack:PACK}]},
 {name:'Amylase',summary:'Hydrolyses starch into dextrins and sugars.',grades:[{spec:range('100,000','600,000','U/g'),form:'Powder',pack:PACK},{spec:range('100,000','200,000','U/g'),form:'Water soluble powder',pack:PACK}]},
 {name:'Xylanase',summary:'Breaks down xylan, a major hemicellulose of cereal and plant cell walls.',grades:[{spec:range('100,000','1,200,000','U/g'),form:'Powder',pack:PACK},{spec:range('100,000','200,000','U/g'),form:'Water soluble powder',pack:PACK}]},
 {name:'Pectinase',summary:'Breaks down pectin in plant cell walls.',grades:[{spec:range('100,000','1,200,000','U/g'),form:'Powder',pack:PACK},{spec:range('100,000','200,000','U/g'),form:'Water soluble powder',pack:PACK}]},
 {name:'Beta-glucanase',summary:'Hydrolyses β-glucans, the soluble fibre found in cereals such as barley and oats.',grades:[{spec:range('100,000','1,500,000','U/g'),form:'Powder',pack:PACK},{spec:range('100,000','200,000','U/g'),form:'Water soluble powder',pack:PACK}]},
 {name:'Lipase',summary:'Hydrolyses fats into fatty acids and glycerol.',grades:[{spec:range('100,000','1,000,000','U/g'),form:'Powder',pack:PACK},{spec:range('100,000','200,000','U/g'),form:'Water soluble powder',pack:PACK}]},
 {name:'Beta-mannanase',summary:'Hydrolyses β-mannans found in oilseed meals and other plant ingredients.',grades:[{spec:range('100,000','1,000,000','U/g'),form:'Powder',pack:PACK},{spec:range('100,000','200,000','U/g'),form:'Water soluble powder',pack:PACK}]},
 {name:'Serratiopeptidase',summary:'A proteolytic enzyme, supplied as enteric-coated granules.',grades:[{spec:'2,000 U/mg',form:'Enteric coated granules',pack:PACK}]},
 {name:'Tannase',summary:'Hydrolyses tannins (tannic acid) into gallic acid and glucose.',grades:[{spec:'On request',form:'Powder',pack:PACK}]},
 {name:'Laccase',summary:'An oxidative enzyme acting on phenolic compounds.',grades:[{spec:'On request',form:'Powder',pack:PACK}]},
];
const STRAIN_GROUPS:{type:string;summary:string;names:string[]}[]=[
 {type:'Lactic acid bacteria',summary:'A lactic acid–producing strain used in gut-health and probiotic formulations.',names:['Lactobacillus acidophilus','Lactobacillus fermentum','Lactobacillus casei','Lactobacillus lactis','Lactobacillus reuteri','Lactobacillus rhamnosus','Lactobacillus rhamnosus GG (LGG)','Lactobacillus bulgaricus','Pediococcus acidilactici','Enterococcus faecium','Streptococcus faecalis','Streptococcus sp.','Bifidobacterium bifidum','Bifidobacterium longum','Bifidobacterium infantis']},
 {type:'Spore-forming bacteria',summary:'A spore-forming strain — spores tolerate feed processing and storage well, making these a common choice for feed-applied probiotics.',names:['Lactobacillus sporogenes','Bacillus coagulans','Bacillus subtilis','Bacillus licheniformis','Bacillus megaterium','Bacillus amyloliquefaciens','Bacillus firmus','Bacillus cereus','Bacillus lactis','Bacillus mesentericus','Bacillus clausii','Clostridium butyricum']},
 {type:'Water & environmental bacteria',summary:'Used in water-quality, pond-management and waste-treatment microbial programmes.',names:['Nitrosomonas sp.','Nitrobacter sp.','Rhodococcus sp.','Rhodobacter sp.','Pseudomonas putida','Thiobacillus thioxidans']},
 {type:'Fungal culture',summary:'A fungal culture used as an enzyme-production source or in agricultural biocontrol programmes.',names:['Aspergillus niger','Trichoderma harzianum','Beauveria bassiana','Metarhizium anisopliae']},
];
const YEASTS=['Saccharomyces cerevisiae','Saccharomyces boulardii'];

const tagged=(p:Omit<Product,'problemTags'>):Product=>({...p,problemTags:PROBLEM_TAGS[p.name]||[]});
const gradeTagline=(g:Grade[])=>[...new Set(g.map(x=>x.form))].join(' · ');

// Ingredient catalogues come first: supplying these to a buyer's specification is the core
// offer. The finished formulations follow as AHWAN LAB's own in-house work.
export const products:Product[]=[
 ...ENZYMES.map(e=>tagged({name:e.name,category:'Enzymes',type:'Feed enzyme',tagline:gradeTagline(e.grades),summary:e.summary,grades:e.grades,benefits:[],dosage:[]})),
 ...STRAIN_GROUPS.flatMap(g=>g.names.map(name=>tagged({name,category:'Probiotics',type:g.type,tagline:'Water soluble powder',summary:g.summary,grades:[{spec:CFU,form:'Water soluble powder',pack:PACK}],benefits:[],dosage:[]}))),
 ...YEASTS.map(name=>tagged({name,category:'Yeast',type:'Yeast culture',tagline:'Water soluble powder · Powder',summary:'A live yeast culture supplied as a standalone raw material for probiotic and feed formulations.',grades:[{spec:CFU,form:'Water soluble powder',pack:PACK},{spec:CFU,form:'Powder',pack:PACK}],benefits:[],dosage:[]})),
 ...formulations.map(f=>tagged({...f,category:'Our Formulations'})),
];
export const categories=[...new Set(products.map(p=>p.category))];
export const categoryMeta:Record<string,{label:string;intro:string}>={
 'Enzymes':{label:'Enzymes',intro:'Feed enzymes in powder and water-soluble grades — phytase, protease, carbohydrases, lipase and specialty activities — to your required specification.'},
 'Probiotics':{label:'Probiotics',intro:'Lactic acid, spore-forming, environmental and fungal strains at 5 to 20 billion CFU per gram, available as standalone raw materials.'},
 'Yeast':{label:'Yeast',intro:'Saccharomyces cerevisiae and Saccharomyces boulardii cultures in water-soluble and standard powder grades.'},
 'Our Formulations':{label:'Our Formulations',intro:'Formulations we have developed and use in the industry ourselves — proof of what we can build for you, and a starting point for your own custom blend.'},
};
export function slugify(v:string){return v.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
export function productSlug(p:Product){return `${slugify(p.category)}--${slugify(p.name)}`}
export function getProduct(slug:string){return products.find(p=>productSlug(p)===slug)}
