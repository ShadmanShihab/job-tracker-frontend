import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function OAuth2CallbackPage() {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      navigate('/login?error=oauth_failed');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;
    // Decode user info from token payload (base64)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      login({ email: payload.sub }, token);
      navigate('/dashboard');
    } catch {
      navigate('/login?error=oauth_failed');
    }
  }, []);

  return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Signing you in...</div>;
}
