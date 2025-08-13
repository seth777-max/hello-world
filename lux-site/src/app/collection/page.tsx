import Image from "next/image";
import Link from "next/link";
import { loadCatalog } from "@/lib/catalog";

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
          <Link key={p.id} href={`/product/${p.handle}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5">
              {p.images?.[0] && (
                <Image src={p.images[0]} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
              )}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm tracking-wide">{p.title}</p>
              <span className="text-sm text-white/70">{formatINR(p.price_min)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}