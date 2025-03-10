import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define types for auth data
export interface CloudflareAuth {
  cloudflareAccountId: string;
  cloudflareR2AccessKeyId: string;
  cloudflareR2SecretAccessKey: string;
  cloudflareR2BucketName: string;
}

// Define the context type
interface AuthContextType {
  auth: CloudflareAuth | null;
  login: (authData: CloudflareAuth) => void;
  logout: () => void;
}

// Create context with type and default value
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<CloudflareAuth | null>(null);
  const navigate = useNavigate();

  // Load auth data from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuth(parsedAuth);
      } catch (error) {
        console.error("Failed to parse stored auth data:", error);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  const login = (authData: CloudflareAuth) => {
    // Validate auth data
    if (!isValidAuthData(authData)) {
      throw new Error("Invalid authentication data");
    }

    setAuth(authData);
    // Store auth data securely
    localStorage.setItem("auth", JSON.stringify(authData));
    navigate("/upload");
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Type guard to validate auth data
function isValidAuthData(data: any): data is CloudflareAuth {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.cloudflareAccountId === "string" &&
    typeof data.cloudflareR2AccessKeyId === "string" &&
    typeof data.cloudflareR2SecretAccessKey === "string" &&
    typeof data.cloudflareR2BucketName === "string" &&
    Object.values(data).every((value: unknown) => 
      typeof value === "string" && value.trim().length > 0
    )
  );
}

// Custom hook with type safety
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}