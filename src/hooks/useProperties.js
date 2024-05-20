import { useEffect, useState } from "react"
import { Bounce, toast } from "react-toastify"
import {
    getAllPropertiesService,
    addPropertyService,
} from "../services/propertiesServices"
import useAuth from "./useAuth"

export const useProperties = () => {
    const [properties, setProperties] = useState([])
    const [userProperties, setUserProperties] = useState([])
    const [loading, setLoading] = useState(false)
    const { authToken, authUser } = useAuth()

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true)
                const body = await getAllPropertiesService()
                setProperties(body.data)
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProperties()
        if (authUser) fetchUserProperties()
    }, [authUser])

    // Función para añadir propiedades
    const addProperty = async (formData) => {
        setLoading(true)
        try {
            const res = await addPropertyService(authToken, formData)

            if (!res.ok) {
                const body = await res.json()
                toast.error(await body?.message, {
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

                return false
            }

            const body = await res.json()
            toast(await body?.message, {
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

            return body
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Función para filtrar propiedades por usuario

    const fetchUserProperties = async () => {
        try {
            setLoading(true)
            const body = await getAllPropertiesService()
            const filteredProperties = body.data.filter((property) => {
                return property.owner_id === authUser.id
            })
            setUserProperties(filteredProperties)
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        properties,
        loading,
        addProperty,
        userProperties,
        fetchUserProperties,
    }
}
