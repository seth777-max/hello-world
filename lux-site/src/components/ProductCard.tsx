import Link from "next/link";
import ZoomableImage from "@/components/ZoomableImage";

export type ProductCardProps = {
  href: string;
  title: string;
  image?: string;
  price: string;
};

export default function ProductCard({ href, title, image, price }: ProductCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 ease-out group-hover:-translate-y-1">
        {image && (
          <ZoomableImage src={image} alt={title} sizes="(max-width:768px) 100vw, 33vw" />
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm tracking-wide">{title}</p>
        <span className="text-sm text-white/70">{price}</span>
      </div>
    </Link>
  );
}