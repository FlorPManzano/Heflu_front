import NotFoundImage from "/not-found.png"
import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/")
    }
    return (
        <section className="mt-10 mb-10 mx-6 min-h-screen text-primary flex justify-around items-center">
            <div>
                <h1 className="text-9xl font-bold mb-12">¡Uy!</h1>
                <h2 className="text-4xl font-semibold mb-12"> Error 404</h2>
                <p className="text-2xl font-light mb-10">
                    La página que estás buscando no existe.
                    <br />
                    Verifica que la dirección URL sea correcta.
                </p>

                <button
                    className="bg-violet-700 border border-violet-700 font-semibold text-white px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-lg rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    onClick={handleClick}
                >
                    Vuelve al inicio
                </button>
            </div>
            <img src={NotFoundImage} alt="" />
        </section>
    )
}
