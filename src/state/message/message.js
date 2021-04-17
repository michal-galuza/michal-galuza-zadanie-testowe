import { createSlice } from "@reduxjs/toolkit";
const SILCE_NAME = "message";
const initialState = {
  message: ""
};

const message = createSlice({
  name: SILCE_NAME,
  initialState,
  reducers: {
    setMessage: (state, { payload = "" }) => {
      state.message = payload;
    }
  }
});
export const messageState = state => state.message.message;
export const { setMessage } = message.actions;
export default message.reducer;
