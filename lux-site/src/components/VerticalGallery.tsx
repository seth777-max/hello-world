'use client'

import ZoomableImage from '@/components/ZoomableImage'

export type VerticalGalleryProps = {
  images: string[]
  alt: string
}

export default function VerticalGallery({ images, alt }: VerticalGalleryProps) {
  if (!images?.length) return null
  return (
    <div className="max-h-[80vh] overflow-y-auto pr-1 snap-y snap-mandatory space-y-3">
      {images.map((src, i) => (
        <div key={i} className="relative aspect-[4/5] snap-start">
          <ZoomableImage src={src} alt={`${alt} ${i + 1}`} sizes="(max-width:768px) 100vw, 50vw" />
        </div>
      ))}
    </div>
  )
}