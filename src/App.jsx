import { Routes, Route } from "react-router-dom"

// Importación de páginas
import HomePage from "./pages/HomePage"
import ActiveRentingsPage from "./pages/ActiveRentingsPage"
import PendingRequestsPage from "./pages/PendingRequestsPage"
import PendingReviewsPage from "./pages/PendingReviewsPage"
import PropertyDetailsPage from "./pages/PropertyDetailsPage"
import ViewUserProfilePage from "./pages/ViewUserProfilePage"
import NotFoundPage from "./pages/NotFoundPage"

// Importación de componentes
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
    return (
        <>
            <Header />
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/properties/:id"
                    element={<PropertyDetailsPage />}
                />
                {/* Rutas privadas */}
                <Route path="/profile/" element={<ViewUserProfilePage />} />
                <Route
                    path="/profile/rentings"
                    element={<ActiveRentingsPage />}
                />
                <Route
                    path="/profile/reviews"
                    element={<PendingReviewsPage />}
                />
                <Route
                    path="/profile/requests"
                    element={<PendingRequestsPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
