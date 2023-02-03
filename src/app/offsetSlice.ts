import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface OffsetState {
  value: number
}

const initialState: OffsetState = {
  value: 0
}

export const offsetSlice = createSlice({
  name: 'offset',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 10
    },
    decrement: (state) => {
      state.value -= 10
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  },
})

export const { increment, decrement, incrementByAmount } = offsetSlice.actions

export const selectOffset = (state: RootState) => state.offset.value

export default offsetSlice.reducer