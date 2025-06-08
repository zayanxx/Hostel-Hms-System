/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // adjust path as needed
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserAlt,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaDoorOpen,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { register, error: authError, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "resident",
    contactNumber: "",
    room: "",
    designation: "",
    department: "",
  });

  const [submitError, setSubmitError] = useState("");

  // Show auth error from context as toast
  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Simple client validation example:
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.email.trim()) return toast.error("Email is required");
    if (!form.password.trim()) return toast.error("Password is required");

    try {
      await register(form);
      toast.success("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setSubmitError(err.message || "Registration failed");
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-wide">
            Create your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <InputField
              icon={<FaUserAlt />}
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              autoComplete="name"
            />
            <InputField
              icon={<FaEnvelope />}
              name="email"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              autoComplete="email"
            />
            <InputField
              icon={<FaLock />}
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
            />

            <SelectField
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={loading}
              options={[
                { value: "resident", label: "Resident" },
                { value: "admin", label: "Admin" },
              ]}
            />

            {form.role === "resident" && (
              <>
                <InputField
                  icon={<FaPhone />}
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={form.contactNumber}
                  onChange={handleChange}
                  disabled={loading}
                />
                <InputField
                  icon={<FaDoorOpen />}
                  name="room"
                  placeholder="Room Number"
                  value={form.room}
                  onChange={handleChange}
                  disabled={loading}
                />
              </>
            )}

            {form.role === "admin" && (
              <>
                <InputField
                  icon={<FaBriefcase />}
                  name="designation"
                  placeholder="Designation"
                  value={form.designation}
                  onChange={handleChange}
                  disabled={loading}
                />
                <InputField
                  icon={<FaBuilding />}
                  name="department"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                  disabled={loading}
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : null}
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-gray-400 mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

const InputField = ({ icon, disabled, ...props }) => (
  <div
    className={`flex items-center border border-gray-600 rounded px-3 py-2 bg-gray-700 ${
      disabled ? "opacity-60 cursor-not-allowed" : ""
    }`}
  >
    <div className="text-gray-400 mr-2">{icon}</div>
    <input
      className="bg-transparent text-white w-full focus:outline-none"
      {...props}
      disabled={disabled}
      required
    />
  </div>
);

const SelectField = ({ name, value, onChange, options, disabled }) => (
  <div
    className={`flex items-center border border-gray-600 rounded px-3 py-2 bg-gray-700 ${
      disabled ? "opacity-60 cursor-not-allowed" : ""
    }`}
  >
    <div className="text-gray-400 mr-2">👤</div>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="bg-transparent text-white w-full focus:outline-none"
      disabled={disabled}
      required
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-black">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Register;
