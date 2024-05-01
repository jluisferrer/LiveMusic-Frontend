import { useDispatch, useSelector } from "react-redux"
import { CLink } from "../CLink/CLink"
import "./Header.css"
import React, { useEffect } from "react"
import { logout, userData } from "../../slices/userSlice"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate()
    const rdxUser = useSelector((state) => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(rdxUser, " credenciales pasaporte");
    }, [rdxUser]);

    return (
        <div className="headerDesign">
            <CLink path="/" title="Home" />
            {rdxUser?.credentials?.token ? (
                <div className="navigatorDesign">
                    {/* Mostrar el nombre del usuario */}
                    <CLink path="/profile" title={rdxUser?.credentials?.user?.name} />
                    <div
                        className="outDesign"
                        onClick={() => {
                            dispatch(logout({ credentials: "" }));
                            navigate("/login");
                        }}
                    >
                        log out
                    </div>
                </div>
            ) : (
                <div className="navigatorDesign">
                    <CLink path="/login" title="Login" />
                    <CLink path="/register" title="Register" />
                </div>
            )}
        </div>
    );
};