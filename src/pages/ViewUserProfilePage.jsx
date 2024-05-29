import { useProperties } from "../hooks/useProperties"
import notFoundImage from "/not-found.png"
import ListPropertiesCards from "../components/ListPropertiesCards"
import { FaStar } from "react-icons/fa"
import ListReviewCards from "../components/ListReviewCards"
import { useParams } from "react-router-dom"
import { useUser } from "../hooks/useUser"
const APIUrl = import.meta.env.VITE_API_URL

export default function ViewUserProfilePage() {
    const { id } = useParams()
    const { userProperties } = useProperties(id)
    const { user, userReviews, loading } = useUser(id)

    // Función para sacar la media de las valoraciones
    const getMediaRating = (type) => {
        if (type === "as_owner") {
            const filterReviews = userReviews.filter(
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
            const filterReviews = userReviews.filter(
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
    const tenantReviews = userReviews.filter(
        (review) => review.rev_type === "as_tenant"
    )
    const ownerReviews = userReviews.filter(
        (review) => review.rev_type === "as_owner"
    )

    return (
        <section className="mt-32 mb-10 mx-48 text-primary">
            <h2 className="text-3xl text-violet-700 font-bold border-b border-primary/40 pb-2 mb-4 tracking-wide">
                Perfil
            </h2>
            {user && (
                <>
                    <div className="flex items-center justify-start gap-x-2 my-6">
                        <img
                            className="rounded-full object-cover h-24 w-24"
                            src={`${APIUrl}/${user.avatar}`}
                            alt=""
                        />
                        <div>
                            <h4 className="font-semibold text-xl">
                                {user.name}
                            </h4>
                        </div>
                    </div>
                    <p className="text-md leading-relaxed min-w-6 max-w-screen-lg   bg-slate-100 p-4 mb-10 rounded-xl">
                        {user.bio}
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
