const APIUrl = import.meta.env.VITE_API_URL

// Ver todas las reseñas pendientes de un usuario
const getReviewsService = async (token) => {
    const res = await fetch(`${APIUrl}/reviews/pending`, {
        headers: {
            Authorization: token,
        },
    })

    return res
}

// Crear una reseña
const addReviewService = async (token, id, rating, comment) => {
    const res = await fetch(`${APIUrl}/reviews/${id}`, {
        method: "POST",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, comment }),
    })

    return res
}

export { getReviewsService, addReviewService }
