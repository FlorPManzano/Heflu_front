import { useState, useEffect } from "react"
import Logo from "/heflu-logo.svg"
import Modal from "react-modal"
import { IoCloseOutline } from "react-icons/io5"
// Importación de formularios
import RegisterModal from "./modals/RegisterModal"
import LoginModal from "./modals/LoginModal"

Modal.setAppElement("body")

const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
}

const Header = () => {
    const [navIsActive, setNavIsActive] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)

    const openRegisterModal = () => {
        setRegisterModal(true)
    }
    const closeRegisterModal = () => {
        setRegisterModal(false)
    }

    const openLoginModal = () => {
        setLoginModal(true)
    }
    const closeLoginModal = () => {
        setLoginModal(false)
    }

    // Animación del header
    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 60 ? setNavIsActive(true) : setNavIsActive(false)
        })
    }, [])

    return (
        <header
            className={`${
                navIsActive ? "bg-white/80 shadow-md" : "bg-none"
            } fixed top-0 w-full transition-all py-4 px-6 flex justify-between items-center`}
        >
            <img src={Logo} alt="Heflu logo" className="h-10 lg:h-16" />

            <nav className="flex items-center justify-between gap-1 lg:gap-4">
                <button
                    className="text-violet-700 border border-violet-700 px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-md rounded-lg mr-4 hover:shadow-lg transition-shadow duration-300 ease-in-out capitalize"
                    onClick={openLoginModal}
                >
                    Inicia sesión
                </button>
                <button
                    className="bg-violet-700 border border-violet-700 text-white px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    onClick={openRegisterModal}
                >
                    Regístrate
                </button>
            </nav>
            {registerModal && (
                <Modal
                    isOpen={registerModal}
                    style={modalStyles}
                    onRequestClose={closeRegisterModal}
                    contentLabel="Register Modal"
                    className="bg-white w-full h-full lg:max-w-[800px] lg:max-h-[600px] lg:rounded-[30px] lg:fixed lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] outline-none overscroll-contain"
                >
                    <div
                        onClick={closeRegisterModal}
                        className="absolute z-30 right-2 top-2 hover:scale-110 duration-200 cursor-pointer"
                    >
                        <IoCloseOutline className="text-4xl text-primary" />
                    </div>
                    <RegisterModal
                        registerModal={registerModal}
                        setRegisterModal={setRegisterModal}
                        closeRegisterModal={closeRegisterModal}
                    />
                </Modal>
            )}
            {loginModal && (
                <Modal
                    isOpen={loginModal}
                    style={modalStyles}
                    onRequestClose={closeLoginModal}
                    contentLabel="Login Modal"
                    className="bg-white w-full h-full lg:max-w-[600px] lg:max-h-[500px] lg:rounded-[30px] lg:fixed lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] outline-none overscroll-contain"
                >
                    <div
                        onClick={closeLoginModal}
                        className="absolute z-30 right-2 top-2 hover:scale-110 duration-200 cursor-pointer"
                    >
                        <IoCloseOutline className="text-4xl text-primary" />
                    </div>
                    <LoginModal
                        loginModal={loginModal}
                        setLoginModal={setLoginModal}
                        closeLoginModal={closeLoginModal}
                        setRegisterModal={setRegisterModal}
                        openRegisterModal={openRegisterModal}
                    />
                </Modal>
            )}
        </header>
    )
}

export default Header
