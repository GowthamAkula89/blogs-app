import { createSlice } from '@reduxjs/toolkit';

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        data: [],
    },
    reducers: {
        setBlogsData: (state, action) => {
            state.data = action.payload;
        },
        addBlog:(state, action) => {
            state.data.push(action.payload)
        }
    },
});

export const {
    setBlogsData,
    addBlog
} = blogsSlice.actions;

export default blogsSlice.reducer;