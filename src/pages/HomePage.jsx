import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth.js"
import { useProperties } from "../hooks/useProperties.js"
import { useFilterProperties } from "../hooks/useFilterProperties.js"

// Importación de componentes
import Hero from "../components/Hero"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import PropertyCard from "../components/PropertyCard.jsx"
const APIUrl = import.meta.env.VITE_API_URL

export default function HomePage() {
    const { properties } = useProperties()
    const { filterProperties } = useFilterProperties()
    const [country, setCountry] = useState("")
    const [minRooms, setMinRooms] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    // Sacar los distintos países
    const allCountrys = properties.map((property) => property.country)
    const uniqueCountrys = [...new Set(allCountrys)]

    // Formatear fecha a yyyy-mm-dd
    const formatDate = (date) => {
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        const month = (newDate.getMonth() + 1).toString().padStart(2, "0")
        const day = newDate.getDate().toString().padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    // Función para actualizar los params dependiendo de los filtros
    const updateURL = (
        selectedCountry,
        selectedPrice,
        selectedRooms,
        selectedStartDate,
        selectedEndDate
    ) => {
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
        selectedStartDate !== ""
            ? searchParams.set("startDate", selectedStartDate)
            : searchParams.delete("startDate")
        navigate(`?${searchParams.toString()}`)
        selectedEndDate !== ""
            ? searchParams.set("endDate", selectedEndDate)
            : searchParams.delete("endDate")
        navigate(`?${searchParams.toString()}`)
    }

    const handleSelectChangeCountry = (e) => {
        const selectedCountry = e.target.value
        setCountry(selectedCountry)
        updateURL(selectedCountry, maxPrice, minRooms, startDate, endDate)
    }

    const handleSelectChangeMinRooms = (e) => {
        const selectedRooms = e.target.value
        setMinRooms(selectedRooms)
        updateURL(country, maxPrice, selectedRooms, startDate, endDate)
    }

    const handleSelectChangeMaxPrice = (e) => {
        const selectedPrice = e.target.value
        setMaxPrice(selectedPrice)
        updateURL(country, selectedPrice, minRooms, startDate, endDate)
    }

    const handleSelectChangeDates = (dates) => {
        const [start, end] = dates
        const startFormatted = formatDate(start)
        const endFormatted = formatDate(end)
        setStartDate(start)
        setEndDate(end)
        updateURL(country, maxPrice, minRooms, startFormatted, endFormatted)
    }

    const handleClearFilters = () => {
        setStartDate(null)
        setEndDate(null)
        setCountry("")
        setMaxPrice("")
        setMinRooms("")
        updateURL("", "", "", "", "")
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
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                        <option value="999999">+200</option>
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
                <DatePicker
                    selected={startDate}
                    onChange={handleSelectChangeDates}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    selectsRange
                    selectsDisabledDaysInRange
                    placeholderText="Selecciona un rango de fechas"
                    showIcon
                    className="text-primary"
                />

                <button
                    className="bg-violet-700 border border-violet-700 text-white px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    onClick={handleClearFilters}
                >
                    Limpiar filtros
                </button>
                <div>
                    {/* Listado de propiedades */}
                    <ul className="flex flex-wrap justify-center gap-4 my-10">
                        {filterProperties && filterProperties.length > 0 ? (
                            filterProperties.map((property) => (
                                <li
                                    key={property.id}
                                    onClick={(event) =>
                                        handleCardClick(event, property.id)
                                    }
                                >
                                    <PropertyCard
                                        property={property}
                                    ></PropertyCard>
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
