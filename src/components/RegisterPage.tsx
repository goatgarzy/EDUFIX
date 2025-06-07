import { useState } from "react";
import { ArrowLeft, Wrench, User, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    department: "",
    employeeId: "",
    specialization: "",
    experience: "",
    certifications: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!userType) newErrors.userType = "Please select a user type"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"

    // Role-specific validations
    if (userType === "faculty") {
      if (!formData.department.trim()) newErrors.department = "Department is required"
      if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required"
    }

    if (userType === "staff") {
      if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required"
      if (!formData.experience.trim()) newErrors.experience = "Experience is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // In a real app, this would send data to your Spring Boot API
    const registrationData = {
      ...formData,
      userType,
      registrationDate: new Date().toISOString(),
    }

    console.log("Registration data:", registrationData)
    alert("Registration submitted successfully! Please wait for admin approval.")

    // Redirect to login page
    window.location.href = "/"
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex align-items-center mb-4">
            <Link to="/" className="btn btn-outline-secondary btn-sm">
              <ArrowLeft className="me-2" style={{ width: "16px", height: "16px" }} />
              Back to Login
            </Link>
          </div>

          <div className="text-center mb-4">
            <div className="d-flex justify-content-center mb-3">
              <Wrench className="text-primary" style={{ width: "48px", height: "48px" }} />
            </div>
            <h1 className="h3 fw-bold">Join EduFix</h1>
            <p className="text-muted">Register for the Smart School Maintenance System</p>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Create Your Account</h5>
              <p className="card-text small text-muted">
                Register as faculty/teacher or maintenance staff. Administrator accounts are created by system admins.
              </p>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                {/* User Type Selection */}
                <div className="mb-3">
                  <label htmlFor="userType" className="form-label">I am registering as *</label>
                  <select 
                    className="form-select" 
                    id="userType" 
                    value={userType} 
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">Select your role</option>
                    <option value="faculty">Faculty/Teacher</option>
                    <option value="staff">Maintenance Staff</option>
                  </select>
                  {errors.userType && <div className="text-danger small">{errors.userType}</div>}
                </div>

                {userType && (
                  <>
                    {/* Basic Information */}
                    <div className="mb-3">
                      <h3 className="h5 mb-3 d-flex align-items-center">
                        <User className="me-2" style={{ width: "20px", height: "20px" }} />
                        Personal Information
                      </h3>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="firstName" className="form-label">First Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder="Enter your first name"
                          />
                          {errors.firstName && <div className="text-danger small">{errors.firstName}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="lastName" className="form-label">Last Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            placeholder="Enter your last name"
                          />
                          {errors.lastName && <div className="text-danger small">{errors.lastName}</div>}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email address"
                        />
                        {errors.email && <div className="text-danger small">{errors.email}</div>}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number *</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && <div className="text-danger small">{errors.phone}</div>}
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="password" className="form-label">Password *</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            placeholder="Create a password"
                          />
                          {errors.password && <div className="text-danger small">{errors.password}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            placeholder="Confirm your password"
                          />
                          {errors.confirmPassword && <div className="text-danger small">{errors.confirmPassword}</div>}
                        </div>
                      </div>
                    </div>

                    {/* Role-specific fields */}
                    {userType === "faculty" && (
                      <div className="mb-3">
                        <h3 className="h5 mb-3 d-flex align-items-center">
                          <UserCheck className="me-2" style={{ width: "20px", height: "20px" }} />
                          Faculty Information
                        </h3>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="department" className="form-label">Department *</label>
                            <select
                              className="form-select"
                              id="department"
                              value={formData.department}
                              onChange={(e) => handleInputChange("department", e.target.value)}
                            >
                              <option value="">Select your department</option>
                              <option value="mathematics">Mathematics</option>
                              <option value="science">Science</option>
                              <option value="english">English</option>
                              <option value="history">History</option>
                              <option value="arts">Arts</option>
                              <option value="physical-education">Physical Education</option>
                              <option value="computer-science">Computer Science</option>
                              <option value="other">Other</option>
                            </select>
                            {errors.department && <div className="text-danger small">{errors.department}</div>}
                          </div>

                          <div className="col-md-6 mb-3">
                            <label htmlFor="employeeId" className="form-label">Employee ID *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="employeeId"
                              value={formData.employeeId}
                              onChange={(e) => handleInputChange("employeeId", e.target.value)}
                              placeholder="Enter your employee ID"
                            />
                            {errors.employeeId && <div className="text-danger small">{errors.employeeId}</div>}
                          </div>
                        </div>
                      </div>
                    )}

                    {userType === "staff" && (
                      <div className="mb-3">
                        <h3 className="h5 mb-3 d-flex align-items-center">
                          <Wrench className="me-2" style={{ width: "20px", height: "20px" }} />
                          Maintenance Staff Information
                        </h3>

                        <div className="mb-3">
                          <label htmlFor="specialization" className="form-label">Specialization *</label>
                          <select
                            className="form-select"
                            id="specialization"
                            value={formData.specialization}
                            onChange={(e) => handleInputChange("specialization", e.target.value)}
                          >
                            <option value="">Select your specialization</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="electrical">Electrical</option>
                            <option value="hvac">HVAC</option>
                            <option value="carpentry">Carpentry</option>
                            <option value="painting">Painting</option>
                            <option value="cleaning">Cleaning & Janitorial</option>
                            <option value="landscaping">Landscaping</option>
                            <option value="general">General Maintenance</option>
                          </select>
                          {errors.specialization && <div className="text-danger small">{errors.specialization}</div>}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="experience" className="form-label">Years of Experience *</label>
                          <select
                            className="form-select"
                            id="experience"
                            value={formData.experience}
                            onChange={(e) => handleInputChange("experience", e.target.value)}
                          >
                            <option value="">Select your experience level</option>
                            <option value="0-1">0-1 years</option>
                            <option value="2-5">2-5 years</option>
                            <option value="6-10">6-10 years</option>
                            <option value="11-15">11-15 years</option>
                            <option value="15+">15+ years</option>
                          </select>
                          {errors.experience && <div className="text-danger small">{errors.experience}</div>}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="certifications" className="form-label">Certifications (Optional)</label>
                          <textarea
                            className="form-control"
                            id="certifications"
                            value={formData.certifications}
                            onChange={(e) => handleInputChange("certifications", e.target.value)}
                            placeholder="List any relevant certifications, licenses, or training..."
                            rows={3}
                          ></textarea>
                        </div>
                      </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="agreeToTerms">
                          I agree to the terms and conditions *
                        </label>
                        <div className="form-text">
                          By registering, you agree to our terms of service and privacy policy. Your account will be
                          reviewed and approved by an administrator.
                        </div>
                      </div>
                      {errors.agreeToTerms && <div className="text-danger small">{errors.agreeToTerms}</div>}
                    </div>

                    <div className="alert alert-info">
                      <h4 className="alert-heading h6">Account Approval Process</h4>
                      <p className="mb-0 small">
                        Your registration will be reviewed by an administrator. You will receive an email notification
                        once your account is approved and activated. This process typically takes 1-2 business days.
                      </p>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <Link to="/" className="btn btn-outline-secondary">
                        Cancel
                      </Link>
                      <button type="submit" className="btn btn-primary">Register Account</button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}