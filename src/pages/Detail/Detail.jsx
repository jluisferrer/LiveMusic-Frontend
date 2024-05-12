import "./Detail.css";
import { useSelector } from "react-redux";
import { detailData } from "../../slices/eventSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DetailCard } from "../../common/CardDetail/DetailCard";
import { JoinEvent } from "../../services/apiCalls";

export const Detail = () => {
    const detailRdx = useSelector(detailData);
    console.log(detailRdx, "detailRdx");
    const rdxUser = useSelector((state) => state.user.credentials);
    console.log(rdxUser, "rdxUser");
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
            console.log(fetched, "fetched join event");

            // Agrega el evento unido a la lista de eventos joinedos
            setJoinedEvents([...joinedEvents, eventId]);

            setSuccessMessage("You have joined the event!");

            setHasJoined(true);
        } catch (error) {
            return error;
        }
    };
    return (
        detailRdx &&
        <div className="detailDesign">
            <DetailCard  >
            </DetailCard>
            {!hasJoined && <button className="joinEventButton" onClick={() => joinUserEvent(detailRdx.detail.id)}>
                Unirse al evento
            </button>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}