import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadCatalog, Product } from "@/lib/catalog";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const products: Product[] = await loadCatalog();
  const product = products.find((p) => p.handle === handle);
  if (!product) return notFound();

  const firstImage = product.images?.[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {firstImage && (
            <Image src={firstImage} alt={product.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          )}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {product.images?.slice(0, 8).map((src, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
              <Image src={src} alt={`${product.title} ${i + 1}`} fill className="object-cover" sizes="(max-width:768px) 25vw, 10vw" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Link href="/collection" className="text-xs text-white/60 hover:text-white">← Back to collection</Link>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">{product.title}</h1>
        <p className="mt-2 text-white/70">{formatINR(product.price_min)}</p>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs text-white/60 mb-2">Select variant</p>
            <div className="flex flex-wrap gap-2">
              {(product.variants ?? []).map((v) => (
                <button
                  key={v.id}
                  disabled={!v.available}
                  className={`px-3 py-2 rounded-full border text-sm ${v.available ? "border-white/20 hover:bg-white/5" : "border-white/10 text-white/40 cursor-not-allowed"}`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full md:w-auto px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:opacity-90">
            Add to bag
          </button>
        </div>

        {product.description_html && (
          <div className="prose prose-invert prose-sm mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: product.description_html }} />
        )}
      </div>
    </div>
  );
}