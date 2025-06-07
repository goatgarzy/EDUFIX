import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Clock, CheckCircle, AlertCircle, Building, Wrench } from "lucide-react";

export default function FacultyDashboard() {
  const [requests] = useState([
    {
      id: "REQ-001",
      title: "Leaking Faucet",
      location: "Dorm B, Room 302",
      category: "Plumbing",
      status: "In Progress",
      priority: "Medium",
      dateSubmitted: "2024-01-15",
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
      assignedTo: null,
    },
    {
      id: "REQ-003",
      title: "Flickering Lights",
      location: "Library - 2nd Floor",
      category: "Electrical",
      status: "Completed",
      priority: "Low",
      dateSubmitted: "2024-01-10",
      assignedTo: "Mike Johnson",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-warning-subtle text-warning";
      case "In Progress":
        return "bg-primary-subtle text-primary";
      case "Completed":
        return "bg-success-subtle text-success";
      default:
        return "bg-secondary-subtle text-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Wrench className="text-primary me-3" style={{ width: "32px", height: "32px" }} />
              <div>
                <h1 className="h4 fw-bold mb-0">EduFix</h1>
                <p className="small text-muted mb-0">Faculty Dashboard</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="small text-muted">Welcome, Prof. Johnson</span>
              <button className="btn btn-outline-secondary btn-sm">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 fw-bold">My Maintenance Requests</h2>
          <Link to="/faculty/new-request" className="btn btn-primary">
            <Plus className="me-2" style={{ width: "16px", height: "16px" }} />
            New Request
          </Link>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Total Requests</h5>
                  <AlertCircle className="text-muted" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold mb-0">{requests.length}</p>
                <p className="small text-muted">All time</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Pending</h5>
                  <Clock className="text-warning" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-warning mb-0">
                  {requests.filter((r) => r.status === "Pending").length}
                </p>
                <p className="small text-muted">Awaiting assignment</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Completed</h5>
                  <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-success mb-0">
                  {requests.filter((r) => r.status === "Completed").length}
                </p>
                <p className="small text-muted">This month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Recent Requests</h5>
            <p className="card-subtitle text-muted small">Track the status of your maintenance requests</p>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-3">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="d-flex justify-content-between align-items-start border rounded p-3 hover-bg-light"
                >
                  <div className="flex-grow-1">
                    <div className="d-flex flex-wrap gap-2 mb-2 align-items-center">
                      <h3 className="h6 fw-semibold mb-0">{request.title}</h3>
                      <span className={`badge rounded-pill ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <span className={`badge rounded-pill ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </div>
                    <div className="d-flex flex-wrap gap-3 small text-muted">
                      <div className="d-flex align-items-center">
                        <Building className="me-1" style={{ width: "14px", height: "14px" }} />
                        {request.location}
                      </div>
                      <span>#{request.id}</span>
                      <span>{request.category}</span>
                      <span>Submitted: {request.dateSubmitted}</span>
                      {request.assignedTo && <span>Assigned to: {request.assignedTo}</span>}
                    </div>
                  </div>
                  <button className="btn btn-outline-primary btn-sm">View Details</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}