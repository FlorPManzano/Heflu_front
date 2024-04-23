import { useEffect, useState } from "react"
import {
    getReviewsService,
    addReviewService,
} from "../services/reviewsServices"
import useAuth from "./useAuth"

export const useReviews = () => {
    const [reviews, setReviews] = useState({})
    const [loading, setLoading] = useState(false)
    const { authUser, authToken } = useAuth()

    useEffect(() => {
        const getReviews = async () => {
            try {
                setLoading(true)
                if (!authUser || !authToken) return
                const reviews = await getReviewsService(authToken)
                if (!reviews) return console.log("No reviews found")
                setReviews(reviews.data)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getReviews()
    }, [authToken, authUser])

    // Función para crear reseñas
    const addReview = async (bookingId, rating, comment) => {
        setLoading(true)
        try {
            const body = await addReviewService(
                authToken,
                bookingId,
                rating,
                comment
            )
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        reviews,
        loading,
        addReview,
    }
}
