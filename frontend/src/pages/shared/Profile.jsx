import React, { useState } from "react";

const Profile = () => {
  // Example state for profile form
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated profile logic here
    alert("Profile updated!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block mb-1 font-semibold">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 text-white focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 text-white focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="+1 (555) 555-5555"
            className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;