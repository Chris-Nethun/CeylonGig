import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginRequest, register as registerRequest } from '../features/identity/services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ceylongig_user') || 'null'); }
    catch { return null; }
  });

  const acceptSession = useCallback((data) => {
    const token = data.token || data.accessToken;
    if (!token) throw new Error('The server did not return an access token.');
    localStorage.setItem('ceylongig_token', token);
    localStorage.setItem('ceylongig_user', JSON.stringify(data.user || data));
    setUser(data.user || data);
  }, []);

  const login = useCallback(async (credentials) => acceptSession(await loginRequest(credentials)), [acceptSession]);
  const register = useCallback(async (details) => acceptSession(await registerRequest(details)), [acceptSession]);
  const logout = useCallback(() => {
    localStorage.removeItem('ceylongig_token');
    localStorage.removeItem('ceylongig_user');
    setUser(null);
  }, []);

  useEffect(() => {
    window.addEventListener('ceylongig:unauthorized', logout);
    return () => window.removeEventListener('ceylongig:unauthorized', logout);
  }, [logout]);

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, register, logout }), [user, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider.');
  return value;
}
