import {combineReducers, configureStore} from '@reduxjs/toolkit';
import socketMiddleware from '../utils/middleware/socketMiddleware';
import {appSlice} from './slices/appSlice';
import {socketSlice} from './slices/socketSlice';
import {userSlice} from './slices/userSlice';

let createDebugger: any;
createDebugger = require('redux-flipper').default;
if (__DEV__) {
  createDebugger = require('redux-flipper').default;
  // middlewares.push(createDebugger());
}

const rootReducer = combineReducers({
  users: userSlice.reducer,
  socket: socketSlice.reducer,
  app: appSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([socketMiddleware, createDebugger()]),
});
