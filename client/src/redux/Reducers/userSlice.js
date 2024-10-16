import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: {},
      isLoggedIn : false
    },
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      setIsLoggedIn: (state, action) => {
        state.isLoggedIn = (action.payload);
      }
    },
});

export const {
    setUser,
    setIsLoggedIn
} = userSlice.actions;

export default userSlice.reducer;
