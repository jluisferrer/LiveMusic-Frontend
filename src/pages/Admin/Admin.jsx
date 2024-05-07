import "./Admin.css";
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, GetEvents, createEvent, updateEvent, deleteEvent, updateUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
            console.log(userId, "userId a borrar")
            await deleteUser(userId, user.token);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            const userToUpdate = users.find(user => user.id === userId);
            if (!userToUpdate) {
                console.log(`User with id ${userId} not found`);
                return;
            }

            // Actualizar el rol del usuario
            userToUpdate.role = newRole;

            // Llamar a la API para actualizar el usuario
            const response = await updateUser(userToUpdate, user.token);
            if (response.success) {
                // Si la actualización fue exitosa, actualizar la lista de usuarios
                fetchUsers();
            } else {
                console.log(response.message);
            }
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
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <select value={user.role} onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}>
                                        <option value="group">Group</option>
                                        <option value="user">User</option>
        
                                    </select>
                                </td>

                                <td>
                                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    {/* más acciones  */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
