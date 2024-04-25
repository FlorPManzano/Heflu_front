import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TOKEN_LOCAL_STORAGE_KEY } from "../utils/constants"
// Importación de los servicios
import {
    registerUserService,
    loginUserService,
    getUserProfileService,
    validateUserService,
} from "../services/userServices"
import { toast, Bounce } from "react-toastify"

// Creamos un contexto.
export const AuthContext = createContext(null)

// Creamos el componente provider del contexto.
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(
        localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
    )
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // Función que obtiene los datos del usuario.
        const fetchUser = async () => {
            try {
                setLoading(true)
                const tokenData = JSON.parse(atob(authToken.split(".")[1]))

                const body = await getUserProfileService(
                    authToken,
                    tokenData.id
                )

                // Establecemos el valor del usuario.
                setAuthUser(body.data.user)
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }

        // Si existe token buscamos los datos del usuario.
        if (authToken) fetchUser()
    }, [authToken])

    // Función de registro.
    const authRegister = async (registerForm) => {
        try {
            setLoading(true)

            const body = await registerUserService(registerForm)
            if (body.status !== "ok") {
                toast.error(await body?.message, {
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
            } else {
                toast("¡Te has registrado correctamente!", {
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
            }
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Función de login.
    const authLogin = async ({ email, password }) => {
        try {
            setLoading(true)

            const body = await loginUserService(email, password)

            if (body.status !== "ok") {
                toast.error(await body?.message, {
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
            }

            // Almacenamos el token en el localStorage.
            localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, body.data.token)

            // Almacenamos el token en el State.
            setAuthToken(body.data.token)
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Función de logout.
    const authLogout = async () => {
        // Eliminamos el token del localStorage.
        localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY)

        // Eliminamos el token del State y el usuario.
        setAuthToken(null)
        setAuthUser(null)
        navigate("/")
    }
    const authValidate = async (registration_code) => {
        try {
            setLoading(true)

            const body = await validateUserService(registration_code)

            if (body.status !== "ok") {
                toast.error(await body?.message, {
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
            } else {
                // Almacenamos el token en el localStorage.
                localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, body.data.token)

                // Almacenamos el token en el State.
                setAuthToken(body.data.token)
            }
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <AuthContext.Provider
            value={{
                authUser,
                authRegister,
                authLogin,
                authLogout,
                authValidate,
                loading,
                authToken,
                setAuthToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
