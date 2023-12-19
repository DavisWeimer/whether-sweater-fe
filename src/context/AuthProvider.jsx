import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = sessionStorage.getItem("authData");
    return savedAuth ? JSON.parse(savedAuth) : {};
  });

  useEffect(() => {
    sessionStorage.setItem("authData", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
