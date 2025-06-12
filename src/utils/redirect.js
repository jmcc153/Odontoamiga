import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const RedirectOnLoad = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const validation = searchParams.get('validation');

    // Si NO hay validation, redirige a la misma ruta pero con ?validation=otp
    if (!validation) {
      searchParams.set('validation', 'fid');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  }, [location, navigate]);

  return null; // Solo redirige
};