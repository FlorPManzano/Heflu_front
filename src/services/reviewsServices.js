const APIUrl = import.meta.env.VITE_API_URL

// Ver todas las reseñas pendientes de un usuario
const getReviewsService = async (token) => {
    const res = await fetch(`${APIUrl}/reviews/pending`, {
        headers: {
            Authorization: token,
        },
    })
    const body = await res.json()

    return body
}

// Crear una reseña
const addReviewService = async (token, booking_id, rating, comment) => {
    const res = await fetch(`${APIUrl}/reviews`, {
        method: "POST",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId: booking_id, rating, comment }),
    })
    const body = await res.json()

    return body
}

export { getReviewsService, addReviewService }
