import React, { Suspense } from 'react';

import Header from '@/components/Header';



import allCategoriesJson from '../../../../../data/categories.json';
import allCollectionsJson from '../../../../../data/collections.json';

import { getOneProduct, setDisplayedProduct } from '@/redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCategoryToDisplay, setCollectionToDisplay } from '@/redux/features/categorySlice';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { store } from '@/redux/store';

async function findOneProduct(id: string) {
  // await store.dispatch(getOneProduct(id))
  const res = await fetch('http://localhost:3000/api/products/getone', {
    method: 'POST',
    body: id
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

async function findCategories(categorySlug: string) {
  const categoryToDisplayJson = allCategoriesJson.find(category => category.slug === categorySlug)
  if (categoryToDisplayJson) {
    store.dispatch(setCategoryToDisplay(categoryToDisplayJson))
  }
}

async function findCollections(collectionSlug: string) {
  const collectionToDisplay = allCollectionsJson.find(collection => collection.slug === collectionSlug)
  if (collectionToDisplay) {
    store.dispatch(setCollectionToDisplay(collectionToDisplay))
  }
}

const Product = async ({ params }: { params: { id: string, slug: string } }) => {

  const promiseProduct = findOneProduct(params.id)

  const state = store.getState()
  const {displayedProduct} = state.product

  return (
    <div className='h-100 flex flex-col min-h-full'>

      <Header home={false}/>

      
      <Suspense fallback={<img src='/images/loading.gif' alt='loading image'/>}>
        <ProductCard
          getData={promiseProduct}
          getCategory={findCategories}
          getCollection={findCollections}
        />
      </Suspense>
     
    </div>
  )
}

export default Product;
