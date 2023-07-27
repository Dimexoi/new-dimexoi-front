import Link from 'next/link'
import Image from 'next/image'

import Head from 'next/head'

import Carousel from '@/components/Carousel';
import { store } from '@/redux/store';
import { setDisplayedProduct } from '@/redux/features/productSlice';


type Product = {
  id: string,
  name: string,
  description: string,
  slug: string,
  categoryName: string,
  categorySlug: string,
  images: string[],
  collectionSlug: string
  collectionName: string
}

type PropsType = {
  getData: Promise<Product>,
  getCategory: Function
  getCollection: Function
}
export default async function ProductCard({ getData, getCategory, getCollection}: PropsType) {

  const product = await getData
  store.dispatch(setDisplayedProduct(product))
  await getCollection()
  await getCategory(product.categorySlug)

  const state = store.getState()

  const {categoryToDisplay} = state.category
  const {collectionToDisplay} = state.category
  
  
  return (
    <div>
      <Head>
        <title>DIMEXOI : {product.name}</title>
      </Head>
      <main className='flex-1 mb-4'>

        <h1 className='mt-3 text-center text-3xl font-poppins font-bold'>{product.name}</h1>

        <div>
          <Carousel images={product.images} category={product.categorySlug}/>
          <p className='font-raleway font-light text-xs text-center'>*Peut être disponible en une finition différente de celle de la photo</p>
        </div>

        {product.description !== "null" ?
        <div className='mt-3 px-4'>
          <h2 className='text-lg font-bold'>Description</h2>
          <p className='whitespace-pre-line mt-3'>{product.description}</p>
        </div>
        : 
        <div/>
        }

        {product.collectionSlug ?

          <div className='mt-3 px-4'>
            <h2 className='text-lg font-bold'>Les autres meubles de la collection</h2>
            <div className='relative flex justify-center items-center overflow-hidden mb-4 rounded-lg h-32'>

              <Link href={`/catalogue/collection/${product.collectionSlug}`} className=''>
              <div className='h-full absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10'/>
                <Image src={`/images/collection/${product.collectionSlug}.jpeg`}alt={`image collection ${product.name}`} height='0' width='0' sizes='100vw' className='h-full w-auto'/>
              </Link>

              <h3 className='absolute text-white text-xl z-20'> {product.collectionName}</h3>

            </div>
          </div>
          :
          <div/>
        }

      </main>
        
    </div>
  )
}