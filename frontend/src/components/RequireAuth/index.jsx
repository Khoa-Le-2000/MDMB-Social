import useAuth from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const { authed } = useAuth();
  console.log('authed: ', authed);
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
export default RequireAuth;
