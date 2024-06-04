import { useEffect, useState } from "react"
import {
    getOwnerBookingsService,
    getTenantBookingsService,
    addBookingService,
    confirmBookingService,
    cancelBookingService,
} from "../services/bookingsServices"
import useAuth from "./useAuth"
import { sendErrorToast, sendSuccessToast } from "../utils/sendToast"

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

                const res = await getOwnerBookingsService(authToken)

                if (res.ok == false) {
                    const body = await res.json()
                    sendErrorToast(body)
                }

                let bookings

                if (res.status === 200) bookings = await res.json()

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

                const res = await getTenantBookingsService(authToken)

                if (res.ok == false) {
                    const body = await res.json()
                    sendErrorToast(body)
                }

                let bookings

                if (res.status === 200) bookings = await res.json()

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

            if (res.ok == false) {
                const body = await res.json()
                sendErrorToast(body)
                return
            }

            if (res.ok) {
                const body = await res.json()
                sendSuccessToast(body)
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
            const res = await confirmBookingService(authToken, bookingId)
            if (res.ok) {
                const body = await res.json()
                setOwnerBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking.id !== bookingId)
                )
                setFlag(!flag)
                sendSuccessToast(body)
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
    // Función para rechazar reservas
    const cancelBooking = async (bookingId) => {
        setLoading(true)
        try {
            const res = await cancelBookingService(authToken, bookingId)
            if (res.ok) {
                setOwnerBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking.id !== bookingId)
                )
                setFlag(!flag)
                const body = await res.json()
                sendSuccessToast(body)
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
        tenantBookings,
        ownerBookings,
        loading,
        addBooking,
        acceptBooking,
        cancelBooking,
    }
}
