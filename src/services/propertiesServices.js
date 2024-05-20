const APIUrl = import.meta.env.VITE_API_URL

// Ver todas las propiedades
const getAllPropertiesService = async () => {
    const res = await fetch(`${APIUrl}/properties`)

    if (res.status === 200) {
        const body = await res.json()

        return body
    }
    return
}

// Ver todas las propiedades filtradas
const getAllFilterPropertiesService = async (params = "") => {
    const res = await fetch(`${APIUrl}/properties?${params}`)

    if (res.status === 200) {
        const body = await res.json()

        return body
    }
    return
}

// Ver una propiedad en detalle
const getPropertyDetailsService = async (id) => {
    const res = await fetch(`${APIUrl}/properties/${id}`)

    if (res.status === 200) {
        const body = await res.json()

        return body
    }
    return
}

const addPropertyService = async (token, propertyForm) => {
    const res = await fetch(`${APIUrl}/properties`, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: propertyForm,
    })

    return res
}

export {
    getAllPropertiesService,
    getAllFilterPropertiesService,
    getPropertyDetailsService,
    addPropertyService,
}
