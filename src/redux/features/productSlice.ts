import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const Sellsy = require("node-sellsy").default

type Product = {
  id: string,
  name: string,
  slug: string,
  categoryName: string,
  images: string[]
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
  },
  sdbProducts: Product[]
}

export const findSomeSdbProducts = createAsyncThunk('product/findSomeSdbProducts', async () => {
  try {
    const response = await axios.post('/api/products/category/salledebains')
    console.log(response.data.displayedSdbProducts)
    return response.data.displayedSdbProducts;
  } catch (error) {
    console.log("error:", error);
  }
});

export const findProductPerCategory = createAsyncThunk('product/findProductPerCategory', async (id) => {
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
    console.log(response.data)
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
        console.log('pending');
        
      })
      .addCase(findSomeSdbProducts.rejected, (state, action) => {
        console.log('rejected');
      })
      .addCase(findProductPerCategory.fulfilled, (state, action) => {
        state.productsToDisplay = action.payload
        
      })
      .addCase(findProductPerCategory.pending, (state, action) => {
        console.log('pending');
        
      })
      .addCase(findProductPerCategory.rejected, (state, action) => {
        console.log('rejected');
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        console.log('en cours')
        
      })
      .addCase(getCategories.pending, (state, action) => {
        console.log('pending');
        
      })
      .addCase(getCategories.rejected, (state, action) => {
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