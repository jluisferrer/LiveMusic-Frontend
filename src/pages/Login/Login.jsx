import "./Login.css"
import { CInput } from "../../common/CInput/CInput";
import { GetUserProfile, LoginUser } from "../../services/apiCalls";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/userSlice";
import { useDispatch } from "react-redux";




export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

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
        try {
            const fetched = await LoginUser(user);
            if (fetched.token) {
                // Hacer la petición a /profile
                const profile = await GetUserProfile(fetched.token);
                console.log(profile);  
    
                // Guardar los datos del perfil en el estado de Redux
                const passport = {
                    token: fetched.token,
                    user: profile.data,  
                }
                dispatch(login({ credentials: passport }))
    
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            }
        } catch (error) {
            setMsgError(error.message);
        }
    }   
    return (
        <div className="loginDesign">
            <CInput
                type="email"
                name="email"
                placeholder={"Email"}
                value={user.email || ""}
                changeEmit={inputHandler}
                // onBlurFunction={(e) => checkError(e)}
            />
            <CInput
                type="password"
                name="password"
                placeholder={"Password"}
                value={user.password || ""}
                changeEmit={inputHandler}
                // onBlurFunction={(e) => checkError(e)}
            />
            <button onClick={loginMe}>Login</button>
        </div>
    )
}