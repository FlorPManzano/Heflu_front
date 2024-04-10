import Hero from "../components/Hero"

import useAuth from "../hooks/useAuth.js"
import { useState, useRef } from "react"
import { useProperties } from "../hooks/useProperties.js"

const APIUrl = import.meta.env.VITE_API_URL

export default function HomePage() {
    const { authRegister, authLogin } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [avatar, setAvatar] = useState(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const { properties } = useProperties()

    const fileInputRef = useRef()

    const registerSubmit = async (e) => {
        e.preventDefault()
        const image = fileInputRef.current?.files[0]

        const formData = new FormData()
        formData.set("name", name)
        formData.set("email", email)
        formData.set("password", password)
        formData.set("bio", bio)
        formData.set("avatar", image)

        try {
            await authRegister(formData)
        } catch (error) {
            console.log(error.message)
        }
    }

    const logInSubmit = async (e) => {
        e.preventDefault()
        console.log(loginEmail, loginPassword)
        try {
            await authLogin({ email: loginEmail, password: loginPassword })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Hero />
            {/* Formulario de registro */}
            <form action="" onSubmit={registerSubmit}>
                <h2>Registro</h2>
                <div>
                    <input
                        id="name"
                        type="text"
                        required
                        value={name && name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Nombre</label>
                </div>
                <div>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email && email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password && password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Contraseña</label>
                </div>
                <div>
                    <input
                        id="bio"
                        type="text"
                        required
                        value={bio && bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <label htmlFor="bio">Biografia</label>
                </div>
                <div>
                    <input
                        id="avatar"
                        type="file"
                        required
                        ref={fileInputRef}
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                    <label htmlFor="avatar">Avatar</label>
                </div>

                <button type="submit">Registro</button>
            </form>
            <h2>Login</h2>
            {/* Formulario de login */}
            <form action="" onSubmit={logInSubmit}>
                <div>
                    <input
                        type="email"
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <label htmlFor="">Email</label>
                </div>
                <div>
                    <input
                        type="text"
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <label htmlFor="">Contraseña</label>
                </div>
                <button type="submit">Inicia sesión</button>
            </form>
            {/* Listado de propiedades */}
            <section>
                <div>
                    <ul>
                        {properties &&
                            properties.map((property) => (
                                <li key={property.id}>
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
