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
import { updateUserJoinedEvents, userJoinedEventsData } from "../../slices/userEventSlice"

export const Profile = () => {
    const [userEvents, setUserEvents] = useState([]);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.credentials);
    const [name, setName] = useState(user?.user?.name || " ");
    const [email, setEmail] = useState(user?.user?.email || " ");
    const [password, setPassword] = useState(user?.user?.password || " ");
    const [toastShown, setToastShown] = useState(false);
    const userJoinedEvents = useSelector(userJoinedEventsData);

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
            const nameError = validame("name", name);
            const emailError = validame("email", email);
            // const passwordError = validame("password", password);

            if (nameError || emailError) {
                toast.error("Error: Invalid input");
                return;
            }

            const updatedUserData = {
                name,
                email,
                password
            };

            const updatedUser = await updateUser(updatedUserData, user.token);
            toast.success("Profile updated successfully");

            setEditMode(false);

            const profile = await GetUserProfile(user.token);

            dispatch(login({ credentials: { token: user.token, user: profile.data } }));
        } catch (error) {
            toast.error("Error updating profile");
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else {
            const fetchUserEvents = async () => {
                try {
                    const fetched = await GetUserEvents(user.token);

                    if (fetched.data) {
                        setUserEvents(fetched.data);
                    } else {
                        setUserEvents([]);
                    }
                } catch (error) {
                    toast.error("Error retrieving events");

                }
            }
            fetchUserEvents();
        }
    }, [user])

    useEffect(() => {
        setName(user ? user.user.name : "");
        setEmail(user ? user.user.email : "");
    }, [user]);




    const removeUserEvent = async (eventId) => {
        try {
            const response = await deleteUserEvent(eventId, user.token);
            if (response.success) {
                const updatedEvents = userEvents.filter((event) => event.id !== eventId);
                setUserEvents(updatedEvents);

                const updatedJoinedEvents = userJoinedEvents.filter((id) => id !== eventId);
                dispatch(updateUserJoinedEvents(updatedJoinedEvents));

                toast.success("Event removed successfully");
            } else {
                console.error(response.message);
            }
        } catch (error) {
            toast.error("Error removing event");
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

        if (error && !toastShown) {
            toast.error(error);
            setToastShown(true);
        }
    };

    useEffect(() => {
        setToastShown(false);
    }, [user]);

    return (
        <div className="profileDesign">
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
                    <button className="removeEventButton" onClick={() => removeUserEvent(event.id)}>Leave the event</button>
                </div>
            ))}
        </div>
    )
}