import PropertyCard from "./PropertyCard"
import { Link } from "react-router-dom"

const ListPropertiesCards = ({ properties }) => {
    return (
        <ul className="flex flex-wrap justify-start gap-4 my-10">
            {properties.length > 0 &&
                properties.map((property) => (
                    <li key={property.id}>
                        <Link to={`/properties/${property.id}`}>
                            <PropertyCard property={property} />
                        </Link>
                    </li>
                ))}
        </ul>
    )
}
export default ListPropertiesCards
