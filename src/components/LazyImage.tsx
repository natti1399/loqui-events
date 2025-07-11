import React, { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!src) return;

    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const img = new Image();

    const handleLoad = () => {
      if (isMounted) {
        setImageSrc(webpSrc);
        setIsLoaded(true);
      }
    };

    const handleError = () => {
      if (isMounted) {
        setImageSrc(src);
        setIsLoaded(true);
      }
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = webpSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
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
      loading="lazy"
      decoding="async"
    />
  );
};

export default LazyImage;