import React from 'react';

import 'react-before-after-slider-component/dist/build.css';

import InfosFrame from '@/components/InfosFrame';
import Slider from '@/components/Slider';

const FIRST_IMAGE = {
  imageUrl: '/images/home/news/cordoba.jpg'
};
const SECOND_IMAGE = {
  imageUrl: '/images/home/news/stickley.jpg'
};

const frameTexts = ['Modélisation 3D sur rendez-vous', 'Conseils', 'Demande de devis', 'Livraison', 'Montage']

const CustomMade = () => {
  return (
    <section className='mt-4'>

          <h3 className='text-3xl text-[#528BA8] font-raleway font-bold text-center'>Un meuble sur mesure en teck</h3>

          <p className='mt-1 px-6 py-3 text-justify'>Si vous ne trouvez pas votre bonheur, nous proposons également un service sur-mesure . C&apos;est vous qui créez votre propre mobilier, afin qu&apos;il soit unique et d&apos;épouser les dimensions de votre espace.</p>      
          
          <div className='flex flex-col md:flex-row'>
            <div>

              <Slider/>
            </div>
  
            <div className='bg-gray-400 p-5 text-center'>

              <h4 className='mb-4 text-lg'>Les étapes pour du sur-mesure</h4>

              <InfosFrame
                texts={frameTexts}
              />

              <p className='inline-block mb-2 px-4 py-2 bg-white text-black mt-4'>En savoir plus</p>

            </div>
          </div>

        </section>
  )
}

export default CustomMade;
