import { useEffect, useState } from "react"
import { getAllPropertiesService } from "../services/propertiesServices"

export const useProperties = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(false)

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

    return {
        properties,
        loading,
    }
}
