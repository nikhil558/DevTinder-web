import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "Request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      const newArr = state.filter((each) => each._id !== action.payload);
      return newArr;
    },
  },
});

export const { addRequests, removeRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
