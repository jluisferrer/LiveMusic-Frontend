import { GetUserProfile, updateUser } from "../../services/apiCalls"
import "./Profile.css"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { GetUserEvents, deleteUserEvent } from "../../services/apiCalls"
import { EventCard } from "../../common/EventCard/EventCard"
import { CInput } from "../../common/CInput/CInput"
import { login } from "../../slices/userSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validame } from "../../utils/functions"

export const Profile = () => {
    const [userEvents, setUserEvents] = useState([]);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.credentials);
    const [name, setName] = useState(user?.user?.name || " ");
    const [email, setEmail] = useState(user?.user?.email || " ");
    const [password, setPassword] = useState(user?.user?.password || " ");

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        // passwordError: "",
    });

    const nameChange = (e) => {
        setName(e.target.value);
        checkError(e.target.name, e.target.value);
    };

    const emailChange = (e) => {
        setEmail(e.target.value);
        checkError(e.target.name, e.target.value);
    };

    const passwordChange = (e) => {
        setPassword(e.target.value);
        checkError(e.target.name, e.target.value);
    };

    const handleSave = async () => {
        try {
            // Valida los campos de entrada antes de guardar
            const nameError = validame("name", name);
            const emailError = validame("email", email);
            // const passwordError = validame("password", password);

            if (nameError || emailError ) {
                // Si hay algún error, muestra un mensaje y detiene la ejecución
                toast.error("Error: Invalid input");
                return;
            }

            // Objeto para enviar al backend
            const updatedUserData = {
                name,
                email,
                password // enviar solo la contraseña si se ha cambiado
            };

            // Realizar la llamada al backend para actualizar el perfil
            const updatedUser = await updateUser(updatedUserData, user.token);

            // Actualizar el estado del usuario con los datos del usuario actualizado
            setEditMode(false);

            // Obtener los datos actualizados del perfil
            const profile = await GetUserProfile(user.token);

            // Actualizar el estado de Redux con los nuevos datos del perfil
            dispatch(login({ credentials: { token: user.token, user: profile.data } }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else {
            const fetchUserEvents = async () => {
                try {
                    const fetched = await GetUserEvents(user.token);
                    console.log(fetched.data, "fetched events");
                    if (fetched.data) {
                        setUserEvents(fetched.data);
                    } else {
                        setUserEvents([]); // Establece el estado como un array vacío si fetched.data es undefined
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            fetchUserEvents();
        }
    }, [user])

    useEffect(() => {
        // Actualiza el nombre y el correo electrónico cuando cambia el usuario en el estado
        setName(user ? user.user.name : "");
        setEmail(user ? user.user.email : "");
    }, [user]);

    const removeUserEvent = async (eventId) => {
        try {
            const response = await deleteUserEvent(eventId, user.token);
            if (response.success) {
                // Actualizar la lista de eventos del usuario después de eliminar el evento
                const updatedEvents = userEvents.filter((event) => event.id !== eventId);
                setUserEvents(updatedEvents);
                console.log("Event removed successfully");
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Error removing event:", error);
        }
    };

    const checkError = (name, value) => {
        value = value || "";
        const error = validame(name, value);

        setUserError((prevState) => ({
            ...prevState,
            [name + "Error"]: error,
        }));

        if (error) {
            toast.error(error);
        }
    };

    return (
        <div className="profileDesign">
            <ToastContainer />
            {user && (
                <>
                    <CInput
                        className={`inputDesign ${userError.nameError !== "" ? "inputDesignError" : ""
                            }`}
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        value={name}
                        changeEmit={nameChange}
                        onBlurFunction={() => checkError("name", name)}
                        disabled={!editMode}
                    />
                    <CInput
                        className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                            }`}
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        value={email}
                        changeEmit={emailChange}
                        onBlurFunction={() => checkError("email", email)}
                        disabled={!editMode}
                    />
                    <CInput
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        value={password}
                        changeEmit={passwordChange}
                        disabled={!editMode}
                    />
                    <button className="editButton" onClick={editMode ? handleSave : () => setEditMode(true)}>
                        {editMode ? "Guardar" : "Editar"}
                    </button>
                </>
            )}
            {userEvents.map((event, index) => (
                <div key={`${event.id}-${index}`}>
                    <EventCard event={event} />
                    <button className="removeEventButton" onClick={() => removeUserEvent(event.id)}>Remove</button>
                </div>
            ))}
        </div>
    )
}