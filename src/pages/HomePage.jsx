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
    const [minRooms, setMinRooms] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    // Sacar los distintos países
    const allCountrys = properties.map((property) => property.country)
    const uniqueCountrys = [...new Set(allCountrys)]

    const updateURL = (selectedCountry, selectedPrice, selectedRooms) => {
        const searchParams = new URLSearchParams(location.search)
        selectedCountry !== ""
            ? searchParams.set("country", selectedCountry)
            : searchParams.delete("country")
        selectedPrice !== ""
            ? searchParams.set("maxPrice", selectedPrice)
            : searchParams.delete("maxPrice")
        selectedRooms !== ""
            ? searchParams.set("minRooms", selectedRooms)
            : searchParams.delete("minRooms")
        navigate(`?${searchParams.toString()}`)
    }

    const handleSelectChangeCountry = (e) => {
        const selectedCountry = e.target.value
        setCountry(selectedCountry)
        updateURL(selectedCountry, maxPrice, minRooms)
    }

    const handleSelectChangeMinRooms = (e) => {
        const selectedRooms = e.target.value
        setMinRooms(selectedRooms)
        updateURL(country, maxPrice, selectedRooms)
    }

    const handleSelectChangeMaxPrice = (e) => {
        const selectedPrice = e.target.value
        setMaxPrice(selectedPrice)
        updateURL(country, selectedPrice, minRooms)
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
                    <select
                        value={country}
                        onChange={handleSelectChangeCountry}
                    >
                        <option value="">Todos</option>
                        {uniqueCountrys.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="">
                    Selecciona un precio máximo:
                    <select
                        value={maxPrice}
                        onChange={handleSelectChangeMaxPrice}
                    >
                        <option value="">Todos</option>
                        <option value="50">0-50</option>
                        <option value="100">51-100</option>
                        <option value="150">101-150</option>
                        <option value="200">151-200</option>
                        <option value="300">201-300</option>
                        <option value="999999">+300</option>
                    </select>
                </label>
                <label htmlFor="">
                    Selecciona habitaciones mínimas:
                    <select
                        value={minRooms}
                        onChange={handleSelectChangeMinRooms}
                    >
                        <option value="">Todas</option>
                        <option value="1">1 o más</option>
                        <option value="2">2 o más</option>
                        <option value="3">3 o más</option>
                        <option value="4">4 o más</option>
                    </select>
                </label>
                <div>
                    {/* Listado de propiedades */}
                    <ul className="grid grid-cols-4 my-10">
                        {filterProperties && filterProperties.length > 0 ? (
                            filterProperties.map((property) => (
                                <li
                                    key={property.id}
                                    onClick={(event) =>
                                        handleCardClick(event, property.id)
                                    }
                                >
                                    <h2>{property.country}</h2>
                                    <h4>{property.bedrooms} habitaciones</h4>
                                    <h5>{property.price} €</h5>
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
                            ))
                        ) : (
                            <li className="">
                                No hay propiedades con estos filtros.
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        </>
    )
}
