import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wrench, Users } from "lucide-react";
import AuthService from "../services/auth.service";

export default function LoginPage() {
  const [userType, setUserType] = useState("faculty");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await AuthService.login(email, password, userType);
      
      // Redirect based on user type
      if (userType === "staff") {
        navigate("/staff/dashboard");
      } else {
        navigate("/faculty/dashboard");
      }
    } catch (error: any) {
      setMessage(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4 px-4">
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center mb-3">
            <Wrench className="text-primary" style={{ width: "48px", height: "48px" }} />
          </div>
          <h1 className="display-6 fw-bold">EduFix</h1>
          <p className="text-muted">Smart School Maintenance System</p>
        </div>

        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="card-title mb-0">Sign In</h5>
            <p className="card-text small text-muted">Access your maintenance dashboard</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
              <div className="mb-3">
                <label htmlFor="userType" className="form-label">User Type</label>
                <select 
                  className="form-select" 
                  id="userType" 
                  value={userType} 
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="faculty">Faculty/Teacher</option>
                  <option value="staff">Maintenance Staff</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                ) : null}
                Sign In
              </button>
            </form>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="small text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary fw-medium text-decoration-none">
              Register here
            </Link>
          </p>
          <p className="small text-muted mt-2">
            <Link to="/admin" className="text-secondary text-decoration-none">
              Administrator Access
            </Link>
          </p>
        </div>

        <div className="mt-4">
          <div className="row g-3">
            <div className="col-6">
              <div className="d-flex flex-column align-items-center p-3 bg-white rounded shadow-sm">
                <Users className="text-primary mb-2" style={{ width: "24px", height: "24px" }} />
                <span className="small fw-medium">Faculty Portal</span>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column align-items-center p-3 bg-white rounded shadow-sm">
                <Wrench className="text-success mb-2" style={{ width: "24px", height: "24px" }} />
                <span className="small fw-medium">Staff Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}