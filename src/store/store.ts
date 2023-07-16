import { configureStore } from '@reduxjs/toolkit'
import repoReducer from "../redux/repo"
// ...

export const store = configureStore({
  reducer: {
    repos:repoReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch