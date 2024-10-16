import { createSlice } from '@reduxjs/toolkit';

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        data: [],
    },
    reducers: {
        setBlogs: (state, action) => {
        state.data = action.payload;
        }
    },
});

export const {
    setBlogs,
} = blogsSlice.actions;

export default blogsSlice.reducer;