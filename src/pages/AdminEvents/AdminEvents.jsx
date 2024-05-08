import "./AdminEvents.css";
import { useEffect, useState } from "react";
import {  GetEvents, createEvent, updateEvent, deleteEvent } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../../common/ProfileCard/ProfileCard";
import EventCard from "../../common/EventCard/EventCard";
import { CInput } from "../../common/CInput/CInput";

export const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [eventNameInput, setEventNameInput] = useState("");
    const [eventDateInput, setEventDateInput] = useState("");
    const [eventLocationInput, setEventLocationInput] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.credentials);

    useEffect(() => {
        fetchEvents();
    }, []);


    const fetchEvents = async () => {
        try {
            const response = await GetEvents(user.token);
            setEvents(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    const DeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId, user.token);
            fetchEvents();
        } catch (error) {
            console.log(error);
        }
    };

    const CreateEvent = async () => {
        try {
            const eventData = {
                eventName: eventNameInput,
                eventDate: eventDateInput,
                location: eventLocationInput
            };
            await createEvent(eventData, user.token);
            fetchEvents();
            // Limpia los inputs después de crear el evento
            setEventNameInput("");
            setEventDateInput("");
            setEventLocationInput("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setEventNameInput(event.eventName);
        setEventDateInput(event.eventDate);
        setEventLocationInput(event.location);
    };

    const eventUpdate = async () => {
        if (selectedEvent) {
            const updatedEventData = {
                eventName: eventNameInput,
                eventDate: eventDateInput,
                location: eventLocationInput
            };
            try {
                await updateEvent(selectedEvent.id, updatedEventData, user.token);
                fetchEvents();
                setSelectedEvent(null);  // Limpia el evento seleccionado después de actualizar
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="adminEventDesign">          
                <h2>Events</h2>
                <div>
                    <label>Event Name:</label>
                    <CInput
                        type="text"
                        placeholder={"Event Name"}
                        value={eventNameInput}
                        changeEmit={(e) => setEventNameInput(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Date:</label>
                    <CInput
                        type="text"
                        placeholder={"YYYY-MM-DD"}
                        value={eventDateInput}
                        changeEmit={(e) => setEventDateInput(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Location:</label>
                    <CInput
                        type="text"
                        placeholder={"Event Location"}
                        value={eventLocationInput}
                        changeEmit={(e) => setEventLocationInput(e.target.value)}
                    />
                </div>
                <button onClick={CreateEvent}>Create Event</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id} onClick={() => handleSelectEvent(event)}>
                                <td>{event.id}</td>
                                <td>{event.eventName}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.location}</td>
                                <td>
                                    <button onClick={() => DeleteEvent(event.id)}>Delete</button>
                                    {selectedEvent && selectedEvent.id === event.id && (
                        <button onClick={eventUpdate}>Update</button>
                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedEvent && (
            <>
                <div>
                    <label>Event Name:</label>
                    <CInput
                        type="text"
                        placeholder={"Event Name"}
                        value={eventNameInput}
                        changeEmit={(e) => setEventNameInput(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Date:</label>
                    <CInput
                        type="text"
                        placeholder={"YYYY-MM-DD"}
                        value={eventDateInput}
                        changeEmit={(e) => setEventDateInput(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Location:</label>
                    <CInput
                        type="text"
                        placeholder={"Event Location"}
                        value={eventLocationInput}
                        changeEmit={(e) => setEventLocationInput(e.target.value)}
                    />
                </div>
                <button onClick={eventUpdate}>Update Event</button>
            </>
        )}
    </div>
);
}