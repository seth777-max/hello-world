import Image from "next/image";
import Link from "next/link";
import { loadCatalog } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default async function CollectionPage() {
  const products = await loadCatalog();
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Collection</h1>
          <p className="text-white/60 mt-2">Luxury reinterpretation of Lemonaed essentials</p>
        </div>
        <p className="text-sm text-white/60">{products.length} items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            href={`/product/${p.handle}`}
            title={p.title}
            image={p.images?.[0]}
            price={formatINR(p.price_min)}
          />
        ))}
      </div>
    </div>
  );
}