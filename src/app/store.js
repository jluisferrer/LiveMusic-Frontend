import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import userSlice from "../slices/userSlice";

const reducers = combineReducers({  //combina los slices
    user: userSlice,
  });
  
  const persistConfig = {  //encripta el estado de la aplicacion en el storage
    key: "root",
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, reducers); //ejecutamos persistConfig y reducer
  
  export default configureStore({   //Envuelve lo que guardes en local storage y lo encripta
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(thunk),
  });