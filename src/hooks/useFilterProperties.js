import { useEffect, useState } from "react"
import { getAllFilterPropertiesService } from "../services/propertiesServices"
import { useSearchParams } from "react-router-dom"

export const useFilterProperties = () => {
    const [filterProperties, setFilterProperties] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true)
                const body = await getAllFilterPropertiesService(searchParams)
                setFilterProperties(body?.data)
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProperties()
    }, [searchParams])

    return {
        filterProperties,
        setFilterProperties,
        loading,
        searchParams,
        setSearchParams,
    }
}
