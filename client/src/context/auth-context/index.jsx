import { checkAuthService } from "@/service/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
const intialState = {
  isAuthenticated: false,
  user: null,
};

function AuthContextProvider({ children }) {
  const [authData, setAuthData] = useState(intialState);
  const [loading, setLoading] = useState(true);

  async function checkAuthUser() {
    setLoading(true);
    const data = await checkAuthService();
    if (data.success) {
      setAuthData({
        isAuthenticated: true,
        user: data.data,
      });
      setLoading(false);
    } else {
      setAuthData(intialState);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, loading, checkAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
