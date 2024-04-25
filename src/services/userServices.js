const APIUrl = import.meta.env.VITE_API_URL

// Registro del usuario
const registerUserService = async (registerForm) => {
    const res = await fetch(`${APIUrl}/users`, {
        method: "POST",
        body: registerForm,
    })

    const body = await res.json()
    return body
}

// Validar un usuario
const validateUserService = async (registration_code) => {
    const res = await fetch(`${APIUrl}/users/validate/${registration_code}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    })

    const body = await res.json()

    return body
}

// Inicio de sesión
const loginUserService = async (email, password) => {
    const res = await fetch(`${APIUrl}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })

    const body = await res.json()

    return body
}

// Ver perfil privado de un usuario
const getUserProfileService = async (token, id) => {
    const res = await fetch(`${APIUrl}/users/${id}`, {
        headers: {
            Authorization: token,
        },
    })

    const body = await res.json()

    return body
}

// Ver todas las valoraciones de un usuario
const getUserReviewsProfileService = async (token, id) => {
    const res = await fetch(`${APIUrl}/users/reviews/${id}`, {
        headers: {
            Authorization: token,
        },
    })

    const body = await res.json()

    return body
}

export {
    registerUserService,
    validateUserService,
    loginUserService,
    getUserProfileService,
    getUserReviewsProfileService,
}
