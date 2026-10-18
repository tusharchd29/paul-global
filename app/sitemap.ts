import type {MetadataRoute} from 'next';
import {products,productSlug} from './products/data';

// Canonical address used in the sitemap, robots.txt and social previews. NEXT_PUBLIC_SITE_URL
// can override it (e.g. for a staging domain).
export const SITE_URL=process.env.NEXT_PUBLIC_SITE_URL||'https://www.ahwanlab.com';

export default function sitemap():MetadataRoute.Sitemap{
 return ['','/solutions','/products','/export',...products.map(p=>`/products/${productSlug(p)}`)].map(path=>({url:`${SITE_URL}${path}`}));
}
