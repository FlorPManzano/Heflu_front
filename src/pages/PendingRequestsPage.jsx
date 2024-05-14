import { useBookings } from "../hooks/useBookings"

const APIUrl = import.meta.env.VITE_API_URL

export default function PendingRequestsPage() {
    const { bookings, acceptBooking, cancelBooking } = useBookings()

    function formatDate(dateString) {
        const weekDays = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
        ]
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

        const date = new Date(dateString)
        const weekDay = weekDays[date.getUTCDay()]
        const day = date.getUTCDate()
        const month = months[date.getUTCMonth()]
        const year = date.getUTCFullYear()

        return `${weekDay} ${day} de ${month} de ${year}`
    }

    const handleAccept = async (e, key) => {
        e.preventDefault()
        try {
            await acceptBooking(key)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleCancel = async (e, key) => {
        e.preventDefault()
        try {
            await cancelBooking(key)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <section className="mt-32 mb-10 mx-6 min-h-screen text-primary">
            <h2 className="text-xl text-violet-700 font-bold border-b border-primary/80 pb-2 mb-4 tracking-wide capitalize">
                Mis solicitudes pendientes
            </h2>
            <ul className=" flex flex-col gap-y-4 items-center">
                {bookings && bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <li key={booking.id}>
                            <article className="flex gap-6 p-4 border border-primary/20 rounded-2xl shadow-md max-w-[760px]">
                                {booking.images && booking.images.length > 0 ? (
                                    <img
                                        src={`${APIUrl}/${booking.images[0]}`}
                                        alt="Property"
                                        className="w-44 h-44 object-cover rounded-2xl"
                                    />
                                ) : (
                                    <div className="w-44 h-44 rounded-2xl bg-gray-200"></div>
                                )}

                                <div>
                                    <h4 className="font-semibold capitalize text-lg pb-2">
                                        Solicitud de reserva para "
                                        {booking.property}"
                                    </h4>
                                    <p className="text-sm pb-3">
                                        Tienes una solicitud de reserva para el
                                        inmueble situado en{" "}
                                        <span className="font-semibold">
                                            {booking.location}
                                        </span>{" "}
                                        a nombre de{" "}
                                        <span className="font-semibold">
                                            {booking.tenant}.
                                        </span>{" "}
                                        La información de la reserva es la
                                        siguiente:
                                    </p>
                                    <ul className="list-disc ml-5 text-sm">
                                        <li>
                                            <span className="font-semibold">
                                                Fecha de entrada:
                                            </span>{" "}
                                            {formatDate(booking.starting_date)}
                                        </li>
                                        <li>
                                            <span className="font-semibold">
                                                Fecha de salida:
                                            </span>{" "}
                                            {formatDate(booking.ending_date)}
                                        </li>
                                        <li>
                                            <span className="font-semibold">
                                                Precio total:
                                            </span>{" "}
                                            {booking.total_price} €
                                        </li>
                                    </ul>
                                    <div className="flex justify-end items-end">
                                        <button
                                            className="text-violet-700 font-medium text-sm rounded-lg mr-4 hover:underline transition duration-300 ease-in-out capitalize"
                                            onClick={(e) =>
                                                handleCancel(e, booking.id)
                                            }
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="bg-violet-700 border border-violet-700 font-normal text-white px-2 py-1 text-sm rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                                            onClick={(e) =>
                                                handleAccept(e, booking.id)
                                            }
                                        >
                                            Aceptar
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))
                ) : (
                    <p>No hay reservas pendientes.</p>
                )}
            </ul>
        </section>
    )
}
