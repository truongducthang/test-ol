import { useAppSelector } from 'app/hooks';
import { selectIsLoggedIn } from 'features/auth/authSlice';
import { Navigate } from 'react-router-dom';
export interface PrivateRouteProps {
  [key: string]: any;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}
