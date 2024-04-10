const APIUrl = import.meta.env.VITE_API_URL

// Ver todas las propiedades
const getAllPropertiesService = async () => {
    const res = await fetch(`${APIUrl}/properties`)

    const body = await res.json()

    return body
}

export { getAllPropertiesService }
