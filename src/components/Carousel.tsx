import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCarouselImageIndex, setCarouselTouchStart } from '@/redux/features/configSlice';
import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {

  const dispatch = useAppDispatch();

  const touchStartX = useAppSelector(state => state.config.carouselTouchStart);
  const currentIndex = useAppSelector(state => state.config.carouselImageIndex);
  const currentImage = images[currentIndex];

  const handleImageClick = (index: number) => {
    dispatch(setCarouselImageIndex(index));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dispatch(setCarouselTouchStart(e.touches[0].clientX));
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const threshold = 50;

    if (deltaX > threshold && currentIndex > 0) {

      dispatch(setCarouselImageIndex(currentIndex - 1));

    } else if (deltaX < -threshold && currentIndex < images.length - 1) {

      dispatch(setCarouselImageIndex(currentIndex + 1));
      
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-96 w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <img
            key={index}
            className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            src={image}
            alt={`Image ${index}`}
          />
        ))}
      </div>

      <div className="flex mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            className={`h-12 w-12 object-cover mx-2 ${
              index === currentIndex ? 'border-2 border-blue-500' : ''
            }`}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;