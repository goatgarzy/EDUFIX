import axios, { AxiosError } from "axios";
import authHeader from "./auth-header";
import { User, ApiError } from "./auth.service";

const API_URL = "http://localhost:8080/api/admin/";

export interface MaintenanceRequest {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  priority: string;
  status: string;
  submittedBy: User;
  assignedTo?: User;
  dateSubmitted: string;
  lastUpdated?: string;
  notes?: string;
}

export interface AdminDashboardStats {
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  completedRequests: number;
  pendingUsers: number;
}

class AdminService {
  async getDashboardStats(): Promise<AdminDashboardStats> {
    return this.handleApiCall<AdminDashboardStats>(
      () => axios.get<AdminDashboardStats>(API_URL + "dashboard/stats", { headers: authHeader() }),
      "Failed to fetch dashboard statistics"
    );
  }

  async getPendingUsers(): Promise<User[]> {
    return this.handleApiCall<User[]>(
      () => axios.get<User[]>(API_URL + "pending-users", { headers: authHeader() }),
      "Failed to fetch pending users"
    );
  }

  async getPendingFaculty(): Promise<User[]> {
    return this.handleApiCall<User[]>(
      () => axios.get<User[]>(API_URL + "pending-users/faculty", { headers: authHeader() }),
      "Failed to fetch pending faculty"
    );
  }

  async getPendingStaff(): Promise<User[]> {
    return this.handleApiCall<User[]>(
      () => axios.get<User[]>(API_URL + "pending-users/staff", { headers: authHeader() }),
      "Failed to fetch pending staff"
    );
  }

  async approveUser(userId: number): Promise<any> {
    return this.handleApiCall<any>(
      () => axios.put(API_URL + `approve-user/${userId}`, {}, { headers: authHeader() }),
      "Failed to approve user"
    );
  }

  async rejectUser(userId: number): Promise<any> {
    return this.handleApiCall<any>(
      () => axios.put(API_URL + `reject-user/${userId}`, {}, { headers: authHeader() }),
      "Failed to reject user"
    );
  }

  async getMaintenanceStaff(): Promise<User[]> {
    return this.handleApiCall<User[]>(
      () => axios.get<User[]>(API_URL + "maintenance-staff", { headers: authHeader() }),
      "Failed to fetch maintenance staff"
    );
  }

  async getAllRequests(): Promise<MaintenanceRequest[]> {
    return this.handleApiCall<MaintenanceRequest[]>(
      () => axios.get<MaintenanceRequest[]>(API_URL + "all-requests", { headers: authHeader() }),
      "Failed to fetch requests"
    );
  }

  async getRequestsByStatus(status: string): Promise<MaintenanceRequest[]> {
    return this.handleApiCall<MaintenanceRequest[]>(
      () => axios.get<MaintenanceRequest[]>(API_URL + `requests/status/${status}`, { headers: authHeader() }),
      `Failed to fetch ${status} requests`
    );
  }

  async assignRequest(requestId: number, staffId: number): Promise<any> {
    return this.handleApiCall<any>(
      () => axios.put(API_URL + `assign/${requestId}/to/${staffId}`, {}, { headers: authHeader() }),
      "Failed to assign request"
    );
  }

  // Generic method to handle API calls with consistent error handling
  private async handleApiCall<T>(apiCall: () => Promise<any>, errorMessage: string): Promise<T> {
    try {
      const response = await apiCall();
      return response.data;
    } catch (error: any) {
      console.error(`API Error: ${errorMessage}`, error);
      
      // Handle authentication errors
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/admin"; // Redirect to admin login
      }
      
      // Throw error with message
      if (error.response) {
        throw error.response.data;
      } else {
        throw { message: errorMessage };
      }
    }
  }
}

export default new AdminService();