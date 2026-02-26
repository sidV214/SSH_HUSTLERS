import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedRole = localStorage.getItem('rxguard_role');
    return savedRole ? { id: 'demo-user', role: savedRole } : null;
  });

  const loginAsRole = (role) => {
    localStorage.setItem('rxguard_role', role);
    setUser({ id: 'demo-user', role });
  };

  const logout = () => {
    localStorage.removeItem('rxguard_role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAsRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

