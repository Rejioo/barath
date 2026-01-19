import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const routeMeta = {
  "/": {
    title: "Dashboard",
    subtitle: "Overview of your barath accounts & insights",
  },
  "/dashboard": {
    title: "Dashboard",
    subtitle: "AI-powered overview of your finances",
  },
  "/accounts": {
    title: "My Accounts",
    subtitle: "View and manage all your barath accounts",
  },
  "/transactions": {
    title: "Transactions",
    subtitle: "Search and review your recent activity",
  },
  "/transfer": {
    title: "Transfers & UPI",
    subtitle: "Move money securely across accounts and payees",
  },
  "/bills": {
    title: "Bills & Recharges",
    subtitle: "Pay your utility bills and recharges in one place",
  },
  "/beneficiaries": {
    title: "Beneficiaries",
    subtitle: "Manage your trusted payees and recipients",
  },
  "/cards": {
    title: "Cards",
    subtitle: "Manage your debit and credit cards",
  },
  "/deposits": {
    title: "Deposits & Investments",
    subtitle: "Track your fixed and recurring deposits",
  },
  "/offers": {
    title: "Offers & Rewards",
    subtitle: "Discover offers, rewards, and personalized deals",
  },
  "/notifications": {
    title: "Notifications",
    subtitle: "Security alerts, messages, and updates",
  },
  "/support": {
    title: "Support",
    subtitle: "Raise tickets and talk to our support team",
  },
  "/profile": {
    title: "Profile",
    subtitle: "View and update your personal details",
  },
  "/settings/security": {
    title: "Security Settings",
    subtitle: "Control login, devices, and multi-factor options",
  },
  "/settings/kyc": {
    title: "KYC & Verification",
    subtitle: "Manage your KYC status and documents",
  },
};

function MainLayout() {
  const location = useLocation();
  const path = location.pathname;
  const meta = routeMeta[path] || {
    title: "barath",
    subtitle: "Secure banking made simple",
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Topbar title={meta.title} subtitle={meta.subtitle} />

        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
