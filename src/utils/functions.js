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
                return "Please, the name must have at least three characters."
            }
            return "";

        case "email":
        case "e-mail":
        case "correo":
        case "mail":
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (!emailRegex.test(value)) {
                return "The email format must be correct."
            }
            return "";

        case "password":
        case "contraseña":
        case "password_hash":
            if (value.length < 6 || value.length > 10) {
                return "The password must have a minimum of 6 characters and a maximum of 10"
            }

            return "";
        default:
            console.log("Something went wrong!")
    }
}