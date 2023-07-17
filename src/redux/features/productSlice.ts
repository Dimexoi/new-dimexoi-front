import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  allProducts : {
    name: string,
    categoryName: string,
    categorySlug: string,
    subcategoryName: string,
    attribute: string,
    dimensions: string,
    images: string[],
    description : string,
    available: string,
    collection: string,
    collectionSlug: string,
    slug: string,
    subcategorySlug: string
  }[],
  someSdbProducts : {
    name: string,
    categoryName: string,
    categorySlug: string,
    subcategoryName: string,
    attribute: string,
    dimensions: string,
    images: string[],
    description : string,
    available: string,
    collection: string,
    collectionSlug: string,
    slug: string,
    subcategorySlug: string
  }[],
  productsToDisplay : {
    name: string,
    categoryName: string,
    categorySlug: string,
    subcategoryName: string,
    attribute: string,
    dimensions: string,
    images: string[],
    description : string,
    available: string,
    collection: string,
    collectionSlug: string,
    slug: string,
    subcategorySlug: string
  }[],
  displayedProduct: {
    name: string,
    categoryName: string,
    categorySlug: string,
    subcategoryName: string,
    attribute: string,
    dimensions: string,
    images: string[],
    description : string,
    available: string,
    collection: string,
    collectionSlug: string,
    slug: string,
    subcategorySlug: string
  }
}

// Define the initial state using that type
const initialState: ProductState = {
  allProducts: [],
  someSdbProducts: [],
  productsToDisplay: [],
  displayedProduct: {
    name: '',
    categoryName: '',
    categorySlug: '',
    subcategoryName: '',
    attribute: '',
    dimensions: '',
    images: [],
    description : '',
    available: '',
    collection:'',
    collectionSlug: '',
    slug: '',
    subcategorySlug: ''
  }
}

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<typeof initialState.allProducts>) => {
      state.allProducts = action.payload
    },
    setSomeSdbProducts: (state, action: PayloadAction<typeof initialState.someSdbProducts>) => {
      state.someSdbProducts = action.payload
    },
    setProductsToDisplay: (state, action: PayloadAction<typeof initialState.productsToDisplay>) => {
      state.productsToDisplay = action.payload
    },
    setDisplayedProduct: (state, action: PayloadAction<typeof initialState.displayedProduct>) => {
      state.displayedProduct = action.payload
    },
  },
})

export const { setAllProducts } = productSlice.actions
export const { setSomeSdbProducts } = productSlice.actions
export const { setProductsToDisplay } = productSlice.actions
export const { setDisplayedProduct } = productSlice.actions

export default productSlice.reducer;