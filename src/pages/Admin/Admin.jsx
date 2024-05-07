import "./Admin.css";
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser} from "../../services/apiCalls";
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
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers(user.token);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const DeleteUser = async (userId) => {
        try {
            await deleteUser(userId, user.token);
            fetchUsers();
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
                                    <button onClick={() => DeleteUser(user.id)}>Delete</button>
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
