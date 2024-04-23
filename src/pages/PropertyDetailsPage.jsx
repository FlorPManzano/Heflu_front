import { useParams } from "react-router-dom"
import { useState } from "react"
import { useProperty } from "../hooks/useProperty"
import { useBookings } from "../hooks/useBookings"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

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
        <section className=" flex flex-col mt-32 mb-10 mx-6 text-primary">
            <ul className="flex  items-center gap-4 justify-around flex-wrap mb-6">
                {property_images &&
                    property_images.map((image, index) => (
                        <li
                            key={image}
                            className={`${index == 0 ? "flex-grow " : ""}w-max h-80`}
                        >
                            <img
                                src={`${APIUrl}/${image}`}
                                alt=""
                                className=" h-80 object-contain"
                            />
                        </li>
                    ))}
            </ul>
            <section className=" flex max-w-screen-xl   items-start  mb-4 ">
                <ul className="flex flex-col gap-4">
                    <li>
                        <h1 className=" font-bold text-3xl">{title}</h1>
                    </li>
                    <li>
                        <h2 className="font-semibold text-2xl ">{`${location}, ${country}`}</h2>
                    </li>
                    <li>
                        <ul className="flex gap-4">
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
                                    <li>{`${area} metros cuadrados`}</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <section>
                            <p>{description}</p>
                        </section>
                    </li>
                </ul>
                {/*Etiquetas*/}
                <ul className="flex items-center gap-2">
                    <li className="flex items-center text-center h-8 rounded-2xl  text-white bg-emerald-500">
                        <span className="p-2">{type}</span>
                    </li>
                    <li className=" flex items-center text-center h-8 rounded-2xl p-2 text-white bg-violet-700">
                        <span className="p-2">{country}</span>
                    </li>
                </ul>
                <section className="flex flex-col max-w-52">
                    <h2>
                        <span className="font-semibold ">{price} € </span>
                        por noche
                    </h2>
                    <form action="" onSubmit={handleSubmit}>
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

            <h2>Anfitrion</h2>
            <div>
                <h4>{property.name}</h4>
                <img
                    src={`${APIUrl}/${property.avatar}`}
                    alt=""
                    style={{
                        width: "100px",
                    }}
                />

                <h3>Reviews</h3>
                {property.reviews &&
                    property.reviews.map((review) => (
                        <div key={review.id}>
                            <h5>{review.name}</h5>
                            <p>{review.comment}</p>
                            <p>{review.rating} ⭐</p>
                        </div>
                    ))}
            </div>
        </section>
    )
}
