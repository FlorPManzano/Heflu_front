import { useState } from "react"
import { useReviews } from "../hooks/useReviews"
import useAuth from "../hooks/useAuth"
import Rating from "@mui/material/Rating"
import { toast, Bounce } from "react-toastify"

const APIUrl = import.meta.env.VITE_API_URL
export default function PendingReviewsPage() {
    const { reviews, addReview } = useReviews()
    const [comment, setComment] = useState({})
    const [rating, setRating] = useState({})
    const { authUser } = useAuth()

    const revType = (ownerId) => {
        if (authUser.id === ownerId) {
            return "inquilino"
        } else {
            return "casero"
        }
    }

    const handleSubmit = async (e, key) => {
        e.preventDefault()
        try {
            const { status, message } = await addReview(
                key,
                rating[key],
                comment[key]
            )

            if (status == "ok") {
                setComment({ ...comment, [key]: "" })
                setRating({ ...rating, [key]: 0 })
            }

            toast(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <section className="mt-32 mb-10 mx-6 min-h-screen text-primary">
            <h2 className="text-xl text-violet-700 font-bold border-b border-primary/80 pb-2 mb-4 tracking-wide capitalize">
                Mis valoraciones pendientes
            </h2>
            <ul className=" flex flex-col gap-y-4 items-center">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review.id}>
                            <article className="flex gap-6 p-4 border border-primary/20 rounded-2xl shadow-md max-w-[650px]">
                                <img
                                    src={`${APIUrl}/${review.property_images[0]}`}
                                    alt="Property"
                                    className="w-56 h-56 object-cover rounded-2xl"
                                />
                                <section className="flex flex-col w-full justify-between">
                                    <h4 className="font-semibold capitalize text-md">
                                        Valoración al {revType(review.owner_id)}{" "}
                                        en "{review.title}"
                                    </h4>
                                    <form
                                        action=""
                                        onSubmit={(e) =>
                                            handleSubmit(e, review.id)
                                        }
                                    >
                                        <textarea
                                            className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700 w-full"
                                            id="comment"
                                            type="text"
                                            placeholder="Deja aquí tu comentario..."
                                            required
                                            value={comment[review.id] || ""}
                                            onChange={(e) =>
                                                setComment({
                                                    ...comment,
                                                    [review.id]: e.target.value,
                                                })
                                            }
                                        />
                                        <Rating
                                            name="simple-controlled"
                                            value={rating[review.id] || 0}
                                            onChange={(e, newValue) => {
                                                setRating({
                                                    ...rating,
                                                    [review.id]: newValue,
                                                })
                                            }}
                                        />
                                        <div className="flex flex-row justify-end items-end">
                                            <button className="bg-violet-700 border border-violet-700 font-normal text-white px-2 py-1 text-sm rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out w-20">
                                                Enviar
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            </article>
                        </li>
                    ))
                ) : (
                    <p>No hay valoraciones pendientes.</p>
                )}
            </ul>
        </section>
    )
}
