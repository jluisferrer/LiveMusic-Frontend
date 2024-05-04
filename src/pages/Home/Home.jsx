import "./Home.css";
import store from "../../app/store.js";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { GetEvents, GetUserEvents } from "../../services/apiCalls";
import  EventCard  from "../../common/EventCard/EventCard.jsx";


export const Home = () => {
    const [events, setEvents] = useState([]);
    const user = useSelector((state) => state.user.credentials)
    useEffect(() => {
        if (user) {
            const bringEvents = async () => {
                try {
                    const fetched = await GetEvents(user.token);
                    console.log(fetched.data, "fetched");
                    setEvents(fetched.data);
                } catch (error) {

                }
            }
            bringEvents();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="homeDesign">
                <h2>Welcome to our music events page!</h2>
                <p>Please log in to see the events.</p>
                {/* Aquí puedes agregar tus imágenes de bienvenida */}
            </div>
        );
    }

    return (
        <div className="homeDesign">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};