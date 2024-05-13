import { Routes, Route } from "react-router-dom"

// Importación de páginas
import HomePage from "./pages/HomePage"
import PendingRequestsPage from "./pages/PendingRequestsPage"
import PendingReviewsPage from "./pages/PendingReviewsPage"
import PropertyDetailsPage from "./pages/PropertyDetailsPage"
import ViewUserProfilePage from "./pages/ViewUserProfilePage"
import NotFoundPage from "./pages/NotFoundPage"
import ValidateUserPage from "./pages/ValidateUserPage"
// Importación de componentes
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoutes from "./components/PrivateRoutes"

import { useFilterProperties } from "./hooks/useFilterProperties"

function App() {
    const { filterProperties, setFilterProperties } = useFilterProperties()
    return (
        <>
            <Header
                setFilterProperties={setFilterProperties}
                filterProperties={filterProperties}
            />
            <Routes>
                {/* Rutas públicas */}
                <Route
                    path="/"
                    element={<HomePage filterProperties={filterProperties} />}
                />
                <Route
                    path="/properties/:id"
                    element={<PropertyDetailsPage />}
                />
                <Route
                    path="/users/validate/:registration_code"
                    element={<ValidateUserPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
                {/* Rutas privadas */}
                <Route element={<PrivateRoutes />}>
                    <Route path="/profile/" element={<ViewUserProfilePage />} />
                    <Route
                        path="/profile/reviews"
                        element={<PendingReviewsPage />}
                    />
                    <Route
                        path="/profile/requests"
                        element={<PendingRequestsPage />}
                    />
                </Route>
            </Routes>
            <Footer />
        </>
    )
}

export default App
