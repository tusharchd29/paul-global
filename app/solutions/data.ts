import {products,productSlug,type Product} from '../products/data';

// Problem → product knowledge base behind the Solution Finder. Every formulation link and
// "reason" restates an indication or benefit printed in the AHWAN LAB brochure; the ingredient
// suggestions (enzymes, probiotics, yeast) follow each ingredient's basic function and are
// offered as supporting ingredients or building blocks for a custom blend, not as
// finished-product claims. Names must match products.
export const AREAS=['Broilers','Layers','Breeders','Water & environment'] as const;
export type Area=typeof AREAS[number];
type Pick={name:string;reason:string};
export type Solution={id:string;label:string;symptom:string;areas:Area[];keywords:string[];why:string;primary:Pick[];also:Pick[];ingredients:Pick[];track:string[];caution?:string};

export const solutions:Solution[]=[
 {id:'weak-egg-shells',label:'Weak or thin egg shells',symptom:'Cracked, thin or soft-shelled eggs; rising breakage in the tray.',areas:['Layers','Breeders'],
  keywords:['egg','eggs','shell','shells','thin','crack','cracked','broken','breakage','soft','calcium','layer'],
  why:'Shell quality depends on enough available calcium and phosphorus, plus vitamin D3 to use them. Demand climbs as layers age and egg mass rises.',
  primary:[{name:'Calshell',reason:'MCHC calcium granules with phosphorus, vitamin D3, B12, magnesium and manganese — formulated to improve egg-shell quality.'}],
  also:[{name:'Phytomin Pro',reason:'Releases phytate-bound phosphorus along with calcium and magnesium from the feed itself.'}],
  ingredients:[{name:'Phytase',reason:'Unlocks phytate-bound phosphorus and calcium already in the feed.'},{name:'Bacillus subtilis',reason:'Gut-health support for better nutrient and mineral absorption.'},{name:'Lactobacillus acidophilus',reason:'Lactic acid bacteria that support a healthy gut and mineral uptake.'}],
  track:['Shell breakage / cracked-egg %','Shell weight and thickness','Egg production %']},
 {id:'leg-weakness',label:'Leg weakness or poor bone strength',symptom:'Lame birds, weak legs or poor skeletal development in fast-growing flocks.',areas:['Broilers','Breeders'],
  keywords:['leg','legs','lame','lameness','bone','bones','skeletal','skeleton','walking','weak legs','rickets'],
  why:'Fast-growing birds need calcium, phosphorus and vitamin D3 in balance — and much of the phosphorus in plant-based feed is locked in phytate the bird cannot use.',
  primary:[{name:'Calshell',reason:'Supplies calcium, phosphorus and vitamin D3 for better skeletal integrity.'}],
  also:[{name:'Phytomin Pro',reason:'Releases phytate-bound phosphorus and calcium already present in the feed.'}],
  ingredients:[{name:'Phytase',reason:'Increases available phosphorus in plant-based diets.'},{name:'Bacillus subtilis',reason:'Gut-health support for better nutrient and mineral absorption.'},{name:'Bacillus coagulans',reason:'Spore-forming probiotic for gut health in fast-growing birds.'}],
  track:['Incidence of leg problems','Culls for lameness','Body-weight gain'],
  caution:'Sudden lameness can also have infectious causes — involve your veterinarian.'},
 {id:'poor-fcr',label:'Poor FCR or slow weight gain',symptom:'Birds eat more feed for every kilo gained, or reach target weight late.',areas:['Broilers','Layers','Breeders'],
  keywords:['fcr','feed conversion','weight','gain','growth','slow','slow growth','underweight','feed efficiency','performance','body weight','target weight'],
  why:'When part of the feed passes through undigested — fibre, phytate, protein — or the gut is under stress, birds have to eat more for every kilo they gain.',
  primary:[{name:'Progrow',reason:'Multistrain probiotic with enzymes and yeast — improves FCR, helps body-weight gain and gives uniform growth.'},{name:'XP-Zyme',reason:'Xylanase and phytase blend that improves weight gain and feed efficiency.'}],
  also:[{name:'Livoshield',reason:'Herbal liver support for better FCR and growth.'}],
  ingredients:[{name:'Xylanase',reason:'Breaks down cereal fibre that traps nutrients.'},{name:'Protease',reason:'Improves protein digestibility.'},{name:'Phytase',reason:'Releases phytate-bound phosphorus.'},{name:'Amylase',reason:'Improves starch digestion for more energy from feed.'},{name:'Bacillus subtilis',reason:'Spore-forming probiotic that survives feed processing.'},{name:'Bacillus licheniformis',reason:'Spore-forming probiotic for gut-health blends.'},{name:'Lactobacillus acidophilus',reason:'Lactic acid bacteria for gut-flora balance.'},{name:'Saccharomyces cerevisiae',reason:'Yeast culture supporting digestibility.'}],
  track:['FCR','Average body weight vs target','Flock uniformity']},
 {id:'uneven-flock',label:'Uneven or non-uniform flock',symptom:'Wide spread of body weights within the same flock.',areas:['Broilers','Layers','Breeders'],
  keywords:['uneven','uniform','uniformity','variation','different sizes','small birds','spread'],
  why:'Uneven growth often traces back to differences in gut health and nutrient absorption between birds in the same house.',
  primary:[{name:'Progrow',reason:'Optimises gut health and nutrient absorption for uniform growth.'}],
  also:[{name:'XP-Zyme',reason:'Improves feed efficiency and weight gain across the flock.'}],
  ingredients:[{name:'Protease',reason:'Evens out protein digestion across the flock.'},{name:'Bacillus coagulans',reason:'Spore-forming probiotic strain for gut-health blends.'},{name:'Lactobacillus acidophilus',reason:'Lactic acid bacteria for gut-flora balance.'},{name:'Pediococcus acidilactici',reason:'Lactic acid bacteria used in poultry probiotics.'},{name:'Saccharomyces cerevisiae',reason:'Yeast culture supporting digestibility.'}],
  track:['Flock uniformity (CV%)','Average body weight','FCR']},
 {id:'gut-health-mortality',label:'Poor gut health or high mortality',symptom:'Loose droppings, poor gut condition or higher-than-expected mortality.',areas:['Broilers','Layers','Breeders'],
  keywords:['gut','intestine','mortality','death','dying','loose','droppings','diarrhea','diarrhoea','wet droppings','enteritis','digestion','immunity','disease','weak chicks'],
  why:'An unbalanced gut microflora lets harmful bacteria gain ground — hurting digestion, nutrient absorption and survivability.',
  primary:[{name:'Progrow',reason:'Optimises gut health, reduces mortality and gives supportive therapy for bacterial and viral diseases.'}],
  also:[{name:'Livoshield',reason:'Herbal liver protector that helps build immunity.'}],
  ingredients:[{name:'Bacillus subtilis',reason:'Spore-forming probiotic for feed or water.'},{name:'Bacillus coagulans',reason:'Spore-forming probiotic that tolerates feed processing.'},{name:'Lactobacillus acidophilus',reason:'Lactic acid bacteria for gut-flora balance.'},{name:'Enterococcus faecium',reason:'Lactic acid bacteria used in gut-health blends.'},{name:'Pediococcus acidilactici',reason:'Lactic acid bacteria that help exclude harmful bacteria.'},{name:'Clostridium butyricum',reason:'Butyrate-producing strain that supports the gut lining.'},{name:'Saccharomyces boulardii',reason:'Probiotic yeast supporting the gut lining and immunity.'}],
  track:['Weekly mortality %','Dropping and litter condition','FCR'],
  caution:'For an active disease outbreak, always involve your veterinarian first.'},
 {id:'ammonia-litter',label:'Ammonia smell or wet litter',symptom:'Strong ammonia in the shed, wet or caked litter.',areas:['Broilers','Layers','Breeders'],
  keywords:['ammonia','smell','odour','odor','litter','wet litter','caked','shed','house','nitrogen'],
  why:'Ammonia comes from nitrogen in droppings. Undigested protein and an unbalanced gut push more nitrogen into the litter.',
  primary:[{name:'Progrow',reason:'Reduces ammonia production in litter.'}],
  also:[{name:'Digesmo-Pro',reason:'Improves protein digestion and reduces nitrogen excretion.'}],
  ingredients:[{name:'Protease',reason:'Less undigested protein means less nitrogen excreted.'},{name:'Bacillus subtilis',reason:'Probiotic strain for gut and litter programmes.'},{name:'Bacillus licheniformis',reason:'Spore-forming strain for gut-health blends.'},{name:'Bacillus amyloliquefaciens',reason:'Spore-forming strain used in litter and environmental blends.'},{name:'Saccharomyces cerevisiae',reason:'Yeast culture supporting digestibility.'}],
  track:['Ammonia level in the house','Litter moisture','Foot-pad condition']},
 {id:'liver-stress',label:'Liver stress or low immunity',symptom:'Poor appetite and growth, weak response to vaccination, birds that look dull.',areas:['Broilers','Layers','Breeders'],
  keywords:['liver','fatty liver','immunity','immune','vaccination','vaccine','dull','appetite','stress','toxin','medication','antibiotic'],
  why:'The liver drives metabolism and detoxification. When it is under strain, appetite, growth and immunity all suffer.',
  primary:[{name:'Livoshield',reason:'Blend of six medicinal herbs for liver upgradation and protection, better FCR and immunity.'}],
  also:[{name:'Progrow',reason:'Supports gut health and digestibility alongside liver care.'}],
  ingredients:[{name:'Saccharomyces cerevisiae',reason:'Yeast culture supporting digestibility and immune function.'},{name:'Saccharomyces boulardii',reason:'Probiotic yeast supporting immunity.'},{name:'Bacillus coagulans',reason:'Spore-forming probiotic supporting gut health.'},{name:'Lactobacillus acidophilus',reason:'Lactic acid bacteria for gut-flora balance.'}],
  track:['Feed intake','Growth vs target','Vaccination response']},
 {id:'phosphorus-cost',label:'High DCP / phosphorus cost',symptom:'Feed cost pushed up by dicalcium or monocalcium phosphate inclusion.',areas:['Broilers','Layers','Breeders'],
  keywords:['dcp','mcp','phosphorus','phosphate','phytate','phytase','feed cost','cost','mineral','bone meal','expensive'],
  why:'Most of the phosphorus in grains and oilseeds is bound as phytate that birds cannot digest, so diets are topped up with costly inorganic phosphate.',
  primary:[{name:'Phytomin Pro',reason:'Micronised phytase (5,000 FTU/g) that reduces costly inorganic phosphorus and the cost of feed.'}],
  also:[{name:'XP-Zyme',reason:'Combines phytase with xylanase for added flexibility in diet formulation.'}],
  ingredients:[{name:'Phytase',reason:'Available at 100,000 to 200,000 FTU/g in powder or water-soluble form.'},{name:'Xylanase',reason:'Pairs with phytase to open up more of the feed’s nutrients.'}],
  track:['DCP / MCP inclusion per ton','Feed cost per ton','Bone and shell quality']},
 {id:'protein-cost',label:'High protein cost or poor protein digestion',symptom:'Expensive protein meals, or wanting to use cheaper protein sources without losing performance.',areas:['Broilers','Layers','Breeders'],
  keywords:['protein','soya','soybean','soy','meal','amino','amino acids','crude protein','cp','cheaper protein','protein cost'],
  why:'Protein is one of the most expensive parts of the feed, and any that is not digested is wasted and excreted as nitrogen.',
  primary:[{name:'Digesmo-Pro',reason:'Acid and alkaline protease blend that improves protein digestibility and lets lower-cost protein sources into the diet.'}],
  also:[],
  ingredients:[{name:'Protease',reason:'Available from 100,000 up to 1,000,000 U/g.'},{name:'Lactobacillus sporogenes',reason:'Spore-forming probiotic used in Digesmo-Pro.'},{name:'Bacillus subtilis',reason:'Probiotic strain that produces its own proteases.'},{name:'Bacillus licheniformis',reason:'Spore-forming strain known for protease production.'}],
  track:['Crude protein in the diet','Feed cost per ton','FCR']},
 {id:'high-fibre-diet',label:'High-fibre diets (wheat, rice bran, DDGS)',symptom:'Sticky droppings or lower performance on fibre-rich or by-product ingredients.',areas:['Broilers','Layers','Breeders'],
  keywords:['fibre','fiber','nsp','wheat','barley','rice bran','bran','ddgs','sticky','viscosity','by-product','byproduct','cellulose'],
  why:'Cereals and by-products contain non-starch polysaccharides (fibre) that trap nutrients and make gut contents sticky.',
  primary:[{name:'XP-Zyme',reason:'Thermostable xylanase breaks down hemicellulose in plant cell walls, plus phytase.'}],
  also:[],
  ingredients:[{name:'Xylanase',reason:'Targets arabinoxylans in wheat and other cereals.'},{name:'Beta-glucanase',reason:'Targets β-glucans in barley and oats.'},{name:'Beta-mannanase',reason:'Targets mannans in oilseed meals.'},{name:'Cellulase',reason:'Breaks down cellulose.'},{name:'Pectinase',reason:'Breaks down pectin in plant cell walls.'},{name:'Bacillus subtilis',reason:'Spore-forming probiotic that also produces fibre-degrading enzymes.'}],
  track:['Dropping consistency','FCR','Litter moisture']},
 {id:'water-quality',label:'Poor water quality or ammonia in ponds and effluent',symptom:'High ammonia or nitrite, foul odour or sludge in ponds, tanks or effluent.',areas:['Water & environment'],
  keywords:['water','pond','ponds','aqua','aquaculture','fish','shrimp','tank','effluent','sludge','nitrite','nitrate','waste','odour','smell'],
  why:'Ammonia, nitrite and organic load build up when nitrifying and degrading bacteria cannot keep up with the waste going in.',
  primary:[],also:[],
  ingredients:[{name:'Nitrosomonas sp.',reason:'Converts ammonia to nitrite.'},{name:'Nitrobacter sp.',reason:'Converts nitrite to nitrate.'},{name:'Rhodobacter sp.',reason:'Photosynthetic bacteria used in pond programmes.'},{name:'Bacillus subtilis',reason:'Degrades organic matter and sludge.'},{name:'Bacillus licheniformis',reason:'Degrades organic waste in ponds and effluent.'},{name:'Pseudomonas putida',reason:'Used in waste-treatment blends.'},{name:'Thiobacillus thioxidans',reason:'Oxidises sulphur compounds behind foul odour.'}],
  track:['Ammonia and nitrite levels','Dissolved oxygen','Sludge build-up']},
];

export const productByName=(name:string):Product|undefined=>products.find(p=>p.name===name);
export const productHref=(name:string)=>{const p=productByName(name);return p?`/products/${productSlug(p)}`:'/products'};
export const solutionsFor=(name:string)=>solutions.filter(s=>[...s.primary,...s.also].some(x=>x.name===name)||s.ingredients.some(x=>x.name===name));

// Free-text matching: score each problem by how many of its keywords appear in what the
// buyer typed, so "my eggs have thin shells" lands on weak egg shells.
export function matchSolutions(text:string){
 const q=` ${text.toLowerCase().replace(/[^a-z0-9%]+/g,' ')} `;
 if(!q.trim())return [];
 return solutions.map(s=>({s,score:s.keywords.reduce((n,k)=>n+(q.includes(` ${k} `)||(k.length>4&&q.includes(k))?k.split(' ').length:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).map(x=>x.s);
}
