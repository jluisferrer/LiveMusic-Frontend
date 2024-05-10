import "./Admin.css";
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CInput } from "../../common/CInput/CInput";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1); // Añade un estado para la última página
    const [nextPageUrl, setNextPageUrl] = useState(null); // Añade un estado para la URL de la 
    const [events, setEvents] = useState([]);
    const [eventNameInput, setEventNameInput] = useState("");
    const [eventDateInput, setEventDateInput] = useState("");
    const [eventLocationInput, setEventLocationInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.credentials);

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers(user.token, page);
            setUsers(response.data.data);
            setLastPage(response.data.last_page); // Guarda la última página
            setNextPageUrl(response.data.next_page_url); // Guarda la URL de la próxima página
        } catch (error) {
            console.log(error);
        }
    };

    const DeleteUser = async (userId) => {
        try {
            await deleteUser(userId, user.token);
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (error) {
            toast.error("Error deleting user");
        }
    };
    return (
        <div className="adminDesign">
            <ToastContainer />
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
                <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>Previous page</button>
                <button onClick={() => setPage(prevPage => Math.min(prevPage + 1, lastPage))} disabled={!nextPageUrl}>Next page</button>
            </div>
        </div>
    );
};
