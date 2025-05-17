import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice'; // Update this path as per your folder structure

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
