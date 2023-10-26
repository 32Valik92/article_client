import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {authReducer, postReducer} from "./slices";

// Container with our reducers
const rootReducer = combineReducers({
   authReducer,
   postReducer
});

// Our main store
const setupStore = () => configureStore({
   reducer: rootReducer
});

// Our function-returning types
type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore["dispatch"];

export type {
   RootState,
   AppStore,
   AppDispatch
};

export {
   setupStore
};

