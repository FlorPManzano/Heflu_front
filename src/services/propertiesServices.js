const APIUrl = import.meta.env.VITE_API_URL

// Ver todas las propiedades filtradas
const getAllPropertiesService = async (params = "") => {
    const res = await fetch(`${APIUrl}/properties?${params}`)

    return res
}

// Ver propiedades del usuario
const getUserPropertiesService = async (id, token) => {
    const res = await fetch(`${APIUrl}/users/${id}`, {
        headers: {
            Authorization: token,
        },
    })

    return res
}
// Ver una propiedad en detalle
const getPropertyDetailsService = async (id) => {
    const res = await fetch(`${APIUrl}/properties/${id}`)

    return res
}

const addPropertyService = async (authToken, propertyForm) => {
    const res = await fetch(`${APIUrl}/properties`, {
        method: "POST",
        headers: {
            Authorization: authToken,
        },
        body: propertyForm,
    })

    return res
}

export {
    getAllPropertiesService,
    getPropertyDetailsService,
    addPropertyService,
    getUserPropertiesService,
}
