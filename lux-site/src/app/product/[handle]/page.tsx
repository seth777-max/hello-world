import Link from "next/link";
import { notFound } from "next/navigation";
import { loadCatalog, ShopifyProduct, formatINR, getProductMinPrice } from "@/lib/catalog";
import VerticalGallery from "@/components/VerticalGallery";

function toDate(s: string) {
  try {
    return new Date(s).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return s
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const products: ShopifyProduct[] = await loadCatalog();
  const product = products.find((p) => p.handle === handle);
  if (!product) return notFound();

  const minPrice = getProductMinPrice(product);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.body_html?.replace(/<[^>]+>/g, '')?.slice(0, 500),
    image: product.images?.map((i) => i.src) ?? [],
    brand: product.vendor,
    sku: product.variants?.[0]?.sku || undefined,
    offers: product.variants?.map((v) => ({
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: v.price,
      availability: v.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    })),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-4">
        <VerticalGallery images={(product.images ?? []).map((i) => i.src)} alt={product.title} />
      </div>

      <div>
        <Link href="/collection" className="text-xs text-white/60 hover:text-white">← Back to collection</Link>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">{product.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
          <span>ID: <span className="text-white/80">{product.id}</span></span>
          <span className="opacity-50">/</span>
          <span>Handle: <span className="text-white/80">{product.handle}</span></span>
        </div>

        <div className="mt-2 flex items-center gap-3 text-sm text-white/70">
          <span>{product.vendor?.trim()}</span>
          <span className="opacity-50">/</span>
          <span>{product.product_type || 'Apparel'}</span>
        </div>

        <p className="mt-3 text-white/80">{formatINR(minPrice)}</p>

        {product.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="px-2 py-1 rounded-full border border-white/10 text-xs text-white/60">{t}</span>
            ))}
          </div>
        ) : null}

        {product.options?.length ? (
          <div className="mt-6 space-y-3">
            {product.options.map((opt) => (
              <div key={opt.name}>
                <p className="text-xs text-white/60 mb-1">{opt.name}</p>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((val) => (
                    <span key={val} className="px-3 py-2 rounded-full border border-white/15 text-sm text-white/80">{val}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {product.variants?.length ? (
          <div className="mt-8">
            <p className="text-xs text-white/60 mb-2">Variants</p>
            <div className="overflow-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[900px] text-sm">
                <thead className="bg-white/5 text-left">
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Option 1</th>
                    <th className="px-4 py-2">Option 2</th>
                    <th className="px-4 py-2">SKU</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Compare At</th>
                    <th className="px-4 py-2">Taxable</th>
                    <th className="px-4 py-2">Shipping</th>
                    <th className="px-4 py-2">Weight (g)</th>
                    <th className="px-4 py-2">Available</th>
                    <th className="px-4 py-2">Created</th>
                    <th className="px-4 py-2">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((v) => (
                    <tr key={v.id} className="odd:bg-white/5">
                      <td className="px-4 py-2">{v.title}</td>
                      <td className="px-4 py-2">{v.option1 ?? '-'}</td>
                      <td className="px-4 py-2">{v.option2 ?? '-'}</td>
                      <td className="px-4 py-2">{v.sku || '-'}</td>
                      <td className="px-4 py-2">{formatINR(parseFloat(v.price || '0'))}</td>
                      <td className="px-4 py-2">{v.compare_at_price ? formatINR(parseFloat(v.compare_at_price)) : '-'}</td>
                      <td className="px-4 py-2">{v.taxable ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-2">{v.requires_shipping ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-2">{v.grams}</td>
                      <td className="px-4 py-2">{v.available ? 'In stock' : 'Out of stock'}</td>
                      <td className="px-4 py-2">{toDate(v.created_at)}</td>
                      <td className="px-4 py-2">{toDate(v.updated_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white/60">
          <div className="rounded-lg border border-white/10 p-3">Created: <span className="text-white/80">{toDate(product.created_at)}</span></div>
          <div className="rounded-lg border border-white/10 p-3">Published: <span className="text-white/80">{toDate(product.published_at)}</span></div>
          <div className="rounded-lg border border-white/10 p-3">Updated: <span className="text-white/80">{toDate(product.updated_at)}</span></div>
        </div>

        {product.body_html && (
          <div className="prose prose-invert prose-sm mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: product.body_html }} />
        )}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
    </div>
  );
}