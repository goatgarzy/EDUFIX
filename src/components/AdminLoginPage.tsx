import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, Lock } from "lucide-react";
import AuthService from "../services/auth.service";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Use the specialized adminLogin method instead of regular login
      await AuthService.adminLogin(email, password);
      navigate("/admin/dashboard");
    } catch (error: any) {
      setMessage(error.message || "An error occurred during admin login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark py-4 px-4">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center mb-3">
            <ShieldAlert className="text-warning" style={{ width: "48px", height: "48px" }} />
          </div>
          <h1 className="display-6 fw-bold text-white">Admin</h1>
          <p className="text-light">System Administration Portal</p>
        </div>

        <div className="card border-0 shadow">
          <div className="card-header bg-warning text-dark">
            <div className="d-flex align-items-center">
              <Lock className="me-2" style={{ width: "20px", height: "20px" }} />
              <div>
                <h5 className="card-title mb-0">Administrator Access</h5>
                <p className="card-text small mb-0">Restricted area - Authorized personnel only</p>
              </div>
            </div>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleAdminLogin} className="d-flex flex-column gap-3">
              <div className="mb-3">
                <label htmlFor="adminEmail" className="form-label">Admin Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="adminEmail" 
                  placeholder="Enter administrator email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="mb-4">
                <label htmlFor="adminPassword" className="form-label">Admin Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="adminPassword" 
                  placeholder="Enter administrator password"
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
                className="btn btn-warning text-dark fw-medium"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                ) : (
                  <Lock className="me-2" style={{ width: "16px", height: "16px" }} />
                )}
                Secure Sign In
              </button>
            </form>
          </div>
        </div>

        <div className="mt-3 text-center">
          <Link to="/login" className="text-light text-decoration-none small">
            ← Back to user login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;