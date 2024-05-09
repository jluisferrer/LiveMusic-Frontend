import "./Home.css";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { GetEvents, JoinEvent } from "../../services/apiCalls";
import { EventCard } from "../../common/EventCard/EventCard.jsx";
import { updateDetail } from "../../slices/eventSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validame } from "../../utils/functions.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]); // Lista de eventos a los que el usuario se ha unido
    const user = useSelector((state) => state.user.credentials);

    const manageDetail = (event) => {
        console.log(event, "event Detail");
        dispatch(updateDetail({ detail: event }));
        toast.success("Event detail");

        navigate("/detail");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetched = await GetEvents(user.token);
                toast.success("Events retrieved successfully");
                if (fetched.data) {
                    setEvents(fetched.data);
                } else {
                    setEvents([]);
                }
            } catch (error) {
                toast.error("Error retrieving events");
                setEvents([]);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const joinUserEvent = async (eventId) => {
        try {
            await JoinEvent(eventId, user.token);

            // Agrega el evento unido a la lista de eventos joinedos
            setJoinedEvents([...joinedEvents, eventId]);
            toast.success("User joined event");
        } catch (error) {
            toast.error("Error joining user to event");
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
            <ToastContainer />
            {filteredEvents.map(event => (
                <div key={event.id}>
                    <div onClick={() => manageDetail(event)}>
                        <EventCard event={event} />
                    </div>
                    <button className="joinEventButton" onClick={() => joinUserEvent(event.id)}>
                        Unirse al evento
                    </button>
                </div>
            ))}
        </div>
    );
};