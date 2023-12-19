import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const useRedirectIfAuthenticated = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.bearerToken) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);
};

export default useRedirectIfAuthenticated;
