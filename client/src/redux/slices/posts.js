import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const fetchRemovePost = createAsyncThunk(
    'posts/fetchRemovePost',
    async (id) => await axios.delete(`/posts/${id}`)
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {
        //Получение статей
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },
        [fetchPosts.rejected]: (state) => {
            state.tags.status = 'error';
            state.tags.items = [];
        },
        //Получение тегов
        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
            state.tags.items = [];
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'loaded';
            state.tags.items = action.payload;
        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = 'error';
            state.tags.items = [];
        },
        //Удаление статьи
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
        },
    },
});

export const postsReducer = postSlice.reducer;
