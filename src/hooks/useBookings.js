import { useEffect, useState } from "react"
import { getBookingsService } from "../services/bookingsServices"
import useAuth from "./useAuth"

export const useBookings = () => {
    const [bookings, setBookings] = useState({})
    const [loading, setLoading] = useState(false)
    const { authUser, authToken } = useAuth()

    useEffect(() => {
        const getBookings = async () => {
            try {
                setLoading(true)
                if (!authUser || !authToken) return
                const bookings = await getBookingsService(authToken)
                if (!bookings) return console.log("No bookings found")
                setBookings(bookings.data)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getBookings()
    }, [authToken, authUser])

    return {
        bookings,
        loading,
    }
}
