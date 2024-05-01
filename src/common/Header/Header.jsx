import { CLink } from "../CLink/CLink"
import "./Header.css"
import React from "react"

export const Header = () => {
    return (
        <div className="headerDesign">
            <CLink
                path="/"
                title="Home"
            />
            <CLink
                path="/login"
                title="Login"
            />
            <CLink
                path="/register"
                title="Register"
            />
        </div>
    )
}