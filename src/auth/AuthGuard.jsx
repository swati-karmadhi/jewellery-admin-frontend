import { pageRoutes } from '../constants/routesList';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import AuthStorage from '../utils/authStorage';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const tokenFound = AuthStorage.isUserAuthenticated();
  const { pathname } = useLocation();

  if (isAuthenticated && tokenFound) return <>{children}</>;

  return <Navigate replace to={pageRoutes.general.login} state={{ from: pathname }} />;
};

export default AuthGuard;
