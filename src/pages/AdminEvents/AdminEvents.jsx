import "./AdminEvents.css";
import { useEffect, useState } from "react";
import { GetEvents, createEvent, updateEvent, deleteEvent } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [eventNameInput, setEventNameInput] = useState("");
    const [eventDateInput, setEventDateInput] = useState("");
    const [eventLocationInput, setEventLocationInput] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const user = useSelector((state) => state.user.credentials);

    const [eventError, setEventError] = useState({
        eventNameError: "",
        eventDateError: "",
        eventLocationError: "",
    });

    useEffect(() => {
        fetchEvents();
    }, []);


    const fetchEvents = async () => {
        try {
            const response = await GetEvents(user.token);
            setEvents(response.data);
        } catch (error) {
            return error;
        }
    };


    const DeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId, user.token);
            fetchEvents();
        } catch (error) {
            return error;
        }
    };

    const CreateEvent = async () => {
        try {
            // Valida los campos de entrada antes de crear el evento
            const eventNameError = validame("eventName", eventNameInput);
            const eventDateError = validame("eventDate", eventDateInput);
            const eventLocationError = validame("eventLocation", eventLocationInput);

            if (eventNameError || eventDateError || eventLocationError) {
                toast.error("Error: Invalid input");
                return;
            }

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
            return error;
        }
    };

    const selectEvent = (event) => {
        setSelectedEvent(event);
        setEventNameInput(event.eventName);
        setEventDateInput(event.eventDate);
        setEventLocationInput(event.location);
    };

    const eventUpdate = async () => {
        if (selectedEvent) {
            const updatedEventData = {
                eventName: eventNameInput,
                eventDate: eventDateInput,
                location: eventLocationInput
            };
            try {
                await updateEvent(selectedEvent.id, updatedEventData, user.token);
                fetchEvents();
                setSelectedEvent(null);
                setEventNameInput("");
                setEventDateInput("");
                setEventLocationInput("");  // Limpia el evento seleccionado después de actualizar
            } catch (error) {
                return error;
            }
        }
    };

    const checkError = (name, value) => {
        const error = validame(name, value);

        setEventError((prevState) => ({
            ...prevState,
            [name + "Error"]: error,
        }));

        if (error) {
            toast.error(error);
        }
    };

    return (
        <div className="adminEventDesign">
            <ToastContainer />
            <h2>Events</h2>
            <div>
                <label>Event Name:</label>
                <CInput
                    className={`inputDesign ${eventError.eventNameError !== "" ? "inputDesignError" : ""
                        }`}
                    type="text"
                    placeholder={"Event Name"}
                    value={eventNameInput || ""}
                    changeEmit={(e) => setEventNameInput(e.target.value)}
                    onBlurFunction={() => checkError("eventName", eventNameInput)}
                />
            </div>
            <div>
                <label>Event Date:</label>
                <CInput
                    className={`inputDesign ${eventError.eventDateError !== "" ? "inputDesignError" : ""
                        }`}
                    type="text"
                    placeholder={"YYYY-MM-DD"}
                    value={eventDateInput}
                    changeEmit={(e) => setEventDateInput(e.target.value)}
                    onBlurFunction={() => checkError("eventDate", eventDateInput)}
                />
            </div>
            <div>
                <label>Event Location:</label>
                <CInput
                    className={`inputDesign ${eventError.eventLocationError !== "" ? "inputDesignError" : ""
                        }`}
                    type="text"
                    placeholder={"Event Location"}
                    value={eventLocationInput}
                    changeEmit={(e) => setEventLocationInput(e.target.value)}
                    onBlurFunction={() => checkError("eventLocation", eventLocationInput)}
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
                        <tr key={event.id} onClick={() => selectEvent(event)}>
                            <td>{event.id}</td>
                            <td>{event.eventName}</td>
                            <td>{event.eventDate}</td>
                            <td>{event.location}</td>
                            <td>
                                <button onClick={() => DeleteEvent(event.id)}>Delete</button>
                                {selectedEvent && selectedEvent.id === event.id && (
                                    <button onClick={eventUpdate}>Update</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}