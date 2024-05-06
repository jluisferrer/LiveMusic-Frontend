import "./Home.css";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { GetEvents, JoinEvent} from "../../services/apiCalls";
import  EventCard  from "../../common/EventCard/EventCard.jsx";

export const Home = () => {
    const [events, setEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]); // Lista de eventos a los que el usuario se ha unido
    const user = useSelector((state) => state.user.credentials);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetched = await GetEvents(user.token);
                console.log(fetched.data, "fetched");
                if (fetched.data) {
                    setEvents(fetched.data);
                } else {
                    setEvents([]); 
                }
            } catch (error) {
                console.error(error);
                setEvents([]);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const joinUserEvent = async (eventId) => {
        try {
            const fetched = await JoinEvent(eventId, user.token);
            console.log(fetched, "fetched join event");

            // Agrega el evento unido a la lista de eventos joinedos
            setJoinedEvents([...joinedEvents, eventId]);
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) {
        return (
            <div className="homeDesign">
                <h2>Welcome to our music events page!</h2>
                <p>Please log in to see the events.</p>
                {/* imágenes de bienvenida */}
            </div>
        );
    }

    // Filtra los eventos que el usuario ya ha joinedo
    const filteredEvents = events.filter(event => !joinedEvents.includes(event.id));

    return (
        <div className="homeDesign">
            {filteredEvents.map(event => (
                <div key={event.id}>
                    <EventCard event={event} />
                    <button onClick={() => joinUserEvent(event.id)}>Unirse al evento</button>
                </div>
            ))}
        </div>
    );
};