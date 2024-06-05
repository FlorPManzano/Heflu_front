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
import { sendErrorToast, sendSuccessToast } from "../utils/sendToast"

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
                const res = await getUserProfileService(authToken, tokenData.id)
                if (res.ok) {
                    const body = await res.json()

                    // Establecemos el valor del usuario.
                    return setAuthUser(body.data.user)
                }
                const body = await res.json()
                sendErrorToast(body)
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

            const res = await registerUserService(registerForm)

            if (!res.ok) {
                const body = await res.json()
                sendErrorToast(body)
                return false
            }
            const body = await res.json()
            sendSuccessToast(body)
            return true
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

            const res = await loginUserService(email, password)

            if (res.ok == false) {
                const body = await res.json()
                sendErrorToast(body)
                return true
            }

            const body = await res.json()
            // Almacenamos el token en el localStorage.
            localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, body.data.token)

            // Almacenamos el token en el State.
            setAuthToken(body.data.token)
            return false
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

            const res = await validateUserService(registration_code)
            if (res.ok) {
                const body = await res.json()
                // Almacenamos el token en el localStorage.
                localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, body.data.token)

                // Almacenamos el token en el State.
                return setAuthToken(body.data.token)
            }

            const body = await res.json()

            sendErrorToast(body)
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
