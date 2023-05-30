import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/posts/tags');
  return data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.tags.status = 'error';
      state.tags.items = [];
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = 'loaded';
      state.tags.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = 'error';
      state.tags.items = [];
    },
  },
});

export const postsReducer = postSlice.reducer;
