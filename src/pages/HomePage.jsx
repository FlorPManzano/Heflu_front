import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth.js"
import { useProperties } from "../hooks/useProperties.js"
import { useFilterProperties } from "../hooks/useFilterProperties.js"

// Importación de componentes
import Hero from "../components/Hero"

const APIUrl = import.meta.env.VITE_API_URL

export default function HomePage() {
    const { properties } = useProperties()
    const { filterProperties } = useFilterProperties()
    const [country, setCountry] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    // Sacar los distintos países
    const allCountrys = properties.map((property) => property.country)
    const uniqueCountrys = [...new Set(allCountrys)]

    const updateURL = (selectedCountry) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("country", selectedCountry)
        navigate(`?${searchParams.toString()}`)
    }

    const handleSelectChange = (e) => {
        const selectedCountry = e.target.value
        setCountry(selectedCountry)
        updateURL(selectedCountry)
    }

    const handleCardClick = async (e, key) => {
        e.preventDefault()
        navigate(`/properties/${key}`)
    }

    return (
        <>
            <Hero />

            <section>
                {/* Filtros */}
                <label htmlFor="">
                    Selecciona un destino:
                    <select value={country} onChange={handleSelectChange}>
                        <option value="">Todos</option>
                        {uniqueCountrys.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </label>
                <div>
                    {/* Listado de propiedades */}
                    <ul className="grid grid-cols-4 mb-10">
                        {filterProperties &&
                            filterProperties.map((property) => (
                                <li
                                    key={property.id}
                                    onClick={(event) =>
                                        handleCardClick(event, property.id)
                                    }
                                >
                                    <h2>{property.country}</h2>
                                    <ul>
                                        {property &&
                                            property.property_images.map(
                                                (image) => {
                                                    return (
                                                        <li key={image}>
                                                            <img
                                                                style={{
                                                                    width: "100px",
                                                                }}
                                                                src={`${APIUrl}/${image}`}
                                                                alt=""
                                                            />
                                                        </li>
                                                    )
                                                }
                                            )}
                                    </ul>
                                </li>
                            ))}
                    </ul>
                </div>
            </section>
        </>
    )
}
