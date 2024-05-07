import "./Admin.css";
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, GetEvents, createEvent, updateEvent, deleteEvent } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../../common/ProfileCard/ProfileCard";
import EventCard from "../../common/EventCard/EventCard";
import { CInput } from "../../common/CInput/CInput";

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventNameInput, setEventNameInput] = useState("");
    const [eventDateInput, setEventDateInput] = useState("");
    const [eventLocationInput, setEventLocationInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.credentials);

    useEffect(() => {
        fetchUsers();
        fetchEvents();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers(user.token);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await GetEvents(user.token);
            setEvents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId, user.token);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId, user.token);
            fetchEvents();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateEvent = async () => {
        try {
            const eventData = {
                eventName: eventNameInput,
                eventDate: eventDateInput,
                location: eventLocationInput
                // Agregar más campos aquí según tus necesidades
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
        <div className="adminDesign">
            <div className="adminDesign">
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    {/* más acciones  */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="adminDesign">
                <h2>Events</h2>
                <div>
                    <label>Event Name:</label>
                    <CInput
                        type="text"
                        value={eventNameInput}
                        changeEmit={(e) => setEventNameInput(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Date:</label>
                    <CInput
                        type="text"
                        value={eventDateInput}
                        changeEmit={(e) => setEventDateInput(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Location:</label>
                    <CInput
                        type="text"
                        value={eventLocationInput}
                        changeEmit={(e) => setEventLocationInput(e.target.value)}
                    />
                </div>
                <button onClick={handleCreateEvent}>Create Event</button>
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
                                    <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                                    {/* más acciones */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
