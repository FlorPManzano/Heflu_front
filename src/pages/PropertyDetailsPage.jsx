import { useParams } from "react-router-dom"
import { useProperty } from "../hooks/useProperty"

const APIUrl = import.meta.env.VITE_API_URL

export default function PropertyDetailsPage() {
    const { id } = useParams()
    const { property } = useProperty(id)

    return (
        <section>
            <h1>{property.title}</h1>
            <p>{property.description}</p>

            {property.property_images &&
                property.property_images.map((image) => (
                    <img
                        src={`${APIUrl}/${image}`}
                        alt=""
                        key={image}
                        style={{
                            width: "100px",
                        }}
                    />
                ))}
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
