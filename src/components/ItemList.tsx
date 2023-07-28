import Link from 'next/link';
import Image from 'next/image';
import { store } from '@/redux/store';
import { setProductsToDisplay } from '@/redux/features/productSlice';

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

type ApiReturn = {
  products: Product[]
}

type PropsType = {
  getData: Promise<ApiReturn>,
  categorySlug: string
}
export default async function ItemList({ getData, categorySlug }: PropsType) {

  const {products} = await getData
  
  store.dispatch(setProductsToDisplay(products))

  const productsJsx = products.map((product, index) => (
    <div key={product.id} className='mt-2'>
      <Link href={`/catalogue/produits/${product.id}/${product.slug}`}>

        <Image src={`/images/product/${product.images[0]}`} alt={`image ${product.name}`} width='0' height='0' sizes='100vw' className='w-auto'/>
        <h3 className='font-bold'>{product.name}</h3>

      </Link>
      
    </div>
  ))

 
  return (
    <div>
      {productsJsx}
    </div>
  )
}