// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);

  // Load from localStorage on first render
  useEffect(() => {
    const storedAccess = localStorage.getItem("bb_accessToken");
    const storedRefresh = localStorage.getItem("bb_refreshToken");
    if (storedAccess) {
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh || null);
      const payload = parseJwt(storedAccess);
      if (payload) {
        setUser({
          id: payload.uid,
          username: payload.sub,
          role: payload.role,
        });
      }
    }
  }, []);

  const login = (tokensResponse) => {
    const { accessToken: a, refreshToken: r } = tokensResponse || {};
    if (!a) return;

    localStorage.setItem("bb_accessToken", a);
    if (r) {
      localStorage.setItem("bb_refreshToken", r);
    }

    setAccessToken(a);
    setRefreshToken(r || null);

    const payload = parseJwt(a);
    if (payload) {
      setUser({
        id: payload.uid,
        username: payload.sub,
        role: payload.role,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("bb_accessToken");
    localStorage.removeItem("bb_refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
