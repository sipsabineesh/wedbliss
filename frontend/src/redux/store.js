import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import adminReducer from './admin/adminSlice';
import { apiSlice } from '../redux/apiSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
  {  devTools: true,
     serializableCheck: false,
  }
  ).concat(apiSlice.middleware),
  

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  //   // devTools: true,
  // })
});

export const persistor = persistStore(store);


// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import userReducer from './user/userSlice'
// import { persistReducer } from 'redux-persist'
// import { storage } from 'redux-persist/lib/storage'


// const rootReducer = combineReducers({user:userReducer})
// const persistConfig = {
//     key : 'root',
//     version:1,
//     storage,
// }
// const persistReducer = persistReducer(persistConfig,rootReducer)
// export const store = configureStore({
//     reducer: persistReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         // devTools: true,
//         serializableCheck : false,
//     }),
// })

// export const persistor = persistStore(store)