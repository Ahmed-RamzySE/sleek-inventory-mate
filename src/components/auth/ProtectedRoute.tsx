
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface ProtectedRouteProps {
  allowedRoles?: Array<'admin' | 'manager' | 'user'>;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useUser();

  // If still checking authentication status, show a loading state
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user doesn't have permission
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
