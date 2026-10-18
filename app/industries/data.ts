import {products,slugify,type Product} from '../products/data';

// Industries AHWAN LAB supplies. `uses` pair a catalogue ingredient (by exact product name) with the
// job it does in that industry; names not in the catalogue are skipped. `enquiry` lists further
// activities supplied on request, with specification agreed per enquiry — no specs are shown for them.
export type Use={name:string;role:string};
export type Industry={name:string;short:string;intro:string;uses:Use[];enquiry?:string[];note?:string;formulations?:boolean};

export const industries:Industry[]=[
 {name:'Animal Feed',short:'Enzymes, probiotics and yeast for poultry, cattle, aqua and swine feed.',
  intro:'Feed enzymes release nutrients locked in grains and oilseed meals, while probiotics and yeast support gut health. We supply single ingredients to your specification, and our own poultry formulations.',formulations:true,
  uses:[{name:'Phytase',role:'Releases phytate-bound phosphorus and minerals, reducing inorganic phosphate in the diet.'},{name:'Protease',role:'Improves protein digestibility from soybean and other meals.'},{name:'Xylanase',role:'Breaks down arabinoxylans in wheat and maize to reduce digesta viscosity.'},{name:'Beta-glucanase',role:'Breaks down β-glucans in barley- and oat-based diets.'},{name:'Beta-mannanase',role:'Breaks down β-mannans in soybean, palm kernel and copra meals.'},{name:'Bacillus subtilis',role:'Spore-forming probiotic that tolerates pelleting and storage.'},{name:'Lactobacillus acidophilus',role:'Lactic acid bacterium for gut-health programmes.'},{name:'Saccharomyces cerevisiae',role:'Live yeast culture for feed and probiotic blends.'}]},
 {name:'Food & Beverage',short:'Enzymes for baking, brewing, juices, dairy and protein processing.',
  intro:'Food enzymes improve yield, texture, clarity and processing speed. Activity, form and food-grade documentation are agreed per enquiry.',
  uses:[{name:'Amylase',role:'Starch breakdown in baking, brewing and syrup production.'},{name:'Pectinase',role:'Juice extraction and clarification in fruit processing.'},{name:'Protease',role:'Protein hydrolysis and meat tenderising.'},{name:'Xylanase',role:'Dough handling and loaf volume in baking.'},{name:'Beta-glucanase',role:'Wort filtration in brewing.'},{name:'Lipase',role:'Flavour development in dairy and fat modification.'},{name:'Tannase',role:'Tea processing and reducing haze in beverages.'}],
  enquiry:['Glucose oxidase','Lactase (β-galactosidase)','Invertase','Fungal diastase','Bromelain','Catalase']},
 {name:'Human Nutrition',short:'Probiotic strains and digestive enzymes for supplement makers.',
  intro:'Probiotic cultures and digestive enzymes supplied as raw materials to nutraceutical and supplement formulators.',
  uses:[{name:'Lactobacillus rhamnosus GG (LGG)',role:'Probiotic culture for supplement formulations.'},{name:'Bifidobacterium longum',role:'Bifidobacterium culture for probiotic blends.'},{name:'Bacillus coagulans',role:'Spore-forming probiotic with good shelf stability.'},{name:'Saccharomyces boulardii',role:'Probiotic yeast culture.'},{name:'Protease',role:'Protein-digesting enzyme for digestive-enzyme blends.'},{name:'Amylase',role:'Starch-digesting enzyme for digestive-enzyme blends.'},{name:'Lipase',role:'Fat-digesting enzyme for digestive-enzyme blends.'}],
  enquiry:['Lactase (β-galactosidase)','α-Galactosidase','Bromelain'],
  note:'Supplied as raw materials. Product claims and approvals for finished supplements are the formulator’s responsibility in each market.'},
 {name:'Pharma',short:'Enzyme raw materials for pharmaceutical formulators.',
  intro:'Proteolytic and digestive enzymes supplied as raw materials to pharmaceutical formulators, with documentation agreed per enquiry.',
  uses:[{name:'Serratiopeptidase',role:'Proteolytic enzyme supplied as enteric-coated granules.'},{name:'Protease',role:'Proteolytic enzyme for digestive formulations.'},{name:'Amylase',role:'Starch-digesting enzyme for digestive formulations.'},{name:'Lipase',role:'Fat-digesting enzyme for digestive formulations.'},{name:'Bacillus clausii',role:'Spore-forming probiotic culture.'}],
  enquiry:['Lactase (β-galactosidase)','Bromelain'],
  note:'Supplied as raw materials. Pharmacopoeial grade and registration status are confirmed per enquiry.'},
 {name:'Starch & Sweeteners',short:'Liquefaction and saccharification enzymes for starch processing.',
  intro:'Enzymes convert starch into dextrins, glucose and maltose syrups more efficiently than acid hydrolysis.',
  uses:[{name:'Amylase',role:'Liquefaction — breaks gelatinised starch into dextrins.'},{name:'Cellulase',role:'Releases starch bound in fibre to improve yield.'}],
  enquiry:['Glucoamylase','β-Amylase','Invertase']},
 {name:'Textile',short:'Desizing, bio-polishing, bio-scouring and denim finishing.',
  intro:'Enzymes replace harsh chemicals in textile wet processing, working at milder temperatures and pH.',
  uses:[{name:'Amylase',role:'Desizing — removes starch size from woven fabric.'},{name:'Cellulase',role:'Bio-polishing and denim stone-wash effects.'},{name:'Pectinase',role:'Bio-scouring of cotton.'},{name:'Laccase',role:'Denim bleaching and indigo shade adjustment.'}],
  enquiry:['Catalase']},
 {name:'Paper & Pulp',short:'Bleach boosting, deinking, pitch control and starch modification.',
  intro:'Enzymes reduce chemical and energy use across pulping, bleaching and papermaking.',
  uses:[{name:'Xylanase',role:'Bleach boosting — reduces chlorine-based bleaching chemicals.'},{name:'Cellulase',role:'Deinking and fibre modification.'},{name:'Lipase',role:'Pitch control.'},{name:'Amylase',role:'Starch modification for surface sizing and coating.'},{name:'Laccase',role:'Lignin modification.'}]},
 {name:'Detergent & Household Care',short:'Stain-removing enzymes for detergents, soaps and cleaners.',
  intro:'Each enzyme targets a type of stain, allowing effective cleaning at lower wash temperatures.',
  uses:[{name:'Protease',role:'Removes protein stains such as blood, egg and grass.'},{name:'Amylase',role:'Removes starch stains.'},{name:'Lipase',role:'Removes fat and oil stains.'},{name:'Cellulase',role:'Colour care and anti-pilling.'},{name:'Beta-mannanase',role:'Removes gum-based food stains.'}]},
 {name:'Wastewater',short:'Microbial cultures and enzymes for effluent and water treatment.',
  intro:'Selected bacteria and enzymes break down organic load, ammonia, fats and odour-causing compounds in effluent, drains and ponds.',
  uses:[{name:'Nitrosomonas sp.',role:'Converts ammonia to nitrite (nitrification, step 1).'},{name:'Nitrobacter sp.',role:'Converts nitrite to nitrate (nitrification, step 2).'},{name:'Pseudomonas putida',role:'Degrades organic compounds in effluent.'},{name:'Thiobacillus thioxidans',role:'Oxidises sulphur compounds that cause odour.'},{name:'Bacillus subtilis',role:'Reduces organic sludge.'},{name:'Lipase',role:'Breaks down fats, oils and grease.'}]},
 {name:'Agriculture',short:'Biocontrol cultures and soil microbes for sustainable farming.',
  intro:'Microbial cultures support soil health, crop-residue decomposition and biological crop protection.',
  uses:[{name:'Trichoderma harzianum',role:'Biocontrol fungus against soil-borne plant diseases.'},{name:'Beauveria bassiana',role:'Entomopathogenic fungus for insect control.'},{name:'Metarhizium anisopliae',role:'Entomopathogenic fungus for insect control.'},{name:'Bacillus megaterium',role:'Phosphate-solubilising soil bacterium.'},{name:'Bacillus subtilis',role:'Soil and root-zone microbe.'},{name:'Cellulase',role:'Speeds up composting of crop residue.'}],
  note:'Bio-pesticide and bio-fertiliser products need registration in most markets; we confirm status per enquiry.'},
 {name:'Biofuel & Ethanol',short:'Enzymes and yeast for grain- and molasses-based ethanol.',
  intro:'Enzymes convert starch and fibre into fermentable sugars, and yeast ferments them to ethanol.',
  uses:[{name:'Amylase',role:'Liquefaction of grain mash.'},{name:'Protease',role:'Releases free amino nitrogen to support yeast during fermentation.'},{name:'Beta-glucanase',role:'Reduces mash viscosity.'},{name:'Xylanase',role:'Reduces mash viscosity and releases sugars from fibre.'},{name:'Cellulase',role:'Converts fibre to fermentable sugars.'},{name:'Saccharomyces cerevisiae',role:'Ferments sugars to ethanol.'}],
  enquiry:['Glucoamylase']},
];

export const industrySlug=(i:Industry)=>slugify(i.name);
export const getIndustry=(slug:string)=>industries.find(i=>industrySlug(i)===slug);
// Catalogue products used in an industry, in the order listed. Prefers the ingredient over a formulation of the same name.
export function industryProducts(i:Industry):{product:Product;role:string}[]{
 return i.uses.flatMap(u=>{const product=products.find(p=>p.name===u.name&&p.category!=='Our Formulations');return product?[{product,role:u.role}]:[]});
}
export const industriesFor=(name:string)=>industries.filter(i=>i.uses.some(u=>u.name===name));
