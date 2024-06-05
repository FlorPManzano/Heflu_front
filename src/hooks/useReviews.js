import { useEffect, useState } from "react"
import {
    getReviewsService,
    addReviewService,
} from "../services/reviewsServices"

import { sendErrorToast, sendSuccessToast } from "../utils/sendToast"

import useAuth from "./useAuth"

export const useReviews = () => {
    const [reviews, setReviews] = useState({})
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState(false)
    const { authUser, authToken } = useAuth()

    useEffect(() => {
        const getReviews = async () => {
            try {
                setLoading(true)
                if (!authUser || !authToken) return
                const res = await getReviewsService(authToken)

                if (res.ok) {
                    if (res.status == 200) {
                        const body = await res.json()
                        setReviews(body.data)
                    } else return setReviews([])
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getReviews()
    }, [authToken, authUser, flag])

    // Función para crear reseñas
    const addReview = async (bookingId, rating, comment) => {
        setLoading(true)
        try {
            const res = await addReviewService(
                authToken,
                bookingId,
                rating,
                comment
            )
            if (res.ok) {
                const body = await res.json()
                setFlag(!flag)
                sendSuccessToast(body)
                return true
            } else {
                const body = await res.json()
                sendErrorToast(body)
            }
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
