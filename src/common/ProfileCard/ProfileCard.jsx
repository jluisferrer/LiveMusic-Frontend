import "./ProfileCard.css";

function ProfileCard({ user }) {
    return (
        <div className="eventCard">
            <h2>NAME: {user.user.name}</h2>
            <p>EMAIL: {user.user.email}</p>
            <p>ROLE: {user.user.role}</p>
        </div>
    );
}

export default ProfileCard;