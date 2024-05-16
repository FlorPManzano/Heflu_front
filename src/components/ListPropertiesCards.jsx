import PropertyCard from "./PropertyCard"
import { useNavigate } from "react-router-dom"

const ListPropertiesCards = ({ properties }) => {
    const navigate = useNavigate()

    const handleCardClick = async (e, key) => {
        e.preventDefault()
        navigate(`/properties/${key}`)
    }
    return (
        <ul className="flex flex-wrap justify-start gap-4 my-10">
            {properties.length > 0 &&
                properties.map((property) => (
                    <li
                        key={property.id}
                        onClick={(event) => handleCardClick(event, property.id)}
                    >
                        <PropertyCard property={property} />
                    </li>
                ))}
        </ul>
    )
}
export default ListPropertiesCards
