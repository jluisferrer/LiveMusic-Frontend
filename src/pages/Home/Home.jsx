import "./Home.css";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { GetEvents, JoinEvent } from "../../services/apiCalls";
import { EventCard } from "../../common/EventCard/EventCard.jsx";
import { updateDetail } from "../../slices/eventSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTubePlayer from "react-player/youtube";
import ReactPlayer from "react-player";
import { updateUserJoinedEvents, userJoinedEventsData } from "../../slices/userEventSlice.js";


export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]); 
    const user = useSelector((state) => state.user.credentials);
    const userJoinedEvents = useSelector(userJoinedEventsData);

    const manageDetail = (event) => {
        dispatch(updateDetail({ detail: event }));
        toast.success("Event detail");

        navigate("/detail");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetched = await GetEvents(user.token);
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
            const newUserJoinedEvents = [...userJoinedEvents, eventId];  // Agrega el evento unido a la lista de eventos
            dispatch(updateUserJoinedEvents(newUserJoinedEvents)); // Actualiza los eventos unidos en Redux
    
            toast.success("User joined event");
        } catch (error) {
            toast.error("Error joining user to event");
        }
    };
    


    if (!user) {
        return (
            <div className="homeDesign">
                <div>
                    <h2>Welcome to our music events page!</h2>
                </div>
                
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=rDm0da8NhkQ"
                        loop
                        playing
                        controls = {true}
                        height={"75%"}
                        width={"90%"}
                    />
            
            </div>
        );
    }

    const filteredEvents = events.filter(event => !userJoinedEvents.includes(event.id));

    return (
        <div className="homeDesign">
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