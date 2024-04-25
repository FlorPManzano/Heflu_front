import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const ValidateUserPage = ({}) => {
    const navigate = useNavigate()
    const { registration_code } = useParams()
    const { authValidate } = useAuth()
    useEffect(() => {
        authValidate(registration_code)
    }, [registration_code])
    return (
        <section className="h-[70vh] mt-32 mx-36 py-4 flex items-center justify-center text-right lg:flex-row lg:items-center lg:text-end lg:justify-between lg:gap-x-10">
            <div className="flex flex-col lg:items-end lg:justify-center gap-3">
                <h2 className="text-2xl lg:text-2xl xl:text-6xl  mb-3 leading-normal">
                    ¡Felicidades por registrarte en
                    <strong className="text-violet-700"> Heflú!</strong>
                </h2>
                <p className="text-md text-primary leading-relaxed  xl:text-xl mb-6">
                    Estás a un solo clic de formar unos recuerdos inolvidables.
                </p>

                <button
                    className="bg-violet-700 border self-end border-violet-700 text-white px-4 py-2 text-lg lg:px-4 lg:py-2 lg:text-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    type="submit"
                    onClick={() => {
                        navigate("/")
                    }}
                >
                    Inicio
                </button>
            </div>
        </section>
    )
}
export default ValidateUserPage
