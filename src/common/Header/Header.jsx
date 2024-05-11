import { useDispatch, useSelector } from "react-redux"
import { CLink } from "../CLink/CLink"
import "./Header.css"
import React, { useEffect } from "react"
import { logout} from "../../slices/userSlice"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate()
    const rdxUser = useSelector((state) => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
    }, [rdxUser]);

    return (
        <div className="headerDesign">
            <CLink path="/" title="Home" />
            {rdxUser?.credentials?.token ? (
                <div className="navigatorDesign">
                    {/* Mostrar el nombre del usuario */}
                    <CLink path="/profile" title={rdxUser?.credentials?.user?.name} />
                    {rdxUser.credentials.user.role === "super_admin" ? (
                        <div className="adminDiv">
                            <CLink path={"/admin"} title={"AdminUsers"} />
                            <CLink path={"/admin2"} title={"AdminEvents"} />
                        </div>
                    ) : null}
                    <div
                        className="outDesign"
                        onClick={() => {
                            dispatch(logout({ credentials: "" }));
                            navigate("/login");
                        }}
                    >
                        Log out
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