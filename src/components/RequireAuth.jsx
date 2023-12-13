import { useLocation, Navigate, Outlet, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const { userId } = useParams();

  const isLoggedIn = !!auth?.userId;
  const isCorrectUser = isLoggedIn && auth.userId.toString() === userId;
  console.log("isLoggedIn", isLoggedIn)
  console.log("!isCorrectUser", !isCorrectUser)

  // This is kinda workin.. will need in implement persisting auth state!

  if (isLoggedIn && !isCorrectUser) {
    console.log("it worked..")
    return <Navigate to={`/users/${userId}/unauthorized`} state={{ from: location }} replace />;
  } else if (!isLoggedIn) {
    console.log("it didn't work..")
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
