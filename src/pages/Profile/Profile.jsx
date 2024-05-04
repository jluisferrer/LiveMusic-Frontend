import "./Profile.css"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export const Profile = () => {

    const navigate = useNavigate()

    const user = useSelector((state) => state.user.credentials)

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])
    return (
        <div className="profileDesign">
        <>
            soy el perfil
        </>
        </div>
    )
}