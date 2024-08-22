import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user: {},
};

// Create a slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data
    setUser: (state, action) => {
        console.log('aaaaaaa',action)
      // Update the user state with new data
      state.user = action.payload;
    },
  },
});

// Export the action creators
export const { setUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
