import React, { Suspense } from 'react';

import Header from '@/components/Header';
import Head from 'next/head';

import allCategoriesJson from '@/data/categories.json';
import allCollectionsJson from '@/data/categories.json';
import { findProductPerCategory, setProductsToDisplay } from '@/redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCategoryToDisplay, setCollectionToDisplay } from '@/redux/features/categorySlice';
import Image from 'next/image';
import ItemList from '@/components/ItemList';
import { store } from '@/redux/store';

export async function generateStaticParams() {
 
  return allCollectionsJson.map((collection) => ({
    slug: collection.slug,
  }))
}

async function getCollectionProducts(slug: string) {
  const res = await fetch('http://localhost:3000/api/products/collection', {
    method: 'POST',
    body: slug
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

async function findCollections(collectionSlug: string) {
  const collectionToDisplayJson = allCollectionsJson.find(collection => collection.slug === collectionSlug)
  if (collectionToDisplayJson) {
    store.dispatch(setCollectionToDisplay(collectionToDisplayJson))
    return collectionToDisplayJson
  }
}

const Collection = async ({ params }: { params: { slug: string } }) => {
  const collectionToDisplay = await findCollections(params.slug)
  if (collectionToDisplay !== undefined) {
    const promiseProduct = getCollectionProducts(collectionToDisplay.slug)
    // const productJsx = productsToDisplay.map((product, index) => (
    //   <div key={index} className='mb-3'>

    //     <Link href={`/catalogue/produits/${product.id}/${product.slug}`}>
        
    //       <div className='w-full'>

    //         <Image src={`/images/product/${categoryToDisplay.slug}/${product.images[0]}`} alt={`image ${product.name}`} height='0' width='0' sizes='100vw' className='w-full h-auto'/>
    //       </div>
    //       <h3 className='font-poppins font-medium text-lg'>{product.name}</h3>
    //     </Link>

    //   </div>
    // ))

    return (
      <div className='h-100 flex flex-col min-h-full mb-4'>
        <Header home={false}/>
        <Head>
          <title>DIMEXOI : Les meubles pour votre {collectionToDisplay.name}</title>
        </Head>
        <main className='flex-1 p-4'>

          <h1 className='text-center text-3xl font-poppins font-bold'>{collectionToDisplay.name}</h1>
          <div className='mt-4'>
          <Suspense fallback={<img src='/images/loading.gif' alt='loading image'/>}>
            <ItemList
              getData={promiseProduct}
              categorySlug={params.slug}
            />
          </Suspense>

          </div>

        </main>
      </div>
    )
  }
  
}

export default Collection;
