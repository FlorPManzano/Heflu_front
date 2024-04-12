import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth.js"
import { useProperties } from "../hooks/useProperties.js"

// Importación de componentes
import Hero from "../components/Hero"

const APIUrl = import.meta.env.VITE_API_URL

export default function HomePage() {
    const { properties } = useProperties()
    const navigate = useNavigate()

    const handleCardClick = async (e, key) => {
        e.preventDefault()
        navigate(`/properties/${key}`)
    }

    return (
        <>
            <Hero />
            {/* Listado de propiedades */}
            <section>
                <div>
                    <ul>
                        {properties &&
                            properties.map((property) => (
                                <li
                                    key={property.id}
                                    onClick={(event) =>
                                        handleCardClick(event, property.id)
                                    }
                                >
                                    <h2>{property.country}</h2>
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
                            ))}
                    </ul>
                </div>
            </section>
        </>
    )
}
