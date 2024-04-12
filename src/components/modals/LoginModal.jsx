import { useState, useRef } from "react"
import useAuth from "../../hooks/useAuth"
import Logo from "/heflu.svg"

const LoginModal = ({ setLoginModal, openRegisterModal }) => {
    const { authLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const goToRegisterModal = () => {
        setLoginModal(false)
        openRegisterModal()
    }

    const logInSubmit = async (e) => {
        e.preventDefault()
        try {
            await authLogin({ email, password })
            setLoginModal(false)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <form
            className="w-full h-full flex flex-col items-center justify-center overflow-y-auto"
            action=""
            onSubmit={logInSubmit}
        >
            <h2 className="flex gap-x-4 items-end justify-center text-3xl text-violet-700 font-semibold mb-8">
                Inicia sesión
                <img src={Logo} alt="" className="h-10" />
            </h2>
            <div className="flex flex-col gap-y-5">
                <input
                    className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a onClick={goToRegisterModal}>
                    ¿No tienes cuenta?{" "}
                    <span className="text-violet-700 font-medium underline cursor-pointer">
                        Regístrate aquí
                    </span>
                </a>
                <button
                    className="bg-violet-700 border border-violet-700 text-white px-2 py-1 text-lg lg:px-4 lg:py-2 lg:text-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    type="submit"
                >
                    Inicia sesión
                </button>
            </div>
        </form>
    )
}

export default LoginModal
