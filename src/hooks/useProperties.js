import { useEffect, useState } from "react"
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
            const body = await addPropertyService(authToken, formData)
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
