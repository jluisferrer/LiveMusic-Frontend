import "./Register.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        name: "",
        role: "",
        password: "",

    })
    const [userError, setUserError] = useState({
        emailError: "",
        nameError: "",
        roleError: "",
        passwordError: "",
    })

    const [msg, setMsg] = useState("")
    const [msgError, setMsgError] = useState("")

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

    const registerMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields are required");
                }
            }

            await RegisterUser(user);
            toast.success("Register completed");
            setMsg("Register completed");

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            setMsgError(error.message);
            toast.error(error.message);
        }
    };
    return (
        <div className="registerDesign">
            <ToastContainer
             position="top-left"
             autoClose={1500}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
             theme="dark"
            />
            {msg === "" ? (
                <div className="registerDesign">
                    <div className="error">{msgError}</div>
                    <label>Email:</label>
                    <CInput
                        className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                            }`}
                        type="email"
                        placeholder="Write your email"
                        name="email"
                        value={user.email || ""}
                        changeEmit={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <label className="white-color">Name:</label>
                    <CInput
                        className={`inputDesign ${userError.nameError !== "" ? "inputDesignError" : ""
                            }`}
                        type="text"
                        placeholder="Choose an username"
                        name="name"
                        value={user.name || ""}
                        changeEmit={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <label>Role:</label>
                    <select
                        className={`inputDesign ${userError.roleError !== "" ? "inputDesignError" : ""}`}
                        name="role"
                        value={user.role || ""}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    >
                        <option value="">Select your role</option>
                        <option value="user">User</option>
                        {/* <option value="group">Group</option> futura implementacion*/}
                    </select>
                    <label>Password:</label>
                    <CInput
                        className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
                            }`}
                        type="password"
                        placeholder="Choose your password"
                        name="password"
                        value={user.password || ""}
                        changeEmit={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <button className="register" onClick={registerMe}>Register</button>
                </div>
            ) : (
                <div>
                    <div>{msg}</div>
                </div>
            )}
        </div>
    )
}