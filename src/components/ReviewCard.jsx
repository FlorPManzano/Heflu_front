import { FaStar } from "react-icons/fa6"

const APIUrl = import.meta.env.VITE_API_URL

const ReviewCard = ({ review }) => {
    const { avatar, name, created_at, rating, comment } = review
    const formatDateToText = (dateString) => {
        const date = new Date(dateString)

        const months = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ]

        // Obtener día, mes y año
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()

        // Obtener hora y minutos
        let hour = date.getHours()
        const minutes = date.getMinutes()

        // Formatear hora a AM/PM
        const ampm = hour >= 12 ? "PM" : "AM"
        hour = hour % 12 || 12

        // Formatear minutos con dos dígitos
        const formatMins = minutes < 10 ? "0" + minutes : minutes

        // Formatear la fecha completa
        const formattedDate = `${day} ${month} ${year}, ${hour}:${formatMins} ${ampm}`

        return formattedDate
    }

    return (
        <article className="flex flex-col gap-4 h-36 lg:text-lg  w-96 p-3 border rounded-lg shadow-md">
            <header className="flex  gap-4 justify-start items-start">
                <img
                    className="w-14 h-14 rounded-full"
                    src={`${APIUrl}/${avatar}`}
                />
                <div className=" grow flex flex-col">
                    <h5 className="font-semibold text-md">{name}</h5>
                    <p className="text-xs">
                        {formatDateToText(created_at).split(",")[0]}
                    </p>
                </div>
                <ul className=" flex items-center gap-2 ">
                    <li className="text-primary">
                        <FaStar />
                    </li>
                    <li className="font-semibold pt-1">{rating}</li>
                </ul>
            </header>
            <p className="text-xs">{comment}</p>
        </article>
    )
}
export default ReviewCard
