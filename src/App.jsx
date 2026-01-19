// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";

import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import OtpPage from "./pages/auth/OtpPage";
import RegisterPage from "./pages/auth/RegisterPage";

import DashboardPage from "./pages/dashboard/DashboardPage";
import AccountsPage from "./pages/accounts/AccountsPage";
import AccountDetailsPage from "./pages/accounts/AccountDetailsPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import TransferPage from "./pages/transactions/TransferPage";
import BeneficiariesPage from "./pages/beneficiaries/BeneficiariesPage";
import BillsPage from "./pages/bills/BillsPage";
import CardsPage from "./pages/cards/CardsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SecuritySettingsPage from "./pages/profile/SecuritySettingsPage";
import KycPage from "./pages/profile/KycPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminFraudPage from "./pages/admin/AdminFraudPage";
import AdminKycPage from "./pages/admin/AdminKycPage";
import AdminAuditPage from "./pages/admin/AdminAuditPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

import RequireAuth from "./pages/auth/RequireAuth";

function App() {
  return (
    <div className="app-root">
      <Routes>
        {/* Public */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Customer portal (protected) */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="accounts/:id" element={<AccountDetailsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="transfer" element={<TransferPage />} />
          <Route path="beneficiaries" element={<BeneficiariesPage />} />
          <Route path="bills" element={<BillsPage />} />
          <Route path="cards" element={<CardsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings/security" element={<SecuritySettingsPage />} />
          <Route path="settings/kyc" element={<KycPage />} />
        </Route>

        {/* Admin portal (also protected; later we’ll enforce ROLE_ADMIN) */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="fraud" element={<AdminFraudPage />} />
          <Route path="kyc" element={<AdminKycPage />} />
          <Route path="audit" element={<AdminAuditPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </div>
  );
}

export default App;
