import "./Login.css"
import { CInput } from "../../common/CInput/CInput";
import { GetUserProfile, LoginUser } from "../../services/apiCalls";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { validame } from "../../utils/functions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: "",
    })

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))

        if (error) {
            toast.error(error);
        }
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
                toast.success("Login completed");

                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className="loginDesign">
            <ToastContainer />
            <CInput className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                type="email"
                name="email"
                placeholder={"Email"}
                value={user.email || ""}
                changeEmit={inputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <CInput className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""}`}
                type="password"
                name="password"
                placeholder={"Password"}
                value={user.password || ""}
                changeEmit={inputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <button onClick={loginMe}>Login</button>
        </div>
    )
}