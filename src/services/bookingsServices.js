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

// Crear una reserva
const addBookingService = async (
    token,
    property_id,
    starting_date,
    ending_date
) => {
    const res = await fetch(`${APIUrl}/bookings`, {
        method: "POST",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: property_id, starting_date, ending_date }),
    })
    const body = await res.json()

    return body
}

export { getBookingsService, addBookingService }
