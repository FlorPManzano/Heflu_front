import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useProperties } from "../hooks/useProperties.js"

// Importación de componentes
import Hero from "../components/Hero"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ListPropertiesCards from "../components/ListPropertiesCards.jsx"
import { useCountries } from "../hooks/useCountries.js"

export default function HomePage({ properties }) {
    const countries = useCountries()
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const [country, setCountry] = useState(searchParams.get("country") || "")
    const [minRooms, setMinRooms] = useState(searchParams.get("minRooms") || "")
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
    const [startDate, setStartDate] = useState(
        searchParams.get("startDate") || ""
    )
    const [endDate, setEndDate] = useState(searchParams.get("endDate") || "")

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

    return (
        <>
            <Hero />

            <section className="m-10 flex flex-col items-center  ">
                {/* Filtros */}
                {countries.length > 0 && (
                    <div className=" justify-self-end border border-gray-400 flex p-8 gap-x-10 justify-between items-baseline rounded-xl ">
                        <label htmlFor="country" className="block mb-2">
                            <select
                                value={country}
                                id="country"
                                onChange={handleSelectChangeCountry}
                                className=" border border-gray-400 text-violet-700 text-md font-medium rounded-lg focus:ring-violet-700 focus:border-violet-700 block w-full p-2.5"
                            >
                                <option value="">Destino</option>
                                {countries.map((country) => (
                                    <option
                                        className="text-violet-700 "
                                        key={country}
                                        value={country}
                                    >
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label
                            htmlFor="maxPrice"
                            className="block mb-2 text-md font-medium text-violet-700"
                        >
                            <select
                                value={maxPrice}
                                id="maxPrice"
                                onChange={handleSelectChangeMaxPrice}
                                className=" border border-gray-400 text-violet-700 text-md font-medium rounded-lg focus:ring-violet-700 focus:border-violet-700 block w-full p-2.5"
                            >
                                <option value="">Precio máximo</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="150">150</option>
                                <option value="999999">+200</option>
                            </select>
                        </label>
                        <label
                            htmlFor="minRooms"
                            className="block mb-2 text-md font-medium text-violet-700"
                        >
                            <select
                                value={minRooms}
                                id="minRooms"
                                onChange={handleSelectChangeMinRooms}
                                className=" border border-gray-400 text-violet-700 text-md font-medium rounded-lg focus:ring-violet-700 focus:border-violet-700 block w-full p-2.5"
                            >
                                <option value="">Habitaciones mínimas</option>
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
                            placeholderText="Rango de fechas"
                            showIcon
                            className="text-primary"
                        />

                        <button
                            className="bg-violet-700 border border-violet-700 text-white px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                            onClick={handleClearFilters}
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}

                <section className=" flex-col justify-center items-center min-h-40 mt-5">
                    {properties?.length > 0 ? (
                        <ListPropertiesCards properties={properties} />
                    ) : (
                        <p className="grow text-2xl text-center">
                            Uy, parece que no hay ninguna propiedad disponible
                            con esos filtros 😅
                        </p>
                    )}
                </section>
            </section>
        </>
    )
}
