import "./ProfileCard.css";

function ProfileCard({ user }) {
    return (
        <div className="profileCard">
            <h2>NAME: {user.name}</h2>
            <p>EMAIL: {user.email}</p>
            <p>ROLE: {user.role}</p>
        </div>
    );
}

export default ProfileCard;