const APIUrl = import.meta.env.VITE_API_URL

// Ver todas las solicitudes de reserva a un usuario
const getOwnerBookingsService = async (token) => {
    const res = await fetch(`${APIUrl}/bookings/asOwner`, {
        headers: {
            Authorization: token,
        },
    })
    if (res.status !== 200) return
    const body = await res.json()

    return body
}

// Ver todas las solicitudes de reserva de un usuario
const getTenantBookingsService = async (token) => {
    const res = await fetch(`${APIUrl}/bookings/asTenant`, {
        headers: {
            Authorization: token,
        },
    })
    if (res.status !== 200) return
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
    if (res.status !== 200) return
    const body = await res.json()

    return body
}

// Aceptar una reserva
const confirmBookingService = async (token, id) => {
    const res = await fetch(`${APIUrl}/bookings/${id}`, {
        method: "PUT",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200) return
    const body = await res.json()

    return body
}

// Rechazar una reserva
const cancelBookingService = async (token, id) => {
    const res = await fetch(`${APIUrl}/bookings/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200) return
    const body = await res.json()

    return body
}

export {
    getOwnerBookingsService,
    getTenantBookingsService,
    addBookingService,
    confirmBookingService,
    cancelBookingService,
}
