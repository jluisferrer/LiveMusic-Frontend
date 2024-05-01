import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',  //seccion
    initialState: {  //lo que vale sin nada
        credentials: {} //objeto vavio para token y usuario
    },

    reducers: {   //el que efectua las funciones
        login: (state, action) => {   //cuando entre algo a login lo guardamos en el estado
            return {
                ...state,   //spreads
                ...action.payload //lo que recibimos
            }
        },

        logout: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});




export const { login, logout } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;