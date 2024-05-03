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

export const GetEvents = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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