import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	posts: [],
}

export const getPosts = createAsyncThunk(
	'posts/getPosts',
	async (_, { rejectWithValue, dispatch }) => {
		const res = await axios.get('https://jsonplaceholder.typicode.com/photos')
		dispatch(setPosts(res.data))
	}
)
export const deletePostsById = createAsyncThunk(
	'posts/deletePostsById',
	async (id, { rejectWithValue, dispatch }) => {
		await axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
		dispatch(deletePost(id))
	}
)

export const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload
		},
		deletePost: (state, action) => {
			state.posts = state.posts.filter((post) => post.id !== action.payload)
		}
	},
	extraReducers: {
		[getPosts.fulfilled]: () => console.log("getPosts: fullfiled"),
		[getPosts.pending]: () => console.log("getPosts: pending"),
		[getPosts.rejected]: () => console.log("getPosts: rejected"),
		[deletePostsById.fulfilled]: () => console.log("deletePostsById: fullfiled"),
		[deletePostsById.pending]: () => console.log("deletePostsById: pending"),
		[deletePostsById.rejected]: () => console.log("deletePostsById: rejected"),
	}
})

export const { setPosts, deletePost } = postSlice.actions
export default postSlice.reducer
