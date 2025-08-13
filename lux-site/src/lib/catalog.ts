import fs from "node:fs/promises";
import path from "node:path";

export type ShopifyImage = {
  id: number;
  created_at: string;
  position: number;
  updated_at: string;
  product_id: number;
  variant_ids: number[];
  src: string;
  width: number;
  height: number;
};

export type ShopifyVariant = {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string | null;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: ShopifyImage | null;
  available: boolean;
  price: string; // string from Shopify, convert when needed
  grams: number;
  compare_at_price: string | null;
  position: number;
  product_id: number;
  created_at: string;
  updated_at: string;
};

export type ShopifyOption = {
  name: string;
  position: number;
  values: string[];
};

export type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  options: ShopifyOption[];
};

export async function loadCatalog(): Promise<ShopifyProduct[]> {
  const filePath = path.join(process.cwd(), "public", "data", "catalog.json");
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);
  return parsed.products as ShopifyProduct[];
}

export function getProductMinPrice(product: ShopifyProduct): number {
  const prices = (product.variants || []).map((v) => parseFloat(v.price || "0"));
  return prices.length ? Math.min(...prices) : 0;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}