import "./EventCard.css";


export const EventCard =({ event }) => {
    return (
        <div className="eventCard">
            <h2>{event.eventName}</h2>
            <p>{event.eventDate}</p>
            <p>{event.location}</p>
            {/* Mostrar los nombres de los grupos */}
            <div>
                <h3>Grupos asociados:</h3>
                <ul>
                    {event.groups.map((group, index) => (
                        <li key={index}>{group.groupName}</li>
                    ))}
                </ul>
            </div>
            {/*detalles  del evento */}
        </div>
    );
}

