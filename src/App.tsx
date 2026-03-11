import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PageTransition from './components/PageTransition'

// Eager load — critical for LCP
import LandingPage from './pages/LandingPage'

// Lazy-loaded pages
const BuildingExplorer = lazy(() => import('./pages/BuildingExplorer'))
const BuildingExplorerV2 = lazy(() => import('./pages/BuildingExplorerV2'))
const BuildingExplorerV3 = lazy(() => import('./pages/BuildingExplorerV3'))
const BuildingExplorerDual = lazy(() => import('./pages/BuildingExplorerDual'))
const BuildingExplorerDualAB = lazy(() => import('./pages/BuildingExplorerDualAB'))
const SuiteDetailPage = lazy(() => import('./pages/SuiteDetailPage'))
const SuitesExplorer = lazy(() => import('./pages/SuitesExplorer'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const LocationPage = lazy(() => import('./pages/LocationPage'))
const ApartmentsPage = lazy(() => import('./pages/ApartmentsPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

function AppRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/building" element={<BuildingExplorer />} />
          <Route path="/building-dual" element={<BuildingExplorerDualAB />} />
          <Route path="/building-v2" element={<BuildingExplorerV2 />} />
          <Route path="/building-v3" element={<BuildingExplorerV3 />} />
          <Route path="/building-classic" element={<BuildingExplorerDual />} />
          <Route path="/suite/:floor/:unit" element={<SuiteDetailPage />} />
          <Route path="/suites" element={<SuitesExplorer />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/apartments" element={<ApartmentsPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </PageTransition>
    </Suspense>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
