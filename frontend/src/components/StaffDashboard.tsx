import { useState } from "react";
import { CheckCircle, Clock, AlertTriangle, Wrench, MapPin, Calendar } from "lucide-react";

export default function StaffDashboard() {
  const [tasks, setTasks] = useState([
    {
      id: "REQ-001",
      title: "Leaking Faucet",
      location: "Dorm B, Room 302",
      category: "Plumbing",
      status: "In Progress",
      priority: "Medium",
      dateSubmitted: "2024-01-15",
      submittedBy: "Prof. Johnson",
      description:
        "Water is continuously dripping from the bathroom faucet. Students report it's been going on for 2 days.",
      notes: "Checked the faucet, need to replace the washer. Parts ordered.",
    },
    {
      id: "REQ-004",
      title: "Clogged Drain",
      location: "Cafeteria Kitchen",
      category: "Plumbing",
      status: "Assigned",
      priority: "High",
      dateSubmitted: "2024-01-16",
      submittedBy: "Kitchen Staff",
      description: "Main sink drain is completely blocked, affecting food preparation.",
      notes: "",
    },
    {
      id: "REQ-005",
      title: "Broken Pipe",
      location: "Basement - Main Building",
      category: "Plumbing",
      status: "Assigned",
      priority: "Urgent",
      dateSubmitted: "2024-01-16",
      submittedBy: "Maintenance Admin",
      description: "Water pipe burst in basement, causing flooding risk.",
      notes: "",
    },
  ]);

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const updateTaskNotes = (taskId: string, notes: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, notes } : task)));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Assigned":
        return "bg-primary-subtle text-primary";
      case "In Progress":
        return "bg-warning-subtle text-warning";
      case "Completed":
        return "bg-success-subtle text-success";
      default:
        return "bg-secondary-subtle text-secondary";
    }
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
              <Wrench className="text-success me-3" style={{ width: "32px", height: "32px" }} />
              <div>
                <h1 className="h4 fw-bold mb-0">EduFix</h1>
                <p className="small text-muted mb-0">Maintenance Staff Dashboard</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="small text-muted">Welcome, John Smith (Plumber)</span>
              <button className="btn btn-outline-secondary btn-sm">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="mb-4">
          <h2 className="h3 fw-bold mb-1">My Assigned Tasks</h2>
          <p className="text-muted">Manage and update your maintenance assignments</p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Assigned Tasks</h5>
                  <Clock className="text-primary" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-primary mb-0">
                  {tasks.filter((t) => t.status === "Assigned").length}
                </p>
                <p className="small text-muted">Ready to start</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">In Progress</h5>
                  <AlertTriangle className="text-warning" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-warning mb-0">
                  {tasks.filter((t) => t.status === "In Progress").length}
                </p>
                <p className="small text-muted">Currently working</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title h6 text-muted mb-0">Completed Today</h5>
                  <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />
                </div>
                <p className="h3 fw-bold text-success mb-0">3</p>
                <p className="small text-muted">Tasks finished</p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="card border-start border-4 border-primary">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title d-flex flex-wrap gap-2 align-items-center">
                      <span>{task.title}</span>
                      <span className={`badge rounded-pill ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className={`badge rounded-pill ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </h5>
                    <div className="mt-2">
                      <div className="d-flex flex-wrap gap-3 small text-muted">
                        <div className="d-flex align-items-center">
                          <MapPin className="me-1" style={{ width: "14px", height: "14px" }} />
                          {task.location}
                        </div>
                        <div className="d-flex align-items-center">
                          <Calendar className="me-1" style={{ width: "14px", height: "14px" }} />
                          {task.dateSubmitted}
                        </div>
                        <span>#{task.id}</span>
                        <span>By: {task.submittedBy}</span>
                      </div>
                    </div>
                  </div>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: "150px" }}
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-3">
                  <div>
                    <h6 className="fw-medium text-dark mb-2">Issue Description</h6>
                    <p className="text-muted small">{task.description}</p>
                  </div>

                  <div>
                    <h6 className="fw-medium text-dark mb-2">Work Notes</h6>
                    <textarea
                      className="form-control"
                      placeholder="Add notes about your work progress, parts needed, completion details..."
                      value={task.notes}
                      onChange={(e) => updateTaskNotes(task.id, e.target.value)}
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-secondary btn-sm">View Images</button>
                    <button className="btn btn-outline-secondary btn-sm">Add Photos</button>
                    {task.status === "Completed" && (
                      <button className="btn btn-success btn-sm">Mark Complete</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}