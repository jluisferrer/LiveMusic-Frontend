import "./Admin.css";
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, GetEvents, createEvent, updateEvent } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../../common/ProfileCard/ProfileCard";
import EventCard from "../../common/EventCard/EventCard";
import { CInput } from "../../common/CInput/CInput";

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
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

    const handleCreateEvent = async () => {
        try {
            const eventData = {
                // Agregar datos del evento aquí
            };
            await createEvent(eventData, user.token);
            fetchEvents();
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
            <h1>Admin Page</h1>
            <div className="users-section">
                <h2>Users</h2>
                {users.map((user) => (
                    <CInput
                        key={user.id}
                        type="text"
                        placeholder="User Name"
                        value={user.name}
                        changeEmit={(e) => {
                            // Actualizar el nombre del usuario
                        }}
                        onDelete={() => handleDeleteUser(user.id)}
                    />
                ))}
            </div>
            <div className="events-section">
                <h2>Events</h2>
                <button onClick={handleCreateEvent}>Create Event</button>
                {events.map((event) => (
                    <div key={event.id}>
                        <CInput
                            type="text"
                            placeholder="Event Name"
                            value={event.eventName}
                            changeEmit={(e) => {
                                const updatedEventData = { ...event, eventName: e.target.value };
                                handleUpdateEvent(event.id, updatedEventData);
                            }}
                            onDelete={() => {
                                // Manejar la eliminación del evento
                            }}
                        />
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </div>
    );
};