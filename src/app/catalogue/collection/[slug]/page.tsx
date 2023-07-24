'use client'

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

import allCategoriesJson from '@/data/categories.json';
import allProductsJson from '@/data/products.json';
import allCollectionsJson from '@/data/collections.json';

import { setProductsToDisplay } from '@/redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCategoryToDisplay, setCollectionToDisplay } from '@/redux/features/categorySlice';
import Image from 'next/image';

export async function generateStaticParams() {
 
  return allCollectionsJson.map((collection) => ({
    slug: collection.slug,
  }))
}


const Collection = ({ params }: { params: { slug: string } }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(params !== undefined) {    
    
        const collectionToDisplay = allCollectionsJson.find(collection => collection.slug === params.slug);
        const productsToDisplay = allProductsJson.filter(product => product.collectionSlug === params.slug);
    
        if(collectionToDisplay) dispatch(setCollectionToDisplay(collectionToDisplay));
        dispatch(setProductsToDisplay(productsToDisplay));
        
      }
  
  }, [])

  const collectionToDisplay = useAppSelector(state => state.category.collectionToDisplay);
  const productsToDisplay = useAppSelector(state => state.product.productsToDisplay);

  const productJsx = productsToDisplay.map((product, index) => (
    <div key={index} className='mb-3'>

      <Link href={`/catalogue/produits/${product.slug}`}>
      
        <div className='w-full'>

          <Image src={product.images[0]} alt={`image ${product.name}`} height='0' width='0' sizes='100vw' className='w-full h-auto'/>
        </div>
        <h3 className='font-poppins font-medium text-lg'>{product.name}</h3>
      </Link>

    </div>
  ))

  return (
    <div className='h-100 flex flex-col min-h-full'>

      <Header home={false}/>

      <Head>
        <title>DIMEXOI : La collection {collectionToDisplay.name}</title>
      </Head>

      <main className='flex-1 p-4'>

        <h1 className='text-center text-3xl font-poppins font-bold'>{collectionToDisplay.name}</h1>

        <div>
          {productJsx}
        </div>
      </main>
    </div>
  )
}

export default Collection;
