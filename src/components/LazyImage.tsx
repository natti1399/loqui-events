import React, { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, sizes, priority = false }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!src) return;

    // Try WebP first, fallback to original format
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Use Image constructor for preloading
    const testImage = new Image();
    
    const handleLoad = () => {
      if (isMounted) {
        setImageSrc(webpSrc);
        setIsLoaded(true);
      }
    };

    const handleError = () => {
      if (isMounted) {
        // Fallback to original format
        setImageSrc(src);
        setIsLoaded(true);
      }
    };

    testImage.onload = handleLoad;
    testImage.onerror = handleError;
    testImage.src = webpSrc;

    return () => {
      testImage.onload = null;
      testImage.onerror = null;
    };
  }, [src, isMounted]);

  if (!isLoaded) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
};

export default LazyImage;