import "./Login.css"
import { CInput } from "../../common/CInput/CInput";
import { GetUserProfile, LoginUser } from "../../services/apiCalls";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { login } from "../../slices/userSlice";
import { useDispatch } from "react-redux";




export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch(); //instancia de redux para escritura

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const loginMe = async () => {
        const fetched = await LoginUser(user)
        if (fetched.token) {
            // Hacer la petición a /profile
            const profile = await GetUserProfile(fetched.token);
            console.log(profile);  // Imprimir la respuesta
    
            // Guardar los datos del perfil en el estado de Redux
            const passport = {
                token: fetched.token,
                user: profile.data,  // Aquí estamos guardando los datos del perfil
            }
            dispatch(login({ credentials: passport }))
    
            setTimeout(() => {
                navigate("/")
            }, 2000);
        }
    }
    return (
        <div className="loginDesign">
            <CInput
                type="email"
                name="email"
                value={user.email || ""}
                changeEmit={inputHandler}
            />
            <CInput
                type="password"
                name="password"
                value={user.password || ""}
                changeEmit={inputHandler}
            />
            <button onClick={loginMe}>Login</button>
        </div>
    )
}