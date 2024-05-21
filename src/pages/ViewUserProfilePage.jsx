import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { useProperties } from "../hooks/useProperties"
import { getUserReviewsProfileService } from "../services/userServices"
import notFoundImage from "/not-found.png"
import ListPropertiesCards from "../components/ListPropertiesCards"
import { FaStar } from "react-icons/fa"
import ListReviewCards from "../components/ListReviewCards"

const APIUrl = import.meta.env.VITE_API_URL

export default function ViewUserProfilePage() {
    const { authUser, authToken } = useAuth()
    const { userProperties } = useProperties()
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

                if (body != undefined) {
                    setReviews(body.data)
                }
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
    const tenantReviews = reviews.filter(
        (review) => review.rev_type === "as_tenant"
    )
    const ownerReviews = reviews.filter(
        (review) => review.rev_type === "as_owner"
    )

    return (
        <section className="mt-32 mb-10 mx-48 text-primary">
            <h2 className="text-3xl text-violet-700 font-bold border-b border-primary/40 pb-2 mb-4 tracking-wide">
                Perfil
            </h2>
            {authUser && (
                <>
                    <div className="flex items-center justify-start gap-x-2 my-6">
                        <img
                            className="rounded-full object-cover h-24 w-24"
                            src={`${APIUrl}/${authUser.avatar}`}
                            alt=""
                        />
                        <div>
                            <h4 className="font-semibold text-xl">
                                {authUser.name}
                            </h4>
                            <p className="flex gap-x-2 font-medium text-sm">
                                {authUser.media_rating > 0 ? (
                                    <span className="flex items-center gap-x-1">
                                        <FaStar className="text-md" />
                                        {authUser.media_rating}
                                    </span>
                                ) : (
                                    <p>
                                        Este usuario no tiene valoraciones
                                        todavía
                                    </p>
                                )}
                            </p>
                        </div>
                    </div>
                    <p className="text-md leading-relaxed min-w-6 max-w-screen-lg   bg-slate-100 p-4 mb-10 rounded-xl">
                        {authUser.bio}
                    </p>
                    <section className="min-h-96  ">
                        <h3 className="font-semibold text-3xl text-primary mb-8">
                            Alquileres Publicados
                        </h3>
                        {userProperties.length > 0 && (
                            <ListPropertiesCards properties={userProperties} />
                        )}
                    </section>
                </>
            )}

            <div className="flex justify-between flex-wrap items-start gap-10 ">
                {ownerReviews.length > 0 ? (
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
                            {ownerReviews && (
                                <ListReviewCards reviews={ownerReviews} />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <h3 className="font-semibold text-2xl capitalize ">
                            Valoraciones como casero
                        </h3>
                        <img className=" h-40" src={notFoundImage} alt="" />
                        <p className="font-semibold">
                            Vaya, parece que no tiene valoraciones todavía.
                        </p>
                    </div>
                )}
                {tenantReviews.length > 0 ? (
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
                            {tenantReviews && (
                                <ListReviewCards reviews={tenantReviews} />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <h3 className="font-semibold text-2xl capitalize ">
                            Valoraciones como inquilino
                        </h3>
                        <img className=" h-40" src={notFoundImage} alt="" />
                        <p className="font-semibold">
                            Vaya, parece que no tiene valoraciones todavía.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
