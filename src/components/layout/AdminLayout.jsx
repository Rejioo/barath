import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Topbar from "./Topbar";

const adminNavItems = [
  { path: "/admin", label: "Overview", icon: "📊" },
  { path: "/admin/users", label: "Users", icon: "🧑‍💼" },
  { path: "/admin/fraud", label: "Fraud Console", icon: "🛡️" },
  { path: "/admin/kyc", label: "KYC Review", icon: "📁" },
  { path: "/admin/audit", label: "Audit Logs", icon: "📜" },
  { path: "/admin/settings", label: "Settings", icon: "⚙️" },
];

function AdminLayout() {
  return (
    <div className="app-shell">
      {/* Admin sidebar reusing same styling */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo" />
          <div className="sidebar-title-wrapper">
            <div className="sidebar-title">barath</div>
            <div className="sidebar-subtitle">Admin Operations</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                "sidebar-link" + (isActive ? " sidebar-link-active" : "")
              }
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">AD</div>
            <div>
              <div className="sidebar-user-name">Admin</div>
              <div style={{ fontSize: "0.7rem", color: "var(--bb-text-muted)" }}>
                Operations Console
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main admin content */}
      <div className="app-main">
        <Topbar
          title="Admin Console"
          subtitle="Monitor risk, users, KYC and transactions"
        />

        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
