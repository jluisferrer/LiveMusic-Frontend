import { GetUserProfile, updateUser } from "../../services/apiCalls"
import "./Profile.css"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import ProfileCard from "../../common/ProfileCard/ProfileCard"
import { GetUserEvents } from "../../services/apiCalls"
import EventCard from "../../common/EventCard/EventCard"
import { CInput } from "../../common/CInput/CInput"
import userSlice, { login } from "../../slices/userSlice"

export const Profile = () => {
    const [userEvents, setUserEvents] = useState([]);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.credentials)
    const [name, setName] = useState(user ? user.user.name : "");
    const [email, setEmail] = useState(user ? user.user.email : "");
    const [password, setPassword] = useState(user ? user.user.password : "");
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSave = async () => {
        try {
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
            navigate("/")
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
        setPassword(user ? user.user.password :"");
    }, [user]);

    return (
        <div className="profileDesign">
            {user && (
                <>
                    <CInput
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        value={name}
                        changeEmit={handleNameChange}
                        disabled={!editMode}
                    />
                    <CInput
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        value={email}
                        changeEmit={handleEmailChange}
                        disabled={!editMode}
                    />
                    <CInput
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        value={password}
                        changeEmit={handlePasswordChange}
                        disabled={!editMode}
                    />
                    <button onClick={editMode ? handleSave : () => setEditMode(true)}>
                        {editMode ? "Guardar" : "Editar"}
                    </button>
                </>
            )}
          {userEvents.map((event, index) => (
                <EventCard key={`${event.id}-${index}`} event={event}
                 />
            ))}
        </div>
    )
}
