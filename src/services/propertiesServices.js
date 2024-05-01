const APIUrl = import.meta.env.VITE_API_URL

// Ver todas las propiedades
const getAllPropertiesService = async () => {
    const res = await fetch(`${APIUrl}/properties`)

    const body = await res.json()

    return body
}

// Ver todas las propiedades filtradas
const getAllFilterPropertiesService = async (params = "") => {
    const res = await fetch(`${APIUrl}/properties?${params}`)
    if (res.status !== 200) {
        return
    }
    const body = await res.json()

    return body
}

// Ver una propiedad en detalle
const getPropertyDetailsService = async (id) => {
    const res = await fetch(`${APIUrl}/properties/${id}`)
    const body = await res.json()

    return body
}

const addPropertyService = async (token, propertyForm) => {
    const res = await fetch(`${APIUrl}/properties`, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: propertyForm,
    })
    const body = await res.json()

    return body
}

export {
    getAllPropertiesService,
    getAllFilterPropertiesService,
    getPropertyDetailsService,
    addPropertyService,
}
