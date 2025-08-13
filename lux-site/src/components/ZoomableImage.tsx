'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'

export type ZoomableImageProps = {
  src: string
  alt: string
  className?: string
  sizes?: string
  zoomScale?: number
  rounded?: string
}

export default function ZoomableImage({
  src,
  alt,
  className,
  sizes,
  zoomScale = 2.4,
  rounded = 'rounded-xl',
}: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [origin, setOrigin] = useState<'center center' | string>('center center')

  const updateOrigin = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setOrigin(`${x}% ${y}%`)
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isZoomed) updateOrigin(e)
    },
    [isZoomed, updateOrigin]
  )

  const toggleZoom = useCallback(() => {
    setIsZoomed((z) => !z)
  }, [])

  const onLeave = useCallback(() => {
    setIsZoomed(false)
    setOrigin('center center')
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${rounded} ${className ?? ''}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      onClick={toggleZoom}
      role="button"
      aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        draggable={false}
        className="object-cover select-none"
        style={{
          transform: `scale(${isZoomed ? zoomScale : 1})`,
          transformOrigin: origin,
          transition: 'transform 300ms ease-out, transform-origin 150ms ease-out',
          willChange: 'transform',
          cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        }}
      />
    </div>
  )
}