import fs from "node:fs/promises";
import path from "node:path";

export type Variant = {
  id: number;
  title: string;
  available: boolean;
  price: number;
  option1?: string | null;
  option2?: string | null;
};

export type Product = {
  id: number;
  handle: string;
  title: string;
  price_min: number;
  images: string[];
  description_html?: string;
  variants: Variant[];
};

export async function loadCatalog(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "public", "data", "catalog.json");
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);
  return parsed.products as Product[];
}