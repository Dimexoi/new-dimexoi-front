import { configureStore } from '@reduxjs/toolkit'
import configReducer from '@/redux/features/configSlice'
import categorySlice from '@/redux/features/categorySlice'
import productSlice from '@/redux/features/productSlice'

export const store = configureStore({
  reducer: {
    config: configReducer,
    category: categorySlice,
    product: productSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
