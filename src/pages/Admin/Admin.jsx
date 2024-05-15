import "./Admin.css";
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export const Admin = () => {
    const navigate = useNavigate();
    const rdxUser = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1); // Añade un estado para la última página
    const [nextPageUrl, setNextPageUrl] = useState(null); // Añade un estado para la URL de la próxima página
    const user = useSelector((state) => state.user.credentials);

    useEffect(() => {
        if (rdxUser?.credentials?.user?.role !== "super_admin") {
            navigate("/"); 
        }
    }, [rdxUser]); 

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
            toast.error("Error fetching users");
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
            <div className="adminDesign">
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
                <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(prevPage => Math.min(prevPage + 1, lastPage))} disabled={!nextPageUrl}>Next</button>
            </div>
        </div>
    );
};
