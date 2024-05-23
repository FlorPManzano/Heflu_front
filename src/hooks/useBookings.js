import { useEffect, useState } from "react"
import {
    getOwnerBookingsService,
    getTenantBookingsService,
    addBookingService,
    confirmBookingService,
    cancelBookingService,
} from "../services/bookingsServices"
import useAuth from "./useAuth"

import { toast, Bounce } from "react-toastify"

export const useBookings = () => {
    const [ownerBookings, setOwnerBookings] = useState({})
    const [tenantBookings, setTenantBookings] = useState({})
    const [loading, setLoading] = useState(false)
    const { authUser, authToken } = useAuth()
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        const getOwnerBookings = async () => {
            try {
                setLoading(true)
                if (!authUser || !authToken) return
                const bookings = await getOwnerBookingsService(authToken)

                if (bookings == undefined) {
                    setOwnerBookings([])
                } else {
                    setOwnerBookings(bookings.data)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        const getTenantBookings = async () => {
            try {
                setLoading(true)
                if (!authUser || !authToken) return
                const bookings = await getTenantBookingsService(authToken)
                if (bookings == undefined) {
                    setTenantBookings([])
                } else {
                    setTenantBookings(bookings.data)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        getOwnerBookings()
        getTenantBookings()
    }, [authToken, authUser, flag])

    // Función para crear reservas
    const addBooking = async (propertyId, startDate, endDate) => {
        setLoading(true)
        try {
            const res = await addBookingService(
                authToken,
                propertyId,
                startDate,
                endDate
            )
            console.log(res)
            if (res.ok == false) {
                const body = await res.json()
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

            if (res.ok) {
                const body = await res.json()
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
                setOwnerBookings((prevBookings) =>
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
                setOwnerBookings((prevBookings) =>
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
        tenantBookings,
        ownerBookings,
        loading,
        addBooking,
        acceptBooking,
        cancelBooking,
    }
}
