import { useState, useRef } from "react"
import useAuth from "../../hooks/useAuth"
import Logo from "/heflu-logo.svg"

const RegisterModal = ({ setRegisterModal }) => {
    const { authRegister } = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [avatar, setAvatar] = useState(null)
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
            setRegisterModal(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <form
            className="w-full h-full flex flex-col items-center justify-center overflow-y-auto"
            action=""
            onSubmit={registerSubmit}
        >
            <h2 className="flex gap-x-4 items-end justify-center text-3xl text-violet-700 font-semibold mb-8">
                ¡Únete a <img src={Logo} alt="" className="h-12" />!
            </h2>
            <div className="flex flex-col gap-y-5">
                <input
                    className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    required
                    value={name && name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email && email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    required
                    value={password && password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <textarea
                    className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                    id="bio"
                    type="text"
                    placeholder="Biografia"
                    required
                    value={bio && bio}
                    onChange={(e) => setBio(e.target.value)}
                />

                <input
                    className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary/50 focus:border-violet-700"
                    id="avatar"
                    type="file"
                    required
                    ref={fileInputRef}
                    onChange={(e) => setAvatar(e.target.value)}
                />

                <button
                    className="bg-violet-700 border border-violet-700 text-white px-2 py-1 text-lg lg:px-4 lg:py-2 lg:text-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    type="submit"
                >
                    Registro
                </button>
            </div>
        </form>
    )
}

export default RegisterModal
