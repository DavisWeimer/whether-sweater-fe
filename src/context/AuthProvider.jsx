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

  useEffect(() => {
    const logout = () => {
      setAuth({});
      sessionStorage.removeItem("authData"); 
    };

    let timer;
    if (auth?.bearerToken) {
      timer = setTimeout(logout, 15 * 60 * 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
