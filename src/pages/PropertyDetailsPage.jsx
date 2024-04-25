import { useParams } from "react-router-dom"
import { useState } from "react"
import { useProperty } from "../hooks/useProperty"
import { useBookings } from "../hooks/useBookings"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import ReviewCard from "../components/ReviewCard"
import BentoGrid from "../components/BentoGrid"

import { PiBathtub } from "react-icons/pi"
import { BiArea } from "react-icons/bi"
import { IoBedOutline } from "react-icons/io5"
import { FaStar } from "react-icons/fa6"

const APIUrl = import.meta.env.VITE_API_URL

export default function PropertyDetailsPage() {
    const { id } = useParams()
    const { property } = useProperty(id)
    const { addBooking } = useBookings()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    let {
        country,
        location,
        type,
        bedrooms,
        price,
        bathrooms,
        property_images,
        media_rating,
        description,
        title,
        area,
    } = property

    const onChange = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formatStartDate = formatDate(startDate)
        const formatEndDate = formatDate(endDate)
        addBooking(id, formatStartDate, formatEndDate)
    }

    // Formatear fecha a yyyy-mm-dd
    const formatDate = (date) => {
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        const month = (newDate.getMonth() + 1).toString().padStart(2, "0")
        const day = newDate.getDate().toString().padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    return (
        <section className="flex flex-col items-center mt-32 mb-10 mx-6 text-primary">
            <ul className="flex items-center justify-center mb-10">
                {property_images && property_images.length > 0 && (
                    <BentoGrid images={property_images} />
                )}
            </ul>
            <section className="flex lg:w-10/12 justify-between gap-6 items-start  mb-4 ">
                <div className="flex grow flex-col gap-4">
                    <h1 className="font-bold text-3xl">{title}</h1>
                    <h2 className="italic text-2xl ">{`${location}, ${country}`}</h2>
                    <ul className=" font-semibold flex gap-4">
                        <li>
                            <ul className="flex items-center gap-2 mb-2">
                                <li className="text-black">
                                    <IoBedOutline />
                                </li>
                                <li>{bedrooms}</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="flex items-center gap-2">
                                <li className="text-black">
                                    <PiBathtub />
                                </li>
                                <li>{bathrooms}</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="flex items-center gap-2 mb-2">
                                <li className="text-black">
                                    <BiArea />
                                </li>
                                <li>{`${area} m²`}</li>
                            </ul>
                        </li>
                    </ul>
                    <p className=" leading-relaxed text-justify">
                        {description}
                    </p>
                </div>
                <ul className="text-xs flex justify-end items-center gap-1 mb-2">
                    <li className=" text-nowrap max-w-28 h-8 rounded-2xl p-2 text-white bg-emerald-500">
                        {type}
                    </li>
                    <li className=" text-nowrap max-w-28 h-8 rounded-2xl p-2 text-white bg-violet-700">
                        {country}
                    </li>
                </ul>
                <section className="flex flex-col justify-self-end justify-end p-4 border rounded-xl">
                    <h2 className="mb-2">
                        <b className=" text-xl font-bold pr-2 ">{price} € </b>
                        por noche
                    </h2>
                    <form
                        className="flex flex-col justify-end gap-2 border-t"
                        action=""
                        onSubmit={handleSubmit}
                    >
                        <DatePicker
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            selectsRange
                            selectsDisabledDaysInRange
                            placeholderText="Selecciona un rango de fechas"
                            showIcon
                            className="text-primary"
                        />
                        <button className="bg-violet-700 border border-violet-700 text-white px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
                            Reservar
                        </button>
                    </form>
                </section>
            </section>
            <section className="flex flex-col md:w-10/12 ">
                <header className=" flex mb-2 flex-col gap-2">
                    <h2 className=" font-semibold text-3xl my-4 text-violet-700">
                        Anfitrión
                    </h2>
                    <figure className="flex items-start gap-4">
                        <img
                            className=" w-20 rounded-full"
                            src={`${APIUrl}/${property.avatar}`}
                            alt=""
                        />
                        <ul>
                            <li>
                                <h4 className=" font-semibold text-2xl">
                                    {property.name}
                                </h4>
                            </li>
                            <li>
                                <ul className="flex items-center gap-2 mb-2">
                                    <li className="text-primary">
                                        <FaStar />
                                    </li>
                                    <li className="font-semibold pt-1">
                                        {media_rating}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </figure>
                </header>
                <ul className=" flex gap-5 mt-2 p-4 border-t  border-gray-500 ">
                    {property.reviews &&
                        property.reviews.map((review) => (
                            <li key={review.id}>
                                <ReviewCard review={review}></ReviewCard>
                            </li>
                        ))}
                </ul>
            </section>
        </section>
    )
}
