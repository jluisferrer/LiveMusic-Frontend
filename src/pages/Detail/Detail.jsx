import "./Detail.css";
import { useSelector } from "react-redux";
import { detailData } from "../../slices/eventSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../slices/userSlice";
import { DetailCard } from "../../common/CardDetail/DetailCard";

export const Detail = () => {
    const detailRdx = useSelector(detailData);
    console.log(detailRdx, "detailRdx");
    const userRdx = useSelector(userData);
    const rdxUser = useSelector((state) => state.user.credentials);
    console.log(rdxUser, "rdxUser");
    const navigate = useNavigate();

    useEffect(() => {
        if (!rdxUser) {
            navigate("/");
        }
    }, [rdxUser]);

    return (
        detailRdx && 
        <div className="detailDesign">
                <DetailCard  >  
            <h2>{detailRdx.detail.eventName}</h2>
            <p>{detailRdx.detail.eventDate}</p>
            <p>{detailRdx.detail.location}</p>
            <p>{detailRdx.detail.groups.groupName}</p>
                 </DetailCard>
            
        </div>
    );
}