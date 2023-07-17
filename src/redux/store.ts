import { configureStore } from '@reduxjs/toolkit'
import configReducer from '@/redux/features/configSlice'

export const store = configureStore({
  reducer: {
    config: configReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
