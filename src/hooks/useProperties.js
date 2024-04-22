import { useEffect, useState } from "react"
import {
    getAllPropertiesService,
    addPropertyService,
} from "../services/propertiesServices"
import useAuth from "./useAuth"

export const useProperties = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(false)
    const { authToken } = useAuth()

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
    }, [])

    // Función para añadir propiedades
    const addProperty = async (formData) => {
        setLoading(true)
        try {
            const body = await addPropertyService(authToken, formData)
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
    }
}
