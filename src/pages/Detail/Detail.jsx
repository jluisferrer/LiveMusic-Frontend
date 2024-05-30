import "./Detail.css";
import { useSelector } from "react-redux";
import { detailData } from "../../slices/eventSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DetailCard } from "../../common/CardDetail/DetailCard";
import { JoinEvent } from "../../services/apiCalls";
import { toast, ToastContainer } from "react-toastify";

export const Detail = () => {
    const detailRdx = useSelector(detailData);
    const rdxUser = useSelector((state) => state.user.credentials);
    const navigate = useNavigate();

    useEffect(() => {
        if (!rdxUser) {
            navigate("/");
        }
    }, [rdxUser]);

    const [successMessage, setSuccessMessage] = useState("");
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [hasJoined, setHasJoined] = useState(false);

    const joinUserEvent = async (eventId) => {
        try {
            const fetched = await JoinEvent(eventId, rdxUser.token);

            // Agrega el evento unido a la lista de eventos joinedos
            setJoinedEvents([...joinedEvents, eventId]);

            setSuccessMessage("You have joined the event!");
            toast.success("User joined event");

            setHasJoined(true);
        } catch (error) {
            return error;
        }
    };
    return (
        detailRdx &&
        <div className="detailDesign">
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
                limit={1}
            />
            <DetailCard  >
            </DetailCard>
            {!hasJoined && <button className="joinEventButton" onClick={() => joinUserEvent(detailRdx.detail.id)}>
                Unirse al evento
            </button>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}