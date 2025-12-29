import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import NewUser from '../pages/auth/NewUser';
import Profile from '../pages/profile/Profile';
import ProtectedRoute from '../routes/ProtectedRoute';
import Navbar from '../components/ui/Navbar';

// Un pequeño componente para envolver rutas de admin
const AdminRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    // Si no es admin, lo mandamos al dashboard normal
    return <Navigate to='/dashboard' replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <Navbar />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas Públicas */}
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Navigate to='/dashboard' />} />

            {/* Grupo de Rutas Protegidas (Requieren Login) */}
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/profile' element={<Profile />} />

              {/* Ruta específica para Admin */}
              <Route
                path='/admin/new-user'
                element={
                  <AdminRoute>
                    <NewUser />
                  </AdminRoute>
                }
              />
            </Route>

            {/* 404 - Opcional */}
            <Route path='*' element={<h2>Página no encontrada</h2>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
