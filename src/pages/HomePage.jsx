import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth.js"
import { useProperties } from "../hooks/useProperties.js"
import { useFilterProperties } from "../hooks/useFilterProperties.js"

import { getAllFilterPropertiesService } from "../services/propertiesServices.js"

// Importación de componentes
import Hero from "../components/Hero"

const APIUrl = import.meta.env.VITE_API_URL

export default function HomePage() {
    const { properties } = useProperties()
    const { filterProperties, setFilterProperties } = useFilterProperties()
    const [country, setCountry] = useState("")
    const navigate = useNavigate()
    const params = useLocation().search

    // Sacar todas los distintos países
    const allCountrys = properties.map((property) => property.country)
    const uniqueCountrys = [...new Set(allCountrys)]

    const handleCardClick = async (e, key) => {
        e.preventDefault()
        navigate(`/properties/${key}`)
    }

    const handleFilterChange = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Hero />

            {/* Listado de propiedades */}
            <section>
                {/* Filtros */}
                <form className="mb-6" action="" onSubmit={handleFilterChange}>
                    <label htmlFor="">Selecciona un país: </label>
                    <select
                        name=""
                        id=""
                        value={country}
                        defaultValue="Elige un destino"
                        onChange={(e) => {
                            setCountry(e.target.value)
                        }}
                    >
                        <option selected value="Elige un destino">
                            Elige un destino
                        </option>
                        {uniqueCountrys.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </form>
                <div>
                    <ul className="grid grid-cols-4">
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
