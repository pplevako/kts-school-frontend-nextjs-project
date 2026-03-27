'use client';

import cx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

import styles from './ImageGallery.module.scss';

type ImageGalleryProps = {
  images: { url: string; alternativeText: string | null }[];
  className?: string;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  if (images.length === 0) return null;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection('left');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setDirection('right');
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentImage = images[currentIndex];

  return (
    <div className={cx(styles.gallery, className)}>
      <div className={styles.imageContainer}>
        <Image
          key={currentIndex}
          src={currentImage.url}
          alt={currentImage.alternativeText || 'Product image'}
          fill
          style={{ objectFit: 'cover' }}
          priority={currentIndex === 0}
          className={cx(styles.image, {
            [styles.slideLeft]: direction === 'left',
            [styles.slideRight]: direction === 'right',
          })}
          onAnimationEnd={() => setDirection(null)}
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            className={cx(styles.navButton, styles.navButtonLeft)}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous image"
          >
            <ArrowLeftIcon />
          </button>
          <button
            className={cx(styles.navButton, styles.navButtonRight)}
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
            aria-label="Next image"
          >
            <ArrowRightIcon />
          </button>

          <div className={styles.indicators}>
            {images.map((_, index) => (
              <button
                key={index}
                className={cx(styles.indicator, {
                  [styles.indicatorActive]: index === currentIndex,
                })}
                onClick={() => {
                  setDirection(index > currentIndex ? 'right' : 'left');
                  setCurrentIndex(index);
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
