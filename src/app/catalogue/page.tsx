'use client'

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Header from '@/components/Header';

import { setAllCategories, setAllCollections } from '@/redux/features/categorySlice';
import { findSomeSdbProducts, getCategories } from '@/redux/features/productSlice';

import allCategoriesJson from '@/data/categories.json';
import allCollectionsJson from '@/data/collections.json';

// export interface MyProps {
//   allCategories : {
//     name: string,
//     imageLink: string
//   }[],
// }

export default function Catalogue() {

  const dispatch = useAppDispatch();

  const allCategories = useAppSelector(state => state.category.allCategories);
  const sdbProducts = useAppSelector(state => state.product.sdbProducts);
  const allCollections = useAppSelector(state => state.category.allCollections);

  useEffect(() => {

    dispatch(findSomeSdbProducts());
    dispatch(getCategories());
    dispatch(setAllCategories(allCategoriesJson));
    dispatch(setAllCollections(allCollectionsJson));
    
  }, [dispatch])

  const categoriesJsx = allCategories.map((category, index) => (
    <div key={index} className='relative flex justify-center items-center w-[48%] h-24 overflow-hidden mb-4 rounded-lg'>
      <Link href= {`/catalogue/categorie/${category.slug}`} className='flex justify-center items-center'>
        <div className='h-full absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10'/>
        <div>

          <Image src={`/images/category/${category.slug}.jpeg`} alt={`image ${category.name}`} width='0' height='0' sizes='100vw' className='w-full h-auto'/>
          
        </div>
        <h3 className='absolute text-white z-20'>{category.name}</h3>
      </Link>
      
    </div>
  ));

  const sdbJsx = sdbProducts.map((product, index) => (
    <div key={index} className='mt-2'>
      <Link href={`/catalogue/produit/${product.slug}`}>

        <Image src={`/images/product/salle-de-bains/${product.images[0]}.jpg`} alt={`image ${product.name}`} width='0' height='0' sizes='100vw' className='w-auto'/>
        <h3 className='font-bold'>{product.name}</h3>
        {/* <span className='text-sm text-gray-500'>{product.dimensions}</span> */}
      </Link>
      
    </div>
  ))

  const collectionssJsx = allCollections.map((collection, index) => (
    <div key={index} className='relative flex justify-center items-center w-[48%] aspect-h-1 aspect-w-2 overflow-hidden mb-4 rounded-lg'>
      <Link href={`/catalogue/collection/${collection.slug}`} className=''>
      <div className='h-full absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10'/>

      
        <div className='h-full '>

          <Image src={`/images/collection/${collection.slug}.jpeg`} alt={`image ${collection.name}`} width='0' height='0' sizes='100vw' className='w-auto h-full'/>
        </div>
        <h3 className='absolute left-[35%] top-[2%] text-white z-20'>{collection.name}</h3>
      </Link>
      
    </div>
  ));

  return (
    <div className='h-100'>

      <Head>
        <title>DIMEXOI : Catalogue de produits</title>
      </Head>

      <Header home={false}/>

      <main className='p-4'>

        <h1 className='text-center text-3xl font-poppins font-bold'>Catalogue</h1>

        <h2 className='mt-4 text-2xl text-[#528BA8] font-raleway font-bold'>Toutes les categories</h2>

        <div className='flex flex-wrap justify-between mt-4'>

          {categoriesJsx}

        </div>

        <div className='flex flex-col items-center'>

          <h2 className='mt-4 text-2xl text-[#528BA8] font-raleway font-bold self-start'>Meubles de salle de bains</h2>
          
          <div>

            {sdbJsx}

          </div>

          <Link href='/catalogue/categorie/salle-de-bains' className='inline-block mt-4 border-2 border-black px-5 py-2 text-lg'>Tous le mobilier de salle de bains</Link>
        </div>

        <h2 className='mt-4 text-2xl text-[#528BA8] font-raleway font-bold'>Nos collections</h2>
        
        <div className='flex flex-wrap justify-between mt-4'>

          {collectionssJsx}

        </div>
        
      </main>
    
    </div>
  )
}