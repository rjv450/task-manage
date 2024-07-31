// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // This is the correct way to import if 'jwt-decode' supports default export

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        // Check if the token is still valid
        if (decodedToken.exp * 1000 > Date.now()) {
          console.log("jjjj");
          setIsAuthenticated(true);
          console.log(isAuthenticated);
        }
      } catch (e) {
        console.log(e);
        setIsAuthenticated(false);
      }
    }
  }, []);
console.log(isAuthenticated);
  return { isAuthenticated };
};
