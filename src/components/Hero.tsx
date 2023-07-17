import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <div className='flex items-center justify-center h-4/5 bg-[center_right_-6rem] md:bg-[center_right] bg-no-repeat bg-cover custom-img bg-fixed'>
      <div className='h-4/5 absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-10'/>
      <div className='p-5 text-white z-10'>

        <h2 className='flex flex-col'>

          <span className='text-3xl font-bold font-poppins mb-4'>Trouvez votre meuble en teck</span>
          <span className='text-xl font-light mb-4'>Ou imaginez le en sur mesure</span>
          

        </h2>

        <Link href='/catalogue' className='inline-block mt-4 text-center border-2 border-white px-3 py-2 text-lg rounded-lg hover:text-xl hover:text-[#528BA8] hover:font-bold hover:border-[#528BA8]'>Catalogue</Link>
        
      </div>
    </div>
  )
}

export default Hero;
