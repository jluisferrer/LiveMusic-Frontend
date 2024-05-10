import "./DetailCard.css";
import { useSelector } from "react-redux";
import { detailData } from "../../slices/eventSlice";
import { useState } from "react";


export const DetailCard = () => {


    const detailRdx = useSelector(detailData);
    const [event, setEvent] = useState({

        eventName: detailRdx.detail.eventName,
        eventDate: detailRdx.detail.eventDate,
        location: detailRdx.detail.location,
        groups: detailRdx.detail.groups,
    })

    return (
        <div className="detailCard">
            <h2>{event.eventName}</h2>
            <p>{event.eventDate}</p>
            <p>{event.location}</p>
            <h3>Grupos:</h3>
            <p>{event.groups.map((group) => (
                <li key={group.id}>{group.groupName}</li>
            ))}</p>
        </div>
    );
}

