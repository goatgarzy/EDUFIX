import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Sidebar } from "./components/layout/sidebar";
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import AdminLoginPage from './components/AdminLoginPage';
import FacultyDashboard from './components/FacultyDashboard';
import NewRequest from './components/NewRequest';
import StaffDashboard from './components/StaffDashboard';
import AdminDashboard from './components/AdminDashboard';
import PendingRegistrations from './components/PendingRegistrations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} /> {/* Default to login */}
        
        {/* Faculty Routes */}
        <Route path="/dashboard" element={
          <div className="d-flex">
            <Sidebar userRole="faculty" />
            <div className="flex-grow-1 p-4">
              <FacultyDashboard />
            </div>
          </div>
        } />
        <Route path="/faculty/dashboard" element={
          <div className="d-flex">
            <Sidebar userRole="faculty" />
            <div className="flex-grow-1">
              <FacultyDashboard />
            </div>
          </div>
        } />
        <Route path="/faculty/new-request" element={<NewRequest />} />
        
        {/* Staff Routes */}
        <Route path="/staff/dashboard" element={
          <div className="d-flex">
            <Sidebar userRole="staff" />
            <div className="flex-grow-1">
              <StaffDashboard />
            </div>
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <div className="d-flex">
            <Sidebar userRole="admin" />
            <div className="flex-grow-1">
              <AdminDashboard />
            </div>
          </div>
        } />
        <Route path="/admin/pending-registrations" element={<PendingRegistrations />} />
      </Routes>
    </Router>
  );
}

export default App;

