import "./Profile.css"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import ProfileCard from "../../common/ProfileCard/ProfileCard"
import { GetUserEvents } from "../../services/apiCalls"

export const Profile = () => {

    const navigate = useNavigate()

    const user = useSelector((state) => state.user.credentials)
    console.log(user, "SOY EL USUARIO")
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])
    return (
        <div className="profileDesign">
      <ProfileCard user={user} />
        </div>
    )
}