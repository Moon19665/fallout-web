"use client"

import { useState } from "react"

interface LoadingImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function LoadingImage({ src, alt, className = "", width, height }: LoadingImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && <div className="absolute inset-0 image-loading rounded-lg"></div>}

      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${hasError ? "hidden" : ""}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />

      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-lg">
          <div className="text-gray-400 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded"></div>
            <p className="text-sm">Image not found</p>
          </div>
        </div>
      )}
    </div>
  )
}
