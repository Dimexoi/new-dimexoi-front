'use client'

import ReactBeforeSliderComponent from 'react-before-after-slider-component';

const FIRST_IMAGE = {
  imageUrl: '/images/home/news/cordoba.jpg'
};
const SECOND_IMAGE = {
  imageUrl: '/images/home/news/stickley.jpg'
};

const Slider = () => {
    return(
      <div className='h-50 overflow-hidden'>
        <ReactBeforeSliderComponent
          firstImage={FIRST_IMAGE}
          secondImage={SECOND_IMAGE}
        />
      </div>
    )
}
export default Slider;
