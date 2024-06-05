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
                const res = await getUserReviewsProfileService(authToken, id)

                if (res.ok) {
                    const body = await res.json()

                    if (res.status !== 200) return setUserReviews([])

                    setUserReviews(body.data)
                }
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
                const res = await getUserProfileService(authToken, id)
                if (res.ok) {
                    const body = await res.json()
                    setUser(body.data.user)
                    setUserProperties(body.data.userProperties)
                }
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
