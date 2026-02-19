import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './ChatSlice'; // Descriptive name

const store = configureStore({
  reducer: {
    chat: chatReducer, // Access it as state.chat in your components
  },
  // Professional Tip: Middleware for serializable checks is default in RTK
});

export default store;