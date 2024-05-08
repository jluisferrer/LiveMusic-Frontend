import "./Register.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";

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
    }

    const registerMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields are required");
                }
            }

            const fetched = await RegisterUser(user);

            console.log(fetched);
            setMsg("Register completed");

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            setMsgError(error.message);
        }
    };
    return (
        <div className="registerDesign">
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
                    <div className="inputDesignError">{userError.emailError}</div>
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
                    <div className="inputDesignError">{userError.nameError}</div>
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
                        <option value="group">Group</option>
                    </select>
                    <div className="inputDesignError">{userError.roleError}</div>
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
                    <div className="inputDesignError">{userError.passwordError}</div>
                    <button onClick={registerMe}>Register</button>
                </div>
            ) : (
                <div>
                    <div>{msg}</div>
                </div>
            )}
        </div>
    )
}