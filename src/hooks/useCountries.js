import { getAllPropertiesService } from "../services/propertiesServices"
import { useEffect, useState } from "react"

export const useCountries = () => {
    const [countries, setCountries] = useState([])
    const fetchCountries = async () => {
        const res = await getAllPropertiesService()

        if (res.ok) {
            const body = await res.json()
            const properties = await body.data

            // Sacar los distintos países
            const countries = await properties.map(
                (property) => property.country
            )
            const filteredCountries = [...new Set(countries)]
            setCountries([...filteredCountries])
        }
    }
    useEffect(() => {
        fetchCountries()
        console.log(countries)
    }, [])

    return countries
}
