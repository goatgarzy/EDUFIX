import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Clock, User, Wrench, Mail, Phone, Calendar } from "lucide-react";

export default function PendingRegistrations() {
  const [pendingRegistrations, setPendingRegistrations] = useState([
    {
      id: 1,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@school.edu",
      phone: "(555) 123-4567",
      userType: "faculty",
      department: "Mathematics",
      employeeId: "FAC-2024-001",
      registrationDate: "2024-01-16",
      status: "pending",
    },
    {
      id: 2,
      firstName: "Mike",
      lastName: "Wilson",
      email: "mike.wilson@maintenance.com",
      phone: "(555) 987-6543",
      userType: "staff",
      specialization: "Electrical",
      experience: "6-10",
      certifications: "Licensed Electrician, OSHA 30-Hour",
      registrationDate: "2024-01-15",
      status: "pending",
    },
    {
      id: 3,
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@school.edu",
      phone: "(555) 456-7890",
      userType: "faculty",
      department: "Science",
      employeeId: "FAC-2024-002",
      registrationDate: "2024-01-14",
      status: "pending",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const approveRegistration = (id: number) => {
    setPendingRegistrations((prev) => prev.map((reg) => (reg.id === id ? { ...reg, status: "approved" } : reg)));
    // In a real app, this would call your Spring Boot API
    console.log(`Approving registration ${id}`);
    alert("Registration approved! User will receive email notification.");
  };

  const rejectRegistration = (id: number) => {
    setPendingRegistrations((prev) => prev.map((reg) => (reg.id === id ? { ...reg, status: "rejected" } : reg)));
    // In a real app, this would call your Spring Boot API
    console.log(`Rejecting registration ${id}`);
    alert("Registration rejected. User will receive email notification.");
  };

  const pendingCount = pendingRegistrations.filter((reg) => reg.status === "pending").length;
  const facultyPending = pendingRegistrations.filter((reg) => reg.userType === "faculty" && reg.status === "pending");
  const staffPending = pendingRegistrations.filter((reg) => reg.userType === "staff" && reg.status === "pending");

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-white shadow-sm border-bottom">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Wrench className="text-purple me-3" style={{ width: "32px", height: "32px" }} />
              <div>
                <h1 className="h4 fw-bold mb-0">EduFix Admin</h1>
                <p className="small text-muted mb-0">Pending Registrations</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-warning-subtle text-warning">
                {pendingCount} Pending
              </span>
              <Link to="/admin/dashboard" className="btn btn-outline-secondary btn-sm">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="mb-4">
          <h2 className="h3 fw-bold mb-1">Registration Approvals</h2>
          <p className="text-muted">Review and approve new user registrations</p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Total Pending</h5>
                  <Clock className="text-warning" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-warning mb-0">{pendingCount}</p>
                <p className="small text-muted">Awaiting review</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Faculty</h5>
                  <User className="text-primary" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-primary mb-0">{facultyPending.length}</p>
                <p className="small text-muted">Teachers pending</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Maintenance Staff</h5>
                  <Wrench className="text-success" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-success mb-0">{staffPending.length}</p>
                <p className="small text-muted">Staff pending</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Pending ({pendingCount})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "faculty" ? "active" : ""}`}
              onClick={() => setActiveTab("faculty")}
            >
              Faculty ({facultyPending.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "staff" ? "active" : ""}`}
              onClick={() => setActiveTab("staff")}
            >
              Staff ({staffPending.length})
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {/* All Pending Tab */}
          {activeTab === "all" && (
            <div className="d-flex flex-column gap-4">
              {pendingRegistrations
                .filter((reg) => reg.status === "pending")
                .map((registration) => (
                  <div key={registration.id} className="card border-start border-4 border-warning">
                    <div className="card-header">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="card-title d-flex flex-wrap gap-2 align-items-center mb-2">
                            <span>{registration.firstName} {registration.lastName}</span>
                            <span className={`badge ${registration.userType === "faculty" 
                              ? "bg-primary-subtle text-primary" 
                              : "bg-success-subtle text-success"}`}>
                              {registration.userType === "faculty" ? "Faculty" : "Maintenance Staff"}
                            </span>
                          </h5>
                          <div className="d-flex flex-wrap gap-3 small text-muted">
                            <div className="d-flex align-items-center">
                              <Mail className="me-1" style={{ width: "14px", height: "14px" }} />
                              {registration.email}
                            </div>
                            <div className="d-flex align-items-center">
                              <Phone className="me-1" style={{ width: "14px", height: "14px" }} />
                              {registration.phone}
                            </div>
                            <div className="d-flex align-items-center">
                              <Calendar className="me-1" style={{ width: "14px", height: "14px" }} />
                              Registered: {registration.registrationDate}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-success btn-sm"
                            onClick={() => approveRegistration(registration.id)}
                          >
                            <CheckCircle className="me-1" style={{ width: "14px", height: "14px" }} />
                            Approve
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => rejectRegistration(registration.id)}
                          >
                            <XCircle className="me-1" style={{ width: "14px", height: "14px" }} />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        {registration.userType === "faculty" && (
                          <>
                            <div className="col-md-6">
                              <h6 className="fw-medium mb-2">Faculty Details</h6>
                              <div className="small text-muted mb-3">
                                <p className="mb-1">Department: {registration.department}</p>
                                <p className="mb-1">Employee ID: {registration.employeeId}</p>
                              </div>
                            </div>
                          </>
                        )}

                        {registration.userType === "staff" && (
                          <>
                            <div className="col-md-6">
                              <h6 className="fw-medium mb-2">Staff Details</h6>
                              <div className="small text-muted mb-3">
                                <p className="mb-1">Specialization: {registration.specialization}</p>
                                <p className="mb-1">Experience: {registration.experience} years</p>
                              </div>
                            </div>
                            {registration.certifications && (
                              <div className="col-md-6">
                                <h6 className="fw-medium mb-2">Certifications</h6>
                                <p className="small text-muted">{registration.certifications}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Faculty Tab */}
          {activeTab === "faculty" && (
            <div className="d-flex flex-column gap-4">
              {facultyPending.map((registration) => (
                <div key={registration.id} className="card border-start border-4 border-primary">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="card-title mb-2">
                          {registration.firstName} {registration.lastName}
                        </h5>
                        <div className="small text-muted">
                          <p className="mb-1">Email: {registration.email}</p>
                          <p className="mb-1">Department: {registration.department}</p>
                          <p className="mb-1">Employee ID: {registration.employeeId}</p>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={() => approveRegistration(registration.id)}
                        >
                          <CheckCircle className="me-1" style={{ width: "14px", height: "14px" }} />
                          Approve
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => rejectRegistration(registration.id)}
                        >
                          <XCircle className="me-1" style={{ width: "14px", height: "14px" }} />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Staff Tab */}
          {activeTab === "staff" && (
            <div className="d-flex flex-column gap-4">
              {staffPending.map((registration) => (
                <div key={registration.id} className="card border-start border-4 border-success">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="card-title mb-2">
                          {registration.firstName} {registration.lastName}
                        </h5>
                        <div className="small text-muted">
                          <p className="mb-1">Email: {registration.email}</p>
                          <p className="mb-1">Specialization: {registration.specialization}</p>
                          <p className="mb-1">Experience: {registration.experience} years</p>
                          {registration.certifications && <p className="mb-1">Certifications: {registration.certifications}</p>}
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={() => approveRegistration(registration.id)}
                        >
                          <CheckCircle className="me-1" style={{ width: "14px", height: "14px" }} />
                          Approve
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => rejectRegistration(registration.id)}
                        >
                          <XCircle className="me-1" style={{ width: "14px", height: "14px" }} />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}