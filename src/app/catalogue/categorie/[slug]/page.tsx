'use client'

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

import allCategoriesJson from '@/data/categories.json';
import allProductsJson from '@/data/products.json';
import { findProductPerCategory, setProductsToDisplay } from '@/redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCategoryToDisplay } from '@/redux/features/categorySlice';
import Image from 'next/image';

export async function generateStaticParams() {
 
  return allCategoriesJson.map((category) => ({
    slug: category.slug,
  }))
}

const Category = ({ params }: { params: { slug: string } }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(params !== undefined) {
    
      
    const productsToDisplay = allProductsJson.filter(product => product.categorySlug === params.slug);
    let categoryToDisplay = allCategoriesJson.find(category => category.slug === params.slug);
    if (categoryToDisplay) dispatch(findProductPerCategory(categoryToDisplay.id))
    
    // dispatch(setProductsToDisplay(productsToDisplay));

    if (categoryToDisplay) {

      dispatch(setCategoryToDisplay(categoryToDisplay));

    } else {
      categoryToDisplay = {id: '', name: '', image: '', slug: ''}
    }

    

  } 
  }, [params, dispatch])

  const productsToDisplay = useAppSelector(state => state.product.productsToDisplay);
  const categoryToDisplay = useAppSelector(state => state.category.categoryToDisplay);

  const productJsx = productsToDisplay.map((product, index) => (
    <div key={index} className='mb-3'>

      <Link href={`/catalogue/produits/${product.id}/${product.slug}`}>
      
        <div className='w-full'>

          <Image src={`/images/product/${categoryToDisplay.slug}/${product.images[0]}.jpg`} alt={`image ${product.name}`} height='0' width='0' sizes='100vw' className='w-full h-auto'/>
        </div>
        <h3 className='font-poppins font-medium text-lg'>{product.name}</h3>
      </Link>

    </div>
  ))

  return (
    <div className='h-100 flex flex-col min-h-full mb-4'>
      <Header home={false}/>
      <Head>
        <title>DIMEXOI : Les meubles pour votre {categoryToDisplay.name}</title>
      </Head>
      <main className='flex-1 p-4'>

        <h1 className='text-center text-3xl font-poppins font-bold'>{categoryToDisplay.name}</h1>
        <div className='mt-4'>
          {productJsx}
        </div>

      </main>
    </div>
  )
}

export default Category;
