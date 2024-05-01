import "./CLink.css"
import { useNavigate } from "react-router-dom"

export const CLink = ({ path, title }) => {
    const navigate = useNavigate()
    return (
        <div className="CLinkDesign" onClick={() => navigate(path)}>{title}</div>
    )
}