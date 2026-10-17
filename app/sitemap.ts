import type {MetadataRoute} from 'next';
import {products,productSlug} from './products/data';

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time; NEXT_PUBLIC_SITE_URL overrides it
// once a custom domain (e.g. ahwanlab.com) is connected.
export const SITE_URL=process.env.NEXT_PUBLIC_SITE_URL||(process.env.VERCEL_PROJECT_PRODUCTION_URL?`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`:'http://localhost:3000');

export default function sitemap():MetadataRoute.Sitemap{
 return ['','/solutions','/products',...products.map(p=>`/products/${productSlug(p)}`)].map(path=>({url:`${SITE_URL}${path}`}));
}
