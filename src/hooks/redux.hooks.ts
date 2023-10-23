import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {AppDispatch, RootState} from "../redux";

// Get typified useDispatch() and useSelector
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

export {
   useAppSelector,
   useAppDispatch
};