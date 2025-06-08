import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save settings logic here
    alert("Settings saved!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={settings.notifications}
            onChange={handleToggle}
            className="h-5 w-5 rounded border-gray-600 bg-gray-900 focus:ring-blue-500"
          />
          <label htmlFor="notifications" className="font-semibold">
            Enable Notifications
          </label>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="darkMode"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleToggle}
            className="h-5 w-5 rounded border-gray-600 bg-gray-900 focus:ring-blue-500"
          />
          <label htmlFor="darkMode" className="font-semibold">
            Dark Mode
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;