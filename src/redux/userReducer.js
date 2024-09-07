import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('aaaaaaa', action);
      state.userInfo = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
