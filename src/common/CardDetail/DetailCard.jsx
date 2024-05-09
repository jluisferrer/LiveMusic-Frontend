import { useSelector } from "react-redux";
import "./DetailCard.css";
import { detailData } from "../../slices/eventSlice";
import { useState } from "react";


export const DetailCard = () => {


    const detailRdx = useSelector(detailData);
    console.log(detailRdx, "detailRdx, detail");
    const [event, setEvent]=useState({

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
            <p>{event.groups.map((group)=>(
                <li key={group.id}>{group.groupName}</li>           
            ))}</p>
        </div>
    );
}

