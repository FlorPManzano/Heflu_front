import { useEffect, useState } from "react"
import {
    getBookingsService,
    addBookingService,
    confirmBookingService,
    cancelBookingService,
} from "../services/bookingsServices"
import useAuth from "./useAuth"

export const useBookings = () => {
    const [bookings, setBookings] = useState({})
    const [loading, setLoading] = useState(false)
    const { authUser, authToken } = useAuth()
    const [flag, setFlag] = useState(false)

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
    }, [authToken, authUser, flag])

    // Función para crear reservas
    const addBooking = async (propertyId, startDate, endDate) => {
        setLoading(true)
        try {
            const body = await addBookingService(
                authToken,
                propertyId,
                startDate,
                endDate
            )
            setFlag(!flag)
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Función para aceptar reservas
    const acceptBooking = async (bookingId) => {
        setLoading(true)
        try {
            const body = await confirmBookingService(authToken, bookingId)
            setFlag(!flag)
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }
    // Función para rechazar reservas
    const cancelBooking = async (bookingId) => {
        setLoading(true)
        try {
            const body = await cancelBookingService(authToken, bookingId)
            setFlag(!flag)
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        bookings,
        loading,
        addBooking,
        acceptBooking,
        cancelBooking,
    }
}
