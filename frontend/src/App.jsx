import React from "react";
import { Routes, Route } from "react-router-dom";

import { HeroSection } from "./components/common/HeroSection";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import { About } from "./pages/auth/About";
import Contact from "./pages/auth/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ResidentDashboard from "./pages/resident/ResidentDashboard";
import ResidentLayout from "./layouts/ResidentLayout";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageRooms from "./pages/admin/ManageRooms";
import ManageSuggestions from "./pages/admin/ManageSuggestions";
import ManageInvoices from "./pages/admin/ManageInvoices";
import ManageMaintenance from "./pages/admin/ManageMaintenance";
import ManageBilling from "./pages/admin/ManageBilling";
import ManagePayments from "./pages/admin/ManagePayments";
import SubmitSuggestion from "./pages/resident/SubmitSuggestion";
import ViewInvoices from "./pages/resident/ViewInvoices";
import Profile from "./pages/shared/Profile";
import Settings from "./pages/shared/Settings";
import ViewMaintenance from "./pages/resident/ViewMaintenance";
import MyRoom from "./pages/resident/MyRoom";
import MyPayment from "./pages/resident/MyPayment";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin Routes with nested routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element ={ <ManageUsers/> } />
          <Route path="rooms" element={<ManageRooms/>} />
          <Route path="suggestions" element={<ManageSuggestions />} />
          <Route path="invoices" element={<ManageInvoices />} />
          <Route path="maintenance" element={<ManageMaintenance />} />
          <Route path="billing" element={<ManageBilling />} />
          <Route path="payments" element={<ManagePayments />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/settings" element={<Settings />} />

          {/* Add other admin pages here */}
        </Route>
        {/* Resident Routes with nested routes */}
        <Route path="/resident" element={<ResidentLayout />}>
          <Route index element={<ResidentDashboard />} />
          <Route path="maintenance" element={ <ViewMaintenance/> } />
          <Route path="my-room" element={ <MyRoom/> } />
          <Route path="payments" element={ <MyPayment/> } />
          <Route path="submit-suggestion" element={ <SubmitSuggestion/> } />
          <Route path="view-invoices" element={ <ViewInvoices/> } />
          <Route path="/resident/profile" element={<Profile />} />
          <Route path="/resident/settings" element={<Settings />} />
          {/* Add other resident pages here */}
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
