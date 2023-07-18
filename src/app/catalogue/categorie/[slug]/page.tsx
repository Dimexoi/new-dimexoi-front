'use client'

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

import allCategoriesJson from '@/data/categories.json';
import allProductsJson from '@/data/products.json';
import { setProductsToDisplay } from '@/redux/features/productSlice';
import { useAppSelector } from '@/redux/hooks';
import { setCategoryToDisplay } from '@/redux/features/categorySlice';
import Image from 'next/image';

export async function generateStaticParams() {
 
  return allCategoriesJson.map((category) => ({
    slug: category.slug,
  }))
}

// export const getStaticPaths = () => {
//   const paths = allCategories.map(category => ({
//     params: { slug : category.slug},
//   }));

//   return { paths, fallback: false}
// }

// export const getStaticProps = wrapper.getStaticProps(store => async ({params}) => {

//   if(params !== undefined) {

//     const productsToDisplay = allProducts.filter(product => product.categorySlug === params.slug);
//     let categoryToDisplay = allCategories.find(category => category.slug === params.slug);

//     store.dispatch(setProductsToDisplay(productsToDisplay));

//     if (categoryToDisplay) {

//       store.dispatch(setCategoryToDisplay(categoryToDisplay));

//     } else {
//       categoryToDisplay = {name: '', image: '', slug: ''}
//     }

//     return {
//       props: {
//         productsToDisplay,
//         categoryToDisplay
//       },
//       revalidate: 60
//     };

//   } else {

//     return {
//       props: {
//         productsToDisplay: [],
//         categoryToDisplay: {name: '', image: '', slug: ''}
//       }
//     }

//   }

// })

const Category = ({ params }: { params: { slug: string } }) => {
  

  useEffect(() => {
    if(params !== undefined) {

    const productsToDisplay = allProducts.filter(product => product.categorySlug === params.slug);
    let categoryToDisplay = allCategories.find(category => category.slug === params.slug);

    store.dispatch(setProductsToDisplay(productsToDisplay));

    if (categoryToDisplay) {

      store.dispatch(setCategoryToDisplay(categoryToDisplay));

    } else {
      categoryToDisplay = {name: '', image: '', slug: ''}
    }

    return {
      props: {
        productsToDisplay,
        categoryToDisplay
      },
      revalidate: 60
    };

  } else {

    return {
      props: {
        productsToDisplay: [],
        categoryToDisplay: {name: '', image: '', slug: ''}
      }
    }

  }
  }, [])

  const productsToDisplay = useAppSelector(state => state.product.productsToDisplay);
  const categoryToDisplay = useAppSelector(state => state.category.categoryToDisplay);

  const productJsx = productsToDisplay.map((product, index) => (
    <div key={index} className='mb-3'>

      <Link href={`/catalogue/produit/${product.slug}`}>
      
        <div className='w-full'>

          <Image src={product.images[0]} alt={`image ${product.name}`} height='0' width='0' sizes='100vw' className='w-full h-auto'/>
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
      <Footer/>
    </div>
  )
}

export default Category;
