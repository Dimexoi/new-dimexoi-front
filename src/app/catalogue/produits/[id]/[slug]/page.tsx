'use client'

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import Head from 'next/head';

import allCategoriesJson from '../../../../../data/categories.json';
import allProductsJson from '../../../../../data/products.json';
import allCollectionsJson from '../../../../../data/collections.json';

import { getOneProduct, setDisplayedProduct } from '@/redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCategoryToDisplay, setCollectionToDisplay } from '@/redux/features/categorySlice';
import Image from 'next/image';


// export async function generateStaticParams() {
 
//   return allProductsJson.map((product) => ({
//     id: product.id,
//     slug: product.slug
//   }))
// }



const Product = ({ params }: { params: { id: string, slug: string } }) => {
  const dispatch = useAppDispatch();

  const productsToDisplay = useAppSelector(state => state.product.productsToDisplay);
  const displayedProduct = useAppSelector(state => state.product.displayedProduct);
  const categoryToDisplay = useAppSelector(state => state.category.categoryToDisplay);
  const collectionToDisplay = useAppSelector(state => state.category.collectionToDisplay);

  useEffect(() => {
    if(params !== undefined) {
      
      if (productsToDisplay.length > 0) {

        let displayedProduct = productsToDisplay.find(product => product.slug === params.slug);
        let categoryToDisplay = allCategoriesJson.find(category => category.slug === params.slug);
        let collectionToDisplay = allCollectionsJson.find(collection => collection.slug === displayedProduct?.collectionSlug);
    
        if (displayedProduct) {
          dispatch(setDisplayedProduct(displayedProduct));
        } else {
          displayedProduct = {
            id: '',
            name: '',
            description: '',
            collectionSlug: '',
            slug: '',
            categoryName: '',
            categorySlug: '',
            images: []
          }
        }
    
        if (categoryToDisplay) {
    
          dispatch(setCategoryToDisplay(categoryToDisplay));
    
        } else {
          categoryToDisplay = {id: '', name: '', image: '', slug: ''}
        }
    
        if (collectionToDisplay) {
    
          dispatch(setCollectionToDisplay(collectionToDisplay));
    
        } else {
          collectionToDisplay = {name: '', image: '', slug: ''}
        }  
      } else {
        dispatch(getOneProduct(params.id))
      }
      
  
    } 
    
  }, [])

  

  return (
    <div className='h-100 flex flex-col min-h-full'>

      <Header home={false}/>

      <Head>
        <title>DIMEXOI : {displayedProduct.name}</title>
      </Head>

      <main className='flex-1 mb-4'>

        <h1 className='mt-3 text-center text-3xl font-poppins font-bold'>{displayedProduct.name}</h1>
        
        <div>
          <Carousel images={displayedProduct.images} category={displayedProduct.categorySlug}/>
          <p className='font-raleway font-light text-xs text-center'>*Peut être disponible en une finition différente de celle de la photo</p>
        </div>

        {displayedProduct.description !== "null" ?
        <div className='mt-3 px-4'>
          <h2 className='text-lg font-bold'>Description</h2>
          <p className='whitespace-pre-line mt-3'>{displayedProduct.description}</p>
        </div>
        : 
        <div/>
        }
        
        {displayedProduct.collectionSlug !== "" ?

          <div className='mt-3 px-4'>
            <h2 className='text-lg font-bold'>Les autres meubles de la collection</h2>
            <div className='relative flex justify-center items-center overflow-hidden mb-4 rounded-lg h-32'>

              <Link href={`/catalogue/collection/${collectionToDisplay.slug}`} className=''>
              <div className='h-full absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10'/>
                <Image src={`/images/collection/${displayedProduct.collectionSlug}.jpeg`}alt={`image collection ${collectionToDisplay.name}`} height='0' width='0' sizes='100vw' className='h-full w-auto'/>
              </Link>

              <h3 className='absolute text-white text-xl z-20'> {collectionToDisplay.name}</h3>

            </div>
          </div>
          :
          <div/>
        }

      </main>
    </div>
  )
}

export default Product;
