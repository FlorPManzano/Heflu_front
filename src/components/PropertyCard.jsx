const APIUrl = import.meta.env.VITE_API_URL
import { PiBathtub } from "react-icons/pi"
import { IoBedOutline } from "react-icons/io5"
import { FaStar } from "react-icons/fa6"

const PropertyCard = ({ property }) => {
    let {
        country,
        location,
        type,
        bedrooms,
        price,
        bathrooms,
        property_images,
        media_rating,
    } = property
    media_rating = media_rating < 1 ? 0 : media_rating
    const imgURL = `${APIUrl}/${property_images[0]}`
    return (
        <article className="flex-col lg:text-lg w-72 p-3 border rounded-tl-[90px] shadow-md">
            <img
                className="object-cover h-64 w-64 mb-3 rounded-tl-[80px] rounded-br-[80px]  "
                src={imgURL}
            />
            <ul className="text-xs flex justify-end items-center gap-1 mb-2">
                <li className=" h-8 rounded-2xl p-2 text-white bg-emerald-500">
                    {type}
                </li>
                <li className=" h-8 rounded-2xl p-2 text-white bg-violet-700">
                    {country}
                </li>
                <li className=" text-lg text-end grow">
                    <ul className="grow flex justify-end items-center gap-1">
                        <li>
                            <FaStar />
                        </li>
                        <li>{media_rating}</li>
                    </ul>
                </li>
            </ul>
            <section>
                <h2 className="font-semibold mb-1">{location}</h2>
                <ul className="font-semibold text-violet-700 flex gap-2">
                    <li>
                        <ul className="flex items-center gap-1 mb-2">
                            <li className="text-black">
                                <IoBedOutline />
                            </li>
                            <li>{bedrooms}</li>
                        </ul>
                    </li>
                    <li>
                        <ul className="flex items-center gap-1">
                            <li className="text-black">
                                <PiBathtub />
                            </li>
                            <li>{bathrooms}</li>
                        </ul>
                    </li>
                </ul>
                <h3>
                    <b className=" font-semibold">{price} €</b> noche
                </h3>
            </section>
        </article>
    )
}
export default PropertyCard
