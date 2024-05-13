import { useState, useRef } from "react"
import { useProperties } from "../../hooks/useProperties"
import Logo from "/heflu-logo.svg"

const NewPropertyModal = ({
    setNewPropertyModal,
    filterProperties,
    setFilterProperties,
}) => {
    // const { authToken } = useAuth()
    const { addProperty } = useProperties()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [location, setLocation] = useState("")
    const [country, setCountry] = useState("")
    const [price, setPrice] = useState()
    const [area, setArea] = useState()
    const [rooms, setRooms] = useState()
    const [bathrooms, setBathrooms] = useState()

    const fileInputRef = useRef()

    const propertySubmit = async (e) => {
        e.preventDefault()
        const images = fileInputRef.current?.files

        const formData = new FormData()
        formData.set("name", name)
        formData.set("description", description)
        formData.set("type", type)
        formData.set("location", location)
        formData.set("country", country)
        formData.set("price", price)
        formData.set("area", area)
        formData.set("bedrooms", rooms)
        formData.set("bathrooms", bathrooms)

        if (images.length > 0) {
            for (let image of images) {
                formData.set(image.name, image)
            }
        }

        try {
            const { data } = await addProperty(formData)
            const newProperty = await data

            setFilterProperties([...filterProperties, newProperty])
            setNewPropertyModal(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <form
            className="w-full h-full flex flex-col items-center justify-center overflow-y-auto gap-5"
            action=""
            onSubmit={propertySubmit}
        >
            <h2 className="flex gap-x-4 items-end justify-center text-3xl text-violet-700 font-semibold mb-8">
                ¡Pon tu propiedad en <img src={Logo} alt="" className="h-12" />!
            </h2>
            <div className="flex flex-row gap-5">
                <div className="flex flex-col w-1/2 gap-5">
                    <input
                        className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                        id="name"
                        type="text"
                        placeholder="Título"
                        required
                        value={name && name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                        className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                        id="description"
                        type="text"
                        placeholder="Descripción"
                        required
                        value={description && description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                        id="country"
                        type="text"
                        placeholder="País"
                        required
                        value={country && country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <input
                        className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                        id="location"
                        type="text"
                        placeholder="Localidad"
                        required
                        value={location && location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-1/2 gap-5">
                    <input
                        className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                        id="price"
                        type="number"
                        placeholder="Precio (en €/noche)"
                        required
                        value={price && price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                        id="area"
                        type="number"
                        placeholder="Tamaño (en m2)"
                        required
                        value={area && area}
                        onChange={(e) => setArea(e.target.value)}
                    />
                    <label htmlFor="">
                        Tipo de vivienda
                        <select
                            name=""
                            id="type"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Elige un tipo</option>
                            <option value="Chalet">Chalet</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Casa rural">Casa rural</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </label>
                    <input
                        className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                        id="rooms"
                        type="number"
                        placeholder="Habitaciones"
                        required
                        value={rooms && rooms}
                        onChange={(e) => setRooms(e.target.value)}
                    />
                    <input
                        className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary focus:border-violet-700"
                        id="bathrooms"
                        type="number"
                        placeholder="Baños"
                        required
                        value={bathrooms && bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex items-center justify-start gap-2">
                <h5 className="font-semibold">Imágenes (Máximo 5)</h5>
                <input
                    className="bg-transparent text-primary outline outline-0 focus:outline-0 placeholder-primary transition-all placeholder-shown:border placeholder-shown:border-primary/50 border focus:border-1 text-sm px-3 py-2.5 rounded-[10px] border-primary/50 focus:border-violet-700"
                    id="images"
                    type="file"
                    multiple
                    required
                    ref={fileInputRef}
                />
            </div>

            <button
                className="bg-violet-700 border border-violet-700 text-white px-2 py-1 text-lg lg:px-4 lg:py-2 lg:text-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                type="submit"
            >
                Añadir propiedad
            </button>
        </form>
    )
}

export default NewPropertyModal
