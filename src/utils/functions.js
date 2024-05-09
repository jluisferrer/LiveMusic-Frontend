export const validame = (type, value) => {
    switch (type) {
        case "name":
        case "nombre":
        case "first_name":
        case "firstName":
        case "surname":
        case "cognom":
        case "last_name":
        case "lastName":
            if (value.length < 3) {
                return "Please, the name must have at least three characters.";
            }
            return "";
        case "email":
        case "e-mail":
        case "correo":
        case "mail":
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(value)) {
                return "The email format must be correct.";
            }
            return "";
        case "password":
        case "contraseña":
        case "password_hash":
            if (value.length < 6 || value.length > 10) {
                return "The password must have a minimum of 6 characters and a maximum of 10.";
            }
            return "";
        case "role":
            if (value !== "user" && value !== "group") {
                return "The role must be either 'user' or 'group'.";
            }
            return "";
        case "eventDate":
        case "fecha":
        case "date":
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(value)) {
                return "The date format must be correct (YYYY-MM-DD).";
            }
            return "";
        case "eventName":
            if (value.length < 3) {
                return "Please, the event name must have at least three characters.";
            }
            return "";
        case "eventLocation":
            if (value.length < 3) {
                return "Please, the event location must have at least three characters.";
            }
            return "";
        default:
            console.log("Something went wrong!");
    }
};
