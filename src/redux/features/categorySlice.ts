import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type Category = {
  id: string
  name: string,
  image: string,
  slug: string
}

export interface CategoryState {
  allCategories : Category[],
  allCollections : {
    name: string,
    image: string,
    slug: string
  }[],
  categoryToDisplay : Category,
  collectionToDisplay : {
    name: string,
    image: string,
    slug: string
  }
}

// Define the initial state using that type
const initialState: CategoryState = {
  allCategories: [],
  allCollections: [],
  categoryToDisplay: {
    id: '',
    name: '',
    image: '',
    slug: ''
  },
  collectionToDisplay : {
    name: '',
    image: '',
    slug: ''
  }
}

export const categorySlice = createSlice({
  name: 'category',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAllCategories: (state, action: PayloadAction<typeof initialState.allCategories>) => {
      state.allCategories = action.payload
    },
    setAllCollections: (state, action: PayloadAction<typeof initialState.allCollections>) => {
      state.allCollections = action.payload
    },
    setCategoryToDisplay: (state, action: PayloadAction<typeof initialState.categoryToDisplay>) => {
      state.categoryToDisplay = action.payload
    },
    setCollectionToDisplay: (state, action: PayloadAction<typeof initialState.collectionToDisplay>) => {
      state.collectionToDisplay = action.payload
    }
  },

})

export const { setAllCategories } = categorySlice.actions
export const { setAllCollections } = categorySlice.actions
export const { setCategoryToDisplay } = categorySlice.actions
export const { setCollectionToDisplay } = categorySlice.actions

export default categorySlice.reducer