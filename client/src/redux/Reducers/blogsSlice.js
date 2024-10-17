import { createSlice } from '@reduxjs/toolkit';

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        data: [],
        newBlog:{}
    },
    reducers: {
        setBlogsData: (state, action) => {
            state.data = action.payload;
        },
        addBlog:(state, action) => {
            state.data.push(action.payload)
        },
        setNewBlog: (state, action) => {
            state.newBlog = action.payload
        }
    },
});

export const {
    setBlogsData,
    addBlog,
    setNewBlog
} = blogsSlice.actions;

export default blogsSlice.reducer;