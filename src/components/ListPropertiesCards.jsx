import PropertyCard from "./PropertyCard"
const ListPropertiesCards = ({ properties, handleCardClick }) => {
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
