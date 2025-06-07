// Central types file for EduFix application

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

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}