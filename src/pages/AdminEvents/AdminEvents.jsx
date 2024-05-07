import "./AdminEvents.css";
import { useEffect, useState } from "react";
import { deleteUser, GetEvents, createEvent, updateEvent, deleteEvent } from "../../services/apiCalls";
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

    const handleUpdateEvent = async (eventId, updatedEventData) => {
        try {
            await updateEvent(eventId, updatedEventData, user.token);
            fetchEvents();
        } catch (error) {
            console.log(error);
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
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.eventName}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.location}</td>
                                <td>
                                    <button onClick={() => DeleteEvent(event.id)}>Delete</button>
                                    {/* más acciones */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
};
