import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, isApproved } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!isApproved) {
    return <Navigate to="/aprobacion" />;
  }

  return children;
};

export default PrivateRoute;
