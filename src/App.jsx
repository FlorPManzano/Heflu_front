import { Routes, Route } from "react-router-dom"

// Importación de páginas
import HomePage from "./pages/HomePage"
import BookingsPage from "./pages/BookingsPage"
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
import { useProperties } from "./hooks/useProperties"

function App() {
    const { properties, setProperties } = useProperties()
    return (
        <div className="flex flex-col">
            <Header setProperties={setProperties} properties={properties} />
            <div className="min-h-screen flex-grow">
                <Routes>
                    {/* Rutas públicas */}
                    <Route
                        path="/"
                        element={<HomePage properties={properties} />}
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
                        <Route
                            path="/profile/:id"
                            element={<ViewUserProfilePage />}
                        />
                        <Route
                            path="/profile/reviews"
                            element={<PendingReviewsPage />}
                        />
                        <Route
                            path="/profile/bookings"
                            element={<BookingsPage />}
                        />
                        <Route
                            path="/profile/requests"
                            element={<PendingRequestsPage />}
                        />
                    </Route>
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App
