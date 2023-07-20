import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
const Sellsy = require("node-sellsy").default

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

export const findAllProducts = createAsyncThunk('product/findAllProducts', async () => {
  try {
    console.log('here');
      const sellsy = new Sellsy({
        creds: {
        consumerKey: process.env.NEXT_PUBLIC_CONSUMER_KEY,
        consumerSecret: process.env.NEXT_PUBLIC_CONSUMER_SECRET,
        userToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        userSecret: process.env.NEXT_PUBLIC_TOKEN_SECRET,
      },
      endPoint: 'https://sistms-api.onrender.com'
    });

    
    const params = {
      type: "item",
      search: {
        categoryid: "218960",
        tags: "website"
      },
      pagination: {
        nbperpage: "10"
      }
    };

    const data = await sellsy.api({
      method: "Catalogue.getList",
      params: params,
    });

    return data.response.result;
  
  } catch (error) {
    console.log("error:", error);
  }
});

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
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(findAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        for (const product of action.payload) {
          state.someSdbProducts.push(
            {
              name: product.tradename,
              categoryName: product.categoryName,
              categorySlug: product,
              subcategoryName: product,
              attribute: product,
              dimensions: product,
              images: [...product],
              description : product,
              available: product,
              collection: product,
              collectionSlug: product,
              slug: product,
              subcategorySlug: product
            }
          )
        }
      })
      .addCase(findAllProducts.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(findAllProducts.rejected, (state, action) => {
        console.log('rejected');
      })
  },
})

export const { setAllProducts } = productSlice.actions
export const { setSomeSdbProducts } = productSlice.actions
export const { setProductsToDisplay } = productSlice.actions
export const { setDisplayedProduct } = productSlice.actions

export default productSlice.reducer;