const Hero = () => {
    return (
        <section className="mx-10 mt-32 py-4 flex items-center justify-center text-center lg:flex-row lg:items-center lg:text-start lg:justify-between lg:gap-x-10">
            <div className="flex flex-col lg:items-start lg:justify-center">
                <h2 className="text-2xl lg:text-2xl xl:text-5xl font-medium capitalize mb-3 leading-normal">
                    <span className="text-violet-700">Alquila</span> la casa de
                    tus sueños con nosotros
                </h2>
                <p className="text-md text-primary leading-relaxed  xl:text-xl">
                    Haz que tus vacaciones sean inolvidables reservando tu
                    alojamiento ideal en Heflú. Estás a un solo clic de tu
                    felicidad.
                </p>
            </div>
            <img
                src="/images/hero-image.jpg"
                alt="Imagen de un chalet"
                className="hidden lg:block lg:min-w-[400px] lg:max-w-[900px] lg:rounded-tl-[100px]"
            />
        </section>
    )
}

export default Hero
