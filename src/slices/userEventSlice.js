import { createSlice } from "@reduxjs/toolkit";

export const userEventSlice = createSlice({
  name: 'userEvents',
  initialState: {
    userJoinedEvents: [] 
  },
  reducers: {
    updateUserJoinedEvents: (state, action) => { 
      return {
        ...state,
        userJoinedEvents: action.payload
      }
    },
  }
});

export const { updateUserJoinedEvents } = userEventSlice.actions; 

export const userJoinedEventsData = (state) => state.userEvents.userJoinedEvents; 

export default userEventSlice.reducer;
