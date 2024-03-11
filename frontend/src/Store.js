import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './Slices/apiSlice';
import cartsliceReducer from './Slices/cartSlice';
import authSliceReducer from './Slices/authSlice';

const store = configureStore({
    reducer:{
       [apiSlice.reducerPath]:apiSlice.reducer,
       cart:cartsliceReducer,
       auth:authSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})

export default store