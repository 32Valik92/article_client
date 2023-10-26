import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IPost} from "../../interfaces";
import {postService} from "../../services";

interface IState {
   posts: {
      items: IPost[];
      status: string;
   },
   tags: {
      items: string[];
      status: string;
   },
}

const initialState: IState = {
   posts: {
      items: [],
      status: "loading"
   },
   tags: {
      items: [],
      status: "loading"
   },
};

const fetchPosts = createAsyncThunk<IPost[], void>(
   "postSlice/fetchPosts",
   async (_, {rejectWithValue}) => {
      try {
         const {data} = await postService.getAll();
         return data;
      } catch (e) {
         const err = e as AxiosError;
         return rejectWithValue(err.response.data);
      }
   }
);

const fetchTags = createAsyncThunk<string[], void>(
   "postSlice/fetchTags",
   async (_, {rejectWithValue}) => {
      try {
         const {data} = await postService.getTags();
         return data;
      } catch (e) {
         const err = e as AxiosError;
         return rejectWithValue(err.response.data);
      }
   }
);

const fetchRemovePost = createAsyncThunk<void, {id: string}>(
   "postSlice/fetchRemovePost",
   async ({id}, {rejectWithValue}) => {
      try {
         await postService.deletePost(id);
      } catch (e) {
         const err = e as AxiosError;
         return rejectWithValue(err.response.data);
      }
   }
);

const slice = createSlice({
   name: "postSlice",
   initialState,
   reducers:{},
   extraReducers: builder =>
      builder
      // Posts
         .addCase(fetchPosts.pending, (state) => {
            state.posts.items = [];
            state.posts.status = "loading";
         })
         .addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded";
         })
         .addCase(fetchPosts.rejected, (state) => {
            state.posts.items = [];
            state.posts.status = "error";
         })
      // Tags
         .addCase(fetchTags.pending, (state) => {
            state.tags.items = [];
            state.tags.status = "loading";
         })
         .addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = "loaded";
         })
         .addCase(fetchTags.rejected, (state) => {
            state.tags.items = [];
            state.tags.status = "error";
         })
   // Remove Post
   //    .addCase(fetchRemovePost.pending, (state, action) => {
   //       state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
   //    })
});

const {reducer: postReducer, actions} = slice;

const postActions = {
   ...actions,
   fetchPosts,
   fetchTags,
   fetchRemovePost
   
};

export {
   postReducer,
   postActions
};