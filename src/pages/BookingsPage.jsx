import { useBookings } from "../hooks/useBookings"

const APIUrl = import.meta.env.VITE_API_URL

export default function BookingsPage() {
    const { tenantBookings, cancelBooking } = useBookings()

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
        const weekDay = weekDays[date.getDay()]
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()

        return `${weekDay} ${day} de ${month} de ${year}`
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
            <div className="mb-10">
                <h2 className="text-xl text-violet-700 font-bold border-b border-primary/80 pb-2 mb-4 tracking-wide capitalize">
                    Mis reservas confirmadas
                </h2>
                <ul className=" mt-8 flex flex-col gap-y-4 items-center">
                    {tenantBookings && tenantBookings.length > 0 ? (
                        tenantBookings
                            .filter((booking) => booking.is_confirmed == true)
                            .map((booking) => (
                                <li key={booking.id}>
                                    <article className="flex gap-6 p-4 border min-w-[760px] border-primary/20 rounded-2xl shadow-md max-w-[760px]">
                                        {booking.images &&
                                        booking.images.length > 0 ? (
                                            <img
                                                src={`${APIUrl}/${booking.images[0]}`}
                                                alt="Property"
                                                className="w-44 h-44 object-cover rounded-2xl"
                                            />
                                        ) : (
                                            <div className="w-44 h-44 rounded-2xl bg-gray-200"></div>
                                        )}
                                        <div className="flex-grow">
                                            <h4 className="font-semibold capitalize text-lg pb-2">
                                                Solicitud de reserva para "
                                                {booking.property}"
                                            </h4>
                                            <p className="text-sm pb-3">
                                                La información de la reserva es
                                                la siguiente:
                                            </p>
                                            <ul className="list-disc ml-5 text-sm">
                                                <li>
                                                    <span className="font-semibold">
                                                        Fecha de entrada:
                                                    </span>{" "}
                                                    {formatDate(
                                                        booking.starting_date
                                                    )}
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Fecha de salida:
                                                    </span>{" "}
                                                    {formatDate(
                                                        booking.ending_date
                                                    )}
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Precio total:
                                                    </span>{" "}
                                                    {booking.total_price} €
                                                </li>
                                            </ul>
                                        </div>{" "}
                                    </article>
                                </li>
                            ))
                    ) : (
                        <p>No hay reservas pendientes.</p>
                    )}
                </ul>
            </div>
            <div className="mb-10">
                <h2 className="text-xl text-violet-700 font-bold border-b border-primary/80 pb-2 mb-4 tracking-wide capitalize">
                    Mis reservas sin confirmar
                </h2>
                <ul className="mt-8 flex flex-col gap-y-4 items-center">
                    {tenantBookings && tenantBookings.length > 0 ? (
                        tenantBookings
                            .filter((booking) => booking.is_confirmed == false)
                            .map((booking) => (
                                <li key={booking.id}>
                                    <article className="flex gap-6 p-4 border min-w-[760px] border-primary/20 rounded-2xl shadow-md max-w-[760px]">
                                        {booking.images &&
                                        booking.images.length > 0 ? (
                                            <img
                                                src={`${APIUrl}/${booking.images[0]}`}
                                                alt="Property"
                                                className="w-44 h-44 object-cover rounded-2xl"
                                            />
                                        ) : (
                                            <div className="w-44 h-44 rounded-2xl bg-gray-200"></div>
                                        )}
                                        <div className="flex-grow">
                                            <h4 className="font-semibold capitalize text-lg pb-2">
                                                Solicitud de reserva para "
                                                {booking.property}"
                                            </h4>
                                            <p className="text-sm pb-3">
                                                La información de la reserva es
                                                la siguiente:
                                            </p>
                                            <ul className="list-disc ml-5 text-sm">
                                                <li>
                                                    <span className="font-semibold">
                                                        Fecha de entrada:
                                                    </span>{" "}
                                                    {formatDate(
                                                        booking.starting_date
                                                    )}
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Fecha de salida:
                                                    </span>{" "}
                                                    {formatDate(
                                                        booking.ending_date
                                                    )}
                                                </li>
                                                <li>
                                                    <span className="font-semibold">
                                                        Precio total:
                                                    </span>{" "}
                                                    {booking.total_price} €
                                                </li>
                                            </ul>
                                        </div>{" "}
                                        <div className="flex flex-grow justify-end items-end">
                                            <button
                                                className="text-violet-700  font-medium text-sm rounded-lg mr-4 hover:underline transition duration-300 ease-in-out capitalize"
                                                onClick={(e) =>
                                                    handleCancel(e, booking.id)
                                                }
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </article>
                                </li>
                            ))
                    ) : (
                        <p>No hay reservas pendientes.</p>
                    )}
                </ul>
            </div>
        </section>
    )
}
