import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { useProperties } from "../hooks/useProperties"
import { getUserReviewsProfileService } from "../services/userServices"
import { FaStar } from "react-icons/fa"
const APIUrl = import.meta.env.VITE_API_URL

export default function ViewUserProfilePage() {
    const { authUser, authToken } = useAuth()
    const { properties } = useProperties()
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true)
                if (!authUser) return
                const body = await getUserReviewsProfileService(
                    authToken,
                    authUser.id
                )
                setReviews(body.data)
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchReviews()
    }, [authUser])

    // Función para formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString)

        const months = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ]

        // Obtener día, mes y año
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()

        // Obtener hora y minutos
        let hour = date.getHours()
        const minutes = date.getMinutes()

        // Formatear hora a AM/PM
        const ampm = hour >= 12 ? "PM" : "AM"
        hour = hour % 12 || 12

        // Formatear minutos con dos dígitos
        const formatMins = minutes < 10 ? "0" + minutes : minutes

        // Formatear la fecha completa
        const formattedDate = `${day} ${month} ${year}, ${hour}:${formatMins} ${ampm}`

        return formattedDate
    }

    // Función para sacar la media de las valoraciones
    const getMediaRating = (type) => {
        if (type === "as_owner") {
            const filterReviews = reviews.filter(
                (review) => review.rev_type === type
            )
            const media =
                filterReviews.reduce(
                    (acc, review) => acc + parseInt(review.rating),
                    0
                ) / filterReviews.length

            return media.toFixed(1)
        }
        if (type === "as_tenant") {
            const filterReviews = reviews.filter(
                (review) => review.rev_type === type
            )
            const media =
                filterReviews.reduce(
                    (acc, review) => acc + parseInt(review.rating),
                    0
                ) / filterReviews.length

            return media.toFixed(1)
        }
    }

    return (
        <section className="mt-32 mb-10 mx-6 text-primary">
            <h2 className="text-xl text-violet-700 font-bold border-b border-primary/80 pb-2 mb-4 tracking-wide">
                Ver perfil
            </h2>
            {authUser && (
                <>
                    <div className="flex items-center justify-start gap-x-2 mb-4">
                        <img
                            className="rounded-full w-16"
                            src={`${APIUrl}/${authUser.avatar}`}
                            alt=""
                        />
                        <div>
                            <h4 className="font-semibold text-lg">
                                {authUser.name}
                            </h4>
                            <p className="flex gap-x-2 font-medium text-sm">
                                Valoración Media:{" "}
                                <span className="flex items-center gap-x-1">
                                    <FaStar className="text-md" />{" "}
                                    {authUser.media_rating}
                                </span>
                            </p>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-4">
                        {authUser.bio}
                    </p>
                    <h3 className="font-semibold text-lg capitalize mb-4">
                        Alquileres Publicados
                    </h3>
                    <ul className="grid grid-cols-4 mb-4">
                        {properties &&
                            properties
                                .filter(
                                    (property) =>
                                        property.owner_id === authUser.id
                                )
                                .map((property) => {
                                    return (
                                        <li key={property.id}>
                                            <h2>{property.country}</h2>
                                            <h2>{property.id}</h2>
                                            <h4>
                                                {property.bedrooms} habitaciones
                                            </h4>
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
                                    )
                                })}
                    </ul>
                </>
            )}

            <div className="flex justify-start items-start gap-6">
                <div className="w-1/2">
                    <div className="flex items-center gap-4 mb-4">
                        <h3 className="font-semibold text-lg capitalize ">
                            Valoraciones como casero
                        </h3>
                        <p className="flex items-center justify-center gap-1">
                            <span>
                                <FaStar />
                            </span>
                            {getMediaRating("as_owner")}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {reviews &&
                            reviews
                                .filter(
                                    (review) => review.rev_type === "as_owner"
                                )
                                .map((review) => {
                                    return (
                                        <div key={review.id}>
                                            <header>
                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-x-2">
                                                            <img
                                                                className="rounded-full w-12"
                                                                src={`${APIUrl}/${review.avatar}`}
                                                                alt=""
                                                            />
                                                            <div>
                                                                <p className="text-sm font-medium">
                                                                    {
                                                                        review.name
                                                                    }
                                                                </p>
                                                                <p className="text-xs font-normal">
                                                                    {formatDate(
                                                                        review.created_at
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row items-center justify-center gap-x-1">
                                                            <FaStar className="text-sm" />
                                                            <p className="text-sm">
                                                                {review.rating}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </header>
                                            <p>{review.comment}</p>
                                        </div>
                                    )
                                })}
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="flex items-center gap-4 mb-4">
                        <h3 className="font-semibold text-lg capitalize ">
                            Valoraciones como inquilino
                        </h3>
                        <p className="flex items-center justify-center gap-1">
                            <span>
                                <FaStar />
                            </span>
                            {getMediaRating("as_tenant")}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {reviews &&
                            reviews
                                .filter(
                                    (review) => review.rev_type === "as_tenant"
                                )
                                .map((review) => {
                                    return (
                                        <div key={review.id}>
                                            <header>
                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-x-2">
                                                            <img
                                                                className="rounded-full w-12"
                                                                src={`${APIUrl}/${review.avatar}`}
                                                                alt=""
                                                            />
                                                            <div>
                                                                <p className="text-sm font-medium">
                                                                    {
                                                                        review.name
                                                                    }
                                                                </p>
                                                                <p className="text-xs font-normal">
                                                                    {formatDate(
                                                                        review.created_at
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row items-center justify-center gap-x-1">
                                                            <FaStar className="text-sm" />
                                                            <p className="text-sm">
                                                                {review.rating}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </header>
                                            <p>{review.comment}</p>
                                        </div>
                                    )
                                })}
                    </div>
                </div>
            </div>
        </section>
    )
}
