import { useEffect, useState } from "react"
import { getUserReviewsProfileService } from "../services/userServices"
import { getUserProfileService } from "../services/userServices"
import useAuth from "./useAuth"

export const useUser = (id) => {
    const [user, setUser] = useState({})
    const [userReviews, setUserReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [userProperties, setUserProperties] = useState([])
    const { authToken } = useAuth()
    useEffect(() => {
        // Función para obtener las reseñas al usuario.
        const getUserReviews = async () => {
            try {
                setLoading(true)
                if (!authToken) return
                const reviews = await getUserReviewsProfileService(
                    authToken,
                    id
                )

                if (!reviews) return setReviews([])

                setUserReviews(reviews.data)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getUserReviews()

        const getUser = async () => {
            try {
                setLoading(true)
                if (!authToken) return
                const user = await getUserProfileService(authToken, id)

                if (!user) return

                setUser(user.data.user)
                setUserProperties(user.data.userProperties)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getUser()
    }, [authToken, id])

    return {
        userReviews,
        user,
        loading,
        userProperties,
    }
}
