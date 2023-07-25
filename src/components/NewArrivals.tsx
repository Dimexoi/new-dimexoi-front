import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cordoba from '../../public/images/home/news/cordoba.jpg';
import machine from '../../public/images/home/news/machine.jpg';
import riviera from '../../public/images/home/news/riviera.jpg';
import stickley from '../../public/images/home/news/stickley.jpg';

const NewArrivals = () => {
  return (
    <section className='text-center mb-2'>
      <div className='flex flex-col p-3 h-80'>
        <h3 className='text-3xl text-center text-[#528BA8] font-raleway font-bold'>Les nouveautés</h3>
        <div className='flex overflow-x-scroll h-full mt-3 pb-5'>

          <Image src={cordoba} alt='Lit cordoba' className='mr-6 w-auto border-gray-300 border-2 shadow-lg rounded-lg'/>
          <Image src={machine} alt='Machine' className='mr-6 h-full w-auto border-gray-300 border-2 shadow-lg rounded-lg'/>
          <Image src={riviera} alt='Riviera' className='mr-6 h-full w-auto border-gray-300 border-2 shadow-lg rounded-lg'/>
          <Image src={stickley} alt='stickley' className='h-full w-auto border-gray-300 border-2 shadow-lg rounded-lg'/>

        </div>
      </div>
    
        <Link href='/catalogue' className='inline-block mt-4 text-center border-2 border-black px-5 py-2 text-lg rounded-lg'> Tous les produits</Link>
        
    </section>
  )
}

export default NewArrivals;
