import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { useProperties } from "../hooks/useProperties"
import { getUserReviewsProfileService } from "../services/userServices"

import ReviewCard from "../components/ReviewCard"
import PropertyCard from "../components/PropertyCard"
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
        <section className="mt-32 mb-10 mx-48 text-primary">
            <h2 className="text-3xl text-violet-700 font-bold border-b border-primary/40 pb-2 mb-4 tracking-wide">
                Perfil
            </h2>
            {authUser && (
                <>
                    <div className="flex items-center justify-start gap-x-2 my-6">
                        <img
                            className="rounded-full w-24"
                            src={`${APIUrl}/${authUser.avatar}`}
                            alt=""
                        />
                        <div>
                            <h4 className="font-semibold text-xl">
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
                    <p className="text-md leading-relaxed mb-10">
                        {authUser.bio}
                    </p>
                    <h3 className="font-semibold text-3xl text-primary mb-8">
                        Alquileres Publicados
                    </h3>
                    <ul className="flex justify-start flex-wrap gap-6  mb-12">
                        {properties &&
                            properties
                                .filter(
                                    (property) =>
                                        property.owner_id === authUser.id
                                )
                                .map((property) => {
                                    return <PropertyCard property={property} />
                                })}
                    </ul>
                </>
            )}

            <div className="flex justify-between flex-wrap items-start gap-10 ">
                <div className=" ">
                    <div className="flex items-center gap-4 mb-4">
                        <h3 className="font-semibold text-2xl capitalize ">
                            Valoraciones como casero
                        </h3>
                        <ul className=" flex items-center gap-2 ">
                            <li className="text-primary">
                                <FaStar />
                            </li>
                            <li className="pt-1">
                                {getMediaRating("as_owner")}
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        {reviews &&
                            reviews
                                .filter(
                                    (review) => review.rev_type === "as_owner"
                                )
                                .map((review) => {
                                    return <ReviewCard review={review} />
                                })}
                    </div>
                </div>
                <div className="grow max-w-screen-md">
                    <div className="flex items-center gap-4 mb-4">
                        <h3 className="font-semibold text-2xl capitalize ">
                            Valoraciones como inquilino
                        </h3>
                        <ul className=" flex items-center gap-2 ">
                            <li className="text-primary">
                                <FaStar />
                            </li>
                            <li className="pt-1">
                                {getMediaRating("as_tenant")}
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        {reviews &&
                            reviews
                                .filter(
                                    (review) => review.rev_type === "as_tenant"
                                )
                                .map((review) => {
                                    return <ReviewCard review={review} />
                                })}
                    </div>
                </div>
            </div>
        </section>
    )
}
