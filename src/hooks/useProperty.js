import { useEffect, useState } from "react"
import { getPropertyDetailsService } from "../services/propertiesServices"

export const useProperty = (id) => {
    const [property, setProperty] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProperty = async () => {
            try {
                setLoading(true)
                const res = await getPropertyDetailsService(id)
                if (res.ok) {
                    const body = await res.json()
                    setProperty(body.data)
                }
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
