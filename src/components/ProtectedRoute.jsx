import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuthentication } from '../services/AuthService';

export default function ProtectedRoute({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const result = await checkAuthentication();
      setUserRole(result);
      setIsLoading(false);
    }

    checkAuth();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (userRole === false || userRole == null) {
    return <Navigate to="/login" replace />;
  }

  return children;
}