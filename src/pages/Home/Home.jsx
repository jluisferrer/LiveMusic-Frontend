import "./Home.css";
import store from "../../app/store.js";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { GetEvents, GetUserEvents } from "../../services/apiCalls";
import  EventCard  from "../../common/EventCard/EventCard.jsx";


export const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const bringEvents = async () => {
            try {
                const fetched = await GetEvents();
                console.log(fetched.data, "fetched");
                setEvents(fetched.data);
            } catch (error) {

            }
        }
        bringEvents();
    }, []);
    return (
        <div className="homeDesign">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};