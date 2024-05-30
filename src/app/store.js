import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import userSlice from "../slices/userSlice";
import eventSlice from "../slices/eventSlice";
import userEventSlice from "../slices/userEventSlice";

const reducers = combineReducers({  
  user: userSlice,
  detail: eventSlice,
  userEvents: userEventSlice,
});

const persistConfig = {  
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers); 

export default configureStore({   
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});