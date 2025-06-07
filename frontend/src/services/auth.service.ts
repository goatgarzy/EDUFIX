import axios from "axios";

// Define interfaces directly in this file
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
  tokenType?: string;
  roles: string[];
  userType: string;
  
  // Additional user properties
  phone?: string;
  department?: string;
  employeeId?: string;
  specialization?: string;
  experience?: string;
  certifications?: string;
  registrationStatus?: string;
  registrationDate?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

const API_URL = "http://localhost:8080/api/";

class AuthService {
  async login(email: string, password: string, userType: string): Promise<User> {
    try {
      const response = await axios.post<User>(API_URL + "auth/signin", {
        email,
        password,
        userType
      });
      
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw { message: "Error connecting to server" };
      }
    }
  }

  async adminLogin(email: string, password: string): Promise<User> {
    try {
      const response = await axios.post<User>(API_URL + "auth/admin/signin", {
        email,
        password,
        userType: "admin"
      });
      
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw { message: "Error connecting to server" };
      }
    }
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  async register(userData: any): Promise<any> {
    try {
      const response = await axios.post(API_URL + "auth/signup", userData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw { message: "Registration failed" };
      }
    }
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
      localStorage.removeItem("user"); // Clear invalid data
      return null;
    }
  }
}

export default new AuthService();