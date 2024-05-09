import { createSlice } from "@reduxjs/toolkit";

export const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    detail: {}
  },
  reducers: {
    updateDetail: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  }

});

export const { updateDetail } = detailSlice.actions;

export const detailData = (state) => state.detail;

export default detailSlice.reducer;