import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ILogin, ILogRegData, IRegister} from "../../interfaces";
import {authService} from "../../services";

interface IState {
    data: ILogRegData,
    status: string;
}

const initialState: IState = {
   data: null,
   status: "loading"
};

const fetchAuth = createAsyncThunk<ILogRegData, ILogin>(
   "authSlice/fetchAuth",
   async (params, {rejectWithValue}) => {
      try {
         const {data} = await authService.login(params);
         return data;
      } catch (e) {
         const err = e as AxiosError;
         return rejectWithValue(err.response.data);
      }
   }
);

const fetchRegister = createAsyncThunk<ILogRegData, IRegister>(
   "authSlice/fetchRegister",
   async (params, {rejectWithValue})=> {
      try {
         const {data} = await authService.register(params);
         return data;
      } catch (e) {
         const err = e as AxiosError;
         return rejectWithValue(err.response.data);
      }
   }
);

const fetchAuthMe = createAsyncThunk<ILogRegData, void>(
   "authSlice/fetchAuthMe",
   async (_,{rejectWithValue}) => {
      try {
         const {data} = await authService.getMe();
         return data;
      } catch (e) {
         const err = e as AxiosError;
         return rejectWithValue(err.response.data);
      }
   }
);

const slice = createSlice({
   name: "authSlice",
   initialState,
   reducers:{
      logout: (state) => {
         state.data = null;
      }
   },
   extraReducers: builder =>
      builder
      // fetchAuth
      //    .addCase(fetchAuth.pending, (state) => {
      //       state.status = "loading";
      //       state.data = null;
      //    })
      //    .addCase(fetchAuth.fulfilled, (state, action) => {
      //       state.status = "loaded";
      //       state.data = action.payload;
      //    })
      //    .addCase(fetchAuth.rejected, (state) => {
      //       state.status = "error";
      //       state.data = null;
      //    })
      // // fetchAuthMe
      //    .addCase(fetchAuthMe.pending, (state) => {
      //       state.status = "loading";
      //       state.data = null;
      //    })
      //    .addCase(fetchAuthMe.fulfilled, (state, action) => {
      //       state.status = "loaded";
      //       state.data = action.payload;
      //    })
      //    .addCase(fetchAuthMe.rejected, (state) => {
      //       state.status = "error";
      //       state.data = null;
      //    })
      // // fetchRegister
      //    .addCase(fetchRegister.pending, (state) => {
      //       state.status = "loading";
      //       state.data = null;
      //    })
      //    .addCase(fetchRegister.fulfilled, (state, action) => {
      //       state.status = "loaded";
      //       state.data = action.payload;
      //    })
      //    .addCase(fetchRegister.rejected, (state) => {
      //       state.status = "error";
      //       state.data = null;
      //    })
         .addMatcher(isPending(fetchAuth, fetchAuthMe, fetchRegister), state => {
            state.status = "loading";
            state.data = null;
         })
         .addMatcher(isFulfilled(fetchAuth, fetchAuthMe, fetchRegister), (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
         })
         .addMatcher(isRejected(fetchAuth, fetchAuthMe, fetchRegister), (state) => {
            state.status = "error";
            state.data = null;
         })
    
});

export const selectIsAuth = (state: any) => Boolean(state.auth.data);


const {reducer: authReducer, actions} = slice;

const authActions = {
   ...actions,
   fetchAuth,
   fetchRegister,
   fetchAuthMe
};

export {
   authReducer,
   authActions
};