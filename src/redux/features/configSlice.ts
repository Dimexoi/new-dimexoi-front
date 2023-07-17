import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ConfigState = {
  mobileMenu : boolean,
  hasScroll: boolean,
  infosFrameTexts: {
    text: string,
    numPoints: number
  }[],
  message: string,
  carouselImageIndex: number,
  carouselTouchStart: number,
}

const initialState = {
  mobileMenu: false,
  hasScroll: false,
  infosFrameTexts: [{
    text: '',
    numPoints: 0
  }],
  message: '',
  carouselImageIndex: 0,
  carouselTouchStart: 0
} as ConfigState;

export const configSlice = createSlice({
  name: 'config',
  
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    toggleMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.mobileMenu = action.payload
    },
    setHasScroll: (state, action: PayloadAction<boolean>) => {
      state.hasScroll = action.payload
    },
    setInfosFrameTexts: (state, action: PayloadAction<{text: string, numPoints:  number}[]>) => {
      state.infosFrameTexts = action.payload
    },
    setCarouselImageIndex: (state, action: PayloadAction<number>) => {
      state.carouselImageIndex = action.payload
    },
    setCarouselTouchStart: (state, action: PayloadAction<number>) => {
      state.carouselTouchStart = action.payload
    }
  },
})

export const {
  setMessage,
  toggleMobileMenu,
  setHasScroll,
  setInfosFrameTexts,
  setCarouselImageIndex,
  setCarouselTouchStart,
} = configSlice.actions

export default configSlice.reducer;