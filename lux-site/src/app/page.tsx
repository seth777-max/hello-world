import Image from "next/image";
import Link from "next/link";
import { loadCatalog } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default async function Home() {
  const products = await loadCatalog();
  const featured = products.slice(0, 6);

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_10%_-20%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative px-8 py-20 md:px-16 md:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl tracking-tight font-medium leading-[1.05]">Timeless streetwear, reimagined</h1>
            <p className="mt-5 text-white/70 max-w-xl">
              An elevated curation of Lemonaed silhouettes, refined with luxury materials and a minimalist touch.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="/collection" className="px-5 py-3 rounded-full bg-white text-black text-sm font-medium hover:opacity-90">
                Explore Collection
              </Link>
              <a href="#featured" className="px-5 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5">
                View Highlights
              </a>
            </div>
          </div>
          <div className="md:w-1/2 w-full grid grid-cols-2 gap-4">
            {featured.slice(0, 4).map((p) => (
              <div key={p.id} className="aspect-square relative rounded-xl overflow-hidden bg-white/5">
                {p.images?.[0] && (
                  <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl tracking-widest text-white/70">FEATURED</h2>
          <Link href="/collection" className="text-sm text-white/70 hover:text-white">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              href={`/product/${p.handle}`}
              title={p.title}
              image={p.images?.[0]}
              price={formatINR(p.price_min)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
