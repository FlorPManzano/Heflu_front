import { useParams } from "react-router-dom"
import { useState } from "react"
import { useProperty } from "../hooks/useProperty"
import { useBookings } from "../hooks/useBookings"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const APIUrl = import.meta.env.VITE_API_URL

export default function PropertyDetailsPage() {
    const { id } = useParams()
    const { property } = useProperty(id)
    const { addBooking } = useBookings()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

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
        <section className="mt-32 mb-10 mx-6 text-primary">
            <h1>{property.title}</h1>
            <p>{property.description}</p>
            <div className="flex">
                {property.property_images &&
                    property.property_images.map((image) => (
                        <img
                            src={`${APIUrl}/${image}`}
                            alt=""
                            key={image}
                            style={{
                                height: "100px",
                            }}
                        />
                    ))}
            </div>
            <div className="flex flex-col max-w-52">
                <h2>
                    <span className="font-semibold ">{property.price} € </span>
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
            </div>
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
