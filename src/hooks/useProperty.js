import { useEffect, useState } from "react"
import { getPropertyDetailsService } from "../services/propertiesServices"

export const useProperty = (id) => {
    const [property, setProperty] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProperty = async () => {
            try {
                setLoading(true)
                const property = await getPropertyDetailsService(id)
                setProperty(property.data)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getProperty()
    }, [id])

    return {
        property,
        loading,
    }
}
