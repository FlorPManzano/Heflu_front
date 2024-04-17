import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Logo from "/heflu-logo.svg"
import Modal from "react-modal"
import { IoCloseOutline } from "react-icons/io5"
import useAuth from "../hooks/useAuth"
const APIUrl = import.meta.env.VITE_API_URL

import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

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
    const { authToken, authUser, authLogout } = useAuth()
    const [navIsActive, setNavIsActive] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClickProfile = () => {
        navigate("/profile")
        handleClose()
    }

    const handleClickRentings = () => {
        navigate("/profile/rentings")
        handleClose()
    }

    const handleClickRequests = () => {
        navigate("/profile/requests")
        handleClose()
    }

    const handleClickReviews = () => {
        navigate("/profile/reviews")
        handleClose()
    }

    const handleClickLogout = () => {
        authLogout()
        handleClose()
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

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
            <Link to="/">
                <img src={Logo} alt="Heflu logo" className="h-10 lg:h-16" />
            </Link>

            {!authToken && (
                <nav className="flex items-center justify-between gap-1 lg:gap-4">
                    <button
                        className="text-violet-700 font-medium text-sm lg:text-md rounded-lg mr-4 hover:underline transition duration-300 ease-in-out capitalize"
                        onClick={openLoginModal}
                    >
                        Inicia sesión
                    </button>
                    <button
                        className="bg-violet-700 border border-violet-700 font-normal text-white px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
                        onClick={openRegisterModal}
                    >
                        Regístrate
                    </button>
                </nav>
            )}

            {authUser && (
                <nav className="flex items-center justify-between gap-1 lg:gap-4">
                    <button className="text-violet-700 font-medium text-sm lg:text-md rounded-lg mr-4 hover:underline transition duration-300 ease-in-out capitalize">
                        Publicar Alquiler
                    </button>
                    <img
                        className="rounded-full w-14 cursor-pointer"
                        src={`${APIUrl}/${authUser.avatar}`}
                        alt="Avatar"
                        onClick={handleClick}
                    />
                </nav>
            )}

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClickProfile}>Ver perfil</MenuItem>
                <MenuItem onClick={handleClickRentings}>
                    Mis alquileres
                </MenuItem>
                <MenuItem onClick={handleClickRequests}>
                    Solicitudes de alquiler
                </MenuItem>
                <MenuItem onClick={handleClickReviews}>
                    Valoraciones pendientes
                </MenuItem>
                <MenuItem onClick={handleClickLogout}>Cerrar sesión</MenuItem>
            </Menu>

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
