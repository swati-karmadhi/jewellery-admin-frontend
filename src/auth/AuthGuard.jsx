import { pageRoutes } from '../constants/routesList';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (isAuthenticated) return <>{children}</>;

  return <Navigate replace to={pageRoutes.general.login} state={{ from: pathname }} />;
};

export default AuthGuard;
