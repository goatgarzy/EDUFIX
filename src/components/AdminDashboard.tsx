import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Wrench, UserCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("requests");
  
  const [requests] = useState([
    {
      id: "REQ-001",
      title: "Leaking Faucet",
      location: "Dorm B, Room 302",
      category: "Plumbing",
      status: "In Progress",
      priority: "Medium",
      dateSubmitted: "2024-01-15",
      submittedBy: "Prof. Johnson",
      assignedTo: "John Smith",
    },
    {
      id: "REQ-002",
      title: "Broken AC Unit",
      location: "Classroom A-101",
      category: "HVAC",
      status: "Pending",
      priority: "High",
      dateSubmitted: "2024-01-14",
      submittedBy: "Prof. Davis",
      assignedTo: null,
    },
    {
      id: "REQ-004",
      title: "Clogged Drain",
      location: "Cafeteria Kitchen",
      category: "Plumbing",
      status: "Pending",
      priority: "High",
      dateSubmitted: "2024-01-16",
      submittedBy: "Kitchen Staff",
      assignedTo: null,
    },
  ]);

  const [staff] = useState([
    { id: 1, name: "John Smith", role: "Plumber", status: "Available", activeJobs: 1 },
    { id: 2, name: "Mike Johnson", role: "Electrician", status: "Busy", activeJobs: 3 },
    { id: 3, name: "Sarah Wilson", role: "HVAC Technician", status: "Available", activeJobs: 0 },
    { id: 4, name: "Tom Brown", role: "General Maintenance", status: "Available", activeJobs: 2 },
  ]);

  const categoryData = [
    { name: "Plumbing", value: 35, color: "#0d6efd" },
    { name: "Electrical", value: 25, color: "#dc3545" },
    { name: "HVAC", value: 20, color: "#198754" },
    { name: "Cleaning", value: 12, color: "#fd7e14" },
    { name: "Other", value: 8, color: "#6f42c1" },
  ];

  const monthlyData = [
    { month: "Jan", requests: 45, completed: 42 },
    { month: "Feb", requests: 52, completed: 48 },
    { month: "Mar", requests: 38, completed: 35 },
    { month: "Apr", requests: 61, completed: 58 },
    { month: "May", requests: 55, completed: 52 },
    { month: "Jun", requests: 67, completed: 63 },
  ];

  const assignTask = (requestId: string, staffId: number) => {
    // In a real app, this would call your Spring Boot API
    console.log(`Assigning request ${requestId} to staff ${staffId}`);
    alert("Task assigned successfully!");
  };



  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-danger-subtle text-danger";
      case "High":
        return "bg-danger-subtle text-danger";
      case "Medium":
        return "bg-warning-subtle text-warning";
      case "Low":
        return "bg-success-subtle text-success";
      default:
        return "bg-secondary-subtle text-secondary";
    }
  };

  
  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-white shadow-sm border-bottom">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Wrench className="text-purple me-3" style={{ width: "32px", height: "32px" }} />
              <div>
                <h1 className="h4 fw-bold mb-0">EduFix</h1>
                <p className="small text-muted mb-0">Administrator Dashboard</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="small text-muted">Welcome, Admin</span>
              <button className="btn btn-outline-secondary btn-sm">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="mb-4">
          <h2 className="h3 fw-bold mb-1">System Overview</h2>
          <p className="text-muted">Monitor and manage all maintenance activities</p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Total Requests</h5>
                  <AlertTriangle className="text-secondary" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold mb-0">127</p>
                <p className="small text-muted">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Pending</h5>
                  <Clock className="text-warning" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-warning mb-0">
                  {requests.filter((r) => r.status === "Pending").length}
                </p>
                <p className="small text-muted">Need assignment</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">In Progress</h5>
                  <TrendingUp className="text-primary" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-primary mb-0">8</p>
                <p className="small text-muted">Being worked on</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Completed</h5>
                  <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-success mb-0">95%</p>
                <p className="small text-muted">Resolution rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Registrations Card */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Pending Registrations</h5>
                  <UserCheck className="text-warning" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-warning mb-0">3</p>
                <p className="small text-muted">Need approval</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === "requests" ? "active" : ""}`}
              onClick={() => setActiveTab("requests")}
            >
              Manage Requests
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === "staff" ? "active" : ""}`}
              onClick={() => setActiveTab("staff")}
            >
              Staff Management
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === "registrations" ? "active" : ""}`}
              onClick={() => setActiveTab("registrations")}
            >
              Pending Registrations
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Requests Tab */}
          {activeTab === "requests" && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Pending Requests</h5>
                <p className="card-subtitle text-muted small">Assign maintenance staff to pending requests</p>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-3">
                  {requests
                    .filter((r) => r.status === "Pending")
                    .map((request) => (
                      <div key={request.id} className="d-flex justify-content-between align-items-center p-3 border rounded">
                        <div>
                          <div className="d-flex flex-wrap gap-2 mb-2 align-items-center">
                            <h6 className="fw-semibold mb-0">{request.title}</h6>
                            <span className={`badge rounded-pill ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                          </div>
                          <div className="small text-muted">
                            <span>
                              {request.location} • {request.category} • #{request.id}
                            </span>
                            <span className="ms-3">Submitted by: {request.submittedBy}</span>
                          </div>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                          <select className="form-select form-select-sm" style={{ width: "180px" }}>
                            <option value="">Assign to staff</option>
                            {staff
                              .filter((s) => s.status === "Available")
                              .map((member) => (
                                <option key={member.id} value={member.id}>
                                  {member.name} ({member.role})
                                </option>
                              ))}
                          </select>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => assignTask(request.id, staff[0].id)} // Just for demo
                          >
                            Assign
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Staff Tab */}
          {activeTab === "staff" && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Staff Overview</h5>
                <p className="card-subtitle text-muted small">Monitor staff availability and workload</p>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {staff.map((member) => (
                    <div key={member.id} className="col-md-6">
                      <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                        <div className="d-flex gap-3 align-items-center">
                          <UserCheck className="text-primary" style={{ width: "24px", height: "24px" }} />
                          <div>
                            <h6 className="fw-semibold mb-0">{member.name}</h6>
                            <p className="small text-muted mb-0">{member.role}</p>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className={`badge ${member.status === "Available" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
                            {member.status}
                          </span>
                          <p className="small text-muted mt-1">{member.activeJobs} active jobs</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Monthly Requests</h5>
                    <p className="card-subtitle text-muted small">Request volume and completion rates</p>
                  </div>
                  <div className="card-body">
                    <div style={{ height: "300px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="requests" fill="#0d6efd" name="Requests" />
                          <Bar dataKey="completed" fill="#198754" name="Completed" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Request Categories</h5>
                    <p className="card-subtitle text-muted small">Distribution by issue type</p>
                  </div>
                  <div className="card-body">
                    <div style={{ height: "300px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registrations Tab */}
          {activeTab === "registrations" && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Pending User Registrations</h5>
                <p className="card-subtitle text-muted small">Review and approve new user registrations</p>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                    <div>
                      <h6 className="fw-semibold mb-1">Sarah Johnson</h6>
                      <p className="small text-muted mb-0">Faculty - Mathematics Department</p>
                      <p className="small text-muted mb-0">sarah.johnson@school.edu • Registered: 2024-01-16</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-success btn-sm">Approve</button>
                      <button className="btn btn-danger btn-sm">Reject</button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                    <div>
                      <h6 className="fw-semibold mb-1">Mike Wilson</h6>
                      <p className="small text-muted mb-0">Maintenance Staff - Electrical</p>
                      <p className="small text-muted mb-0">mike.wilson@maintenance.com • Registered: 2024-01-15</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-success btn-sm">Approve</button>
                      <button className="btn btn-danger btn-sm">Reject</button>
                    </div>
                  </div>

                  <div className="text-center py-3">
                    <Link to="/admin/pending-registrations" className="btn btn-outline-primary">
                      View All Pending Registrations
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}