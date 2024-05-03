import "./EventCard.css";

function EventCard({ event }) {
    return (
        <div className="eventCard">
            <h2>{event.eventName}</h2>
            <p>{event.eventDate}</p>
            <p>{event.location}</p>
            {/* Aquí puedes agregar más detalles sobre el evento */}
        </div>
    );
}

export default EventCard;