const root = "http://localhost:8000/api/";

export const LoginUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }
    try {
        const response = await fetch(`${root}login`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error
    }
}

export const GetUserProfile = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }
    try {
        const response = await fetch(`${root}users/profile`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error
    }
}

export const updateUser = async (user, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(user)
    }
    try {
        const response = await fetch(`${root}users/update`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error
    }
}

export const RegisterUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }
    try {
        const response = await fetch(`${root}register`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error
    }
}

export const GetEvents = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Usa el token del usuario

        },
    }
    try {
        const response = await fetch(`${root}events`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error
    }
}

export const GetUserEvents = async (token) => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Usa el token del usuario
        },
    }
    try {
        const response = await fetch(`${root}usergroupevents`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error
    }
}

export const JoinEvent = async (eventId, token) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${root}usergroupevents/${eventId}`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const GetAllGroups = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${root}groups`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const deleteUserEvent = async (eventId, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(`${root}usergroupevents/${eventId}`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
}