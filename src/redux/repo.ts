import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface RepoState {
  repos: number
}

// Define the initial state using that type
const initialState: RepoState = {
    repos: 0,
}

export const repoSlice = createSlice({
  name: 'repo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRepo: (state, action) => {
      state.repos = action.payload
    },
  },
})

export const { setRepo } = repoSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default repoSlice.reducer

