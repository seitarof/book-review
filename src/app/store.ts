import { configureStore } from '@reduxjs/toolkit'
import offsetReducer from './offsetSlice'
import usernameReducer from './usernameSlice'

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
    username: usernameReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
