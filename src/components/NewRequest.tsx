import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Wrench } from "lucide-react";

export default function NewRequest() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    building: "",
    room: "",
    category: "",
    priority: "",
    images: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to your Spring Boot API
    console.log("Submitting request:", formData);
    alert("Request submitted successfully!");
    // Redirect back to dashboard
    window.location.href = "/faculty/dashboard";
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-white shadow-sm border-bottom">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Wrench className="text-primary me-3" style={{ width: "32px", height: "32px" }} />
              <div>
                <h1 className="h4 fw-bold mb-0">EduFix</h1>
                <p className="small text-muted mb-0">New Maintenance Request</p>
              </div>
            </div>
            <Link to="/faculty/dashboard" className="btn btn-outline-secondary btn-sm">
              <ArrowLeft className="me-2" style={{ width: "16px", height: "16px" }} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Submit New Maintenance Request</h5>
                <p className="card-text small text-muted">
                  Provide detailed information about the maintenance issue you're reporting
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="title" className="form-label">Issue Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Brief description of the issue"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="category" className="form-label">Category *</label>
                      <select
                        className="form-select"
                        id="category"
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        required
                      >
                        <option value="">Select issue category</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="electrical">Electrical</option>
                        <option value="hvac">HVAC</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="furniture">Furniture</option>
                        <option value="security">Security</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-4">
                      <label htmlFor="building" className="form-label">Building *</label>
                      <select
                        className="form-select"
                        id="building"
                        value={formData.building}
                        onChange={(e) => handleInputChange("building", e.target.value)}
                        required
                      >
                        <option value="">Select building</option>
                        <option value="main">Main Building</option>
                        <option value="science">Science Block</option>
                        <option value="library">Library</option>
                        <option value="dormA">Dorm A</option>
                        <option value="dormB">Dorm B</option>
                        <option value="cafeteria">Cafeteria</option>
                        <option value="gym">Gymnasium</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="room" className="form-label">Room/Location *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="room"
                        placeholder="Room number or specific location"
                        value={formData.room}
                        onChange={(e) => handleInputChange("room", e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="priority" className="form-label">Priority *</label>
                      <select
                        className="form-select"
                        id="priority"
                        value={formData.priority}
                        onChange={(e) => handleInputChange("priority", e.target.value)}
                        required
                      >
                        <option value="">Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="form-label">Detailed Description *</label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows={4}
                      placeholder="Provide a detailed description of the issue, including when it started, how it affects daily activities, and any other relevant information..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="images" className="form-label">Upload Images (Optional)</label>
                    <div className="border border-2 border-dashed rounded p-4 text-center">
                      <Upload className="text-secondary mx-auto mb-3" style={{ width: "48px", height: "48px" }} />
                      <p className="small text-muted mb-2">Click to upload images or drag and drop</p>
                      <p className="text-muted small">PNG, JPG, GIF up to 10MB each</p>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="d-none" 
                        id="file-upload" 
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary mt-2"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Choose Files
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <Link to="/faculty/dashboard" className="btn btn-outline-secondary">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">Submit Request</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}