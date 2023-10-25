import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ILogin, ILogRegData, IRegister, IUser} from "../../interfaces";
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

const fetchAuthMe = createAsyncThunk<IUser, void>(
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
   }
});

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