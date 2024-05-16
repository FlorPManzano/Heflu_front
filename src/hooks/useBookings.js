import { useEffect, useState } from "react"
import {
    getBookingsService,
    addBookingService,
    confirmBookingService,
    cancelBookingService,
} from "../services/bookingsServices"
import useAuth from "./useAuth"

import { toast, Bounce } from "react-toastify"

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

                if (bookings == undefined) {
                    setBookings([])
                } else {
                    setBookings(bookings.data)
                }
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

            if (body.status === 400) {
                toast.error(body.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                return
            }

            if (body.status !== "ok") {
                toast.error(body.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                return
            }

            if (body.status === "ok") {
                toast(body.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                setFlag(!flag)
            }
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
            if (body.status === "ok") {
                setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking.id !== bookingId)
                )
                setFlag(!flag)
                toast("¡Has aceptado la reserva!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
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
            if (body.status === "ok") {
                setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking.id !== bookingId)
                )
                setFlag(!flag)
                toast("¡Has rechazado la reserva!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
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
