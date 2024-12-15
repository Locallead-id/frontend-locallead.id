import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; // Change based on backend server

// Define the User data type
interface UserProfile {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: number;
    userId: number;
    fullName: string;
    address: string;
    dateOfBirth: string;
    joinDate: string;
    imageUrl: string;
    isPremium: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// Define context value type
interface UserContextValue {
  user: UserProfile | null;
  fetchUserProfile: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
}

// Create Context
const UserContext = createContext<UserContextValue | null>(null);

// Custom Hook for consuming UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

// Props for UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Function to fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found");

      const response = await axios.get(`${BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.data);
      localStorage.setItem("data_user", JSON.stringify(response.data.data));
       localStorage.setItem("role_user", response.data.data.role);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Function to log in
  const login = async (data: { email: string; password: string }) => {
    try {
      const response = await axios({
        url: `${BASE_URL}/auth/login`,
        method: "POST",
        data: { email: data.email, password: data.password },
      });
      localStorage.setItem("access_token", response.data.access_token);
      await fetchUserProfile(); // Fetch user profile after successful login
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Fetch user profile when component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUserProfile, login }}>
      {children}
    </UserContext.Provider>
  );
};
