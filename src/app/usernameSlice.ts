import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface UsernameState {
  value: string
}

const initialState: UsernameState = {
  value: "",
}

export const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setUsername } = usernameSlice.actions

export const selectUsername = (state: RootState) => state.offset.value

export default usernameSlice.reducer
