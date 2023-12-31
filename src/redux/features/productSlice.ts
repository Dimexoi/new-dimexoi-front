import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const Sellsy = require("node-sellsy").default

type Product = {
  id: string,
  name: string,
  description: string,
  slug: string,
  categoryName: string,
  categorySlug: string,
  images: string[],
  collectionName: string,
  collectionSlug: string
}

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
  someSdbProducts : Product[],
  productsToDisplay : Product[],
  displayedProduct: Product,
  sdbProducts: Product[]
}

export const findSomeSdbProducts = createAsyncThunk('product/findSomeSdbProducts', async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/products/category/salledebains')
    return response.data.displayedSdbProducts;
  } catch (error) {
    console.log("error:", error);
  }
});

export const findProductPerCategory = createAsyncThunk('product/findProductPerCategory', async (id: string) => {
  try {
 const response = await axios.post('/api/products', {
      categoryId: id
    })
    return response.data.products
  } catch (error) {
    console.log("error:", error);
  }
});

export const getCategories = createAsyncThunk('product/getCategories', async () => {
  try {
    const response = await axios.post('/api/products/category/categories')
  } catch (error) {
    console.log("error:", error);
  }
});

export const getOneProduct = createAsyncThunk('product/getOneProduct', async (id: string) => {
  try {
    const response = await axios.post('http://localhost:3000/api/products/getone',{
      productId: id
    })
    return response.data;
  } catch (error) {
    console.log("error:", error);
  }
});


// export const findProductsTest = createAsyncThunk('product/findAllProducts', async () => {
//   try {
    
//     const response = await axios.get('https://api.sellsy.com/v2/items/favourite-filters', {
//       headers: {
//         'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
//       }
//     });
//     console.log(response);
     
  
//   } catch (error) {
//     console.log("error:", error);
//   }
// });

// export const findSdbProducts = createAsyncThunk('product/findSdbProducts', async () => {
//   try {
    
//     const response = await axios.post('https://api.sellsy.com/v2/items/search',{
//       "filters": {
//         "type": [
//           "product"
//         ],
//         "favourite_filter": 438873
//       }
//     },{
//       params: {
//         field: ['']
//       },
//       headers: {
//         'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
//       }
//     });
//     console.log(response);
//     const fetchedProducts = response.data;

//     return(response.data)
     
  
//   } catch (error) {
//     console.log("error:", error);
//   }
// });

// Define the initial state using that type
const initialState: ProductState = {
  allProducts: [],
  someSdbProducts: [],
  productsToDisplay: [],
  displayedProduct: {
    id: '',
    name: '',
    description: '',
    slug: '',
    categoryName: '',
    categorySlug: '',
    images: [],
    collectionName: '',
    collectionSlug: ''
  },
  sdbProducts: []
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
      .addCase(findSomeSdbProducts.fulfilled, (state, action) => {
        state.sdbProducts = action.payload
      })
      .addCase(findSomeSdbProducts.pending, (state, action) => {
        
      })
      .addCase(findSomeSdbProducts.rejected, (state, action) => {

      })
      .addCase(findProductPerCategory.fulfilled, (state, action) => {
        state.productsToDisplay = action.payload  
      })
      .addCase(findProductPerCategory.pending, (state, action) => {
    
      })
      .addCase(findProductPerCategory.rejected, (state, action) => {

      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        console.log('finish')
        console.log(action.payload  )
        console.log('finish')

        state.displayedProduct = action.payload        
      })
      .addCase(getOneProduct.pending, (state, action) => {
        console.log('pending');
        
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        console.log('rejected');
      })
      // .addCase(findSdbProducts.fulfilled, (state, action) => {
      //   console.log(action.payload);
        
      // })
      // .addCase(findSdbProducts.pending, (state, action) => {
      //   console.log('pending');
      // })
      // .addCase(findSdbProducts.rejected, (state, action) => {
      //   console.log('rejected');
      // })
  },
})

export const { setAllProducts } = productSlice.actions
export const { setSomeSdbProducts } = productSlice.actions
export const { setProductsToDisplay } = productSlice.actions
export const { setDisplayedProduct } = productSlice.actions

export default productSlice.reducer;