import { createSlice } from '@reduxjs/toolkit'
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
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

export const { increment, decrement } = offsetSlice.actions

export const selectOffset = (state: RootState) => state.offset.value

export default offsetSlice.reducer