import { createContext, useEffect, useState } from "react"
import { TOKEN_LOCAL_STORAGE_KEY } from "../utils/constants"
// Importación de los servicios
import {
    registerUserService,
    loginUserService,
    getUserProfileService,
} from "../services/userServices"

// Creamos un contexto.
export const AuthContext = createContext(null)

// Creamos el componente provider del contexto.
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(
        localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
    )
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(false)

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
                setAuthUser(body)

                console.log("info del user", body)
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

            if (body.status === "error") {
                console.log(body.message)
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
            console.log("aqui llega?", body)

            console.log("token", await body.data.token)

            if (body.status === "error") {
                console.log(body.message)
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
    }

    return (
        <AuthContext.Provider
            value={{
                authUser,
                authRegister,
                authLogin,
                authLogout,
                loading,
                authToken,
                setAuthToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
