const APIUrl = import.meta.env.VITE_API_URL

// Ver todas las solicitudes de reserva de un usuario
const getBookingsService = async (token) => {
    const res = await fetch(`${APIUrl}/bookings`, {
        headers: {
            Authorization: token,
        },
    })

    const body = await res.json()

    return body
}

export { getBookingsService }
