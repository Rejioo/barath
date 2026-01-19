import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/app/dashboard", label: "Dashboard", icon: "🏠" },
  { path: "/app/accounts", label: "My Accounts", icon: "💰" },
  { path: "/app/cards", label: "Cards", icon: "💳" },
  { path: "/app/transactions", label: "Transactions", icon: "📄" },
  { path: "/app/transfer", label: "Transfers & UPI", icon: "📤" },
  { path: "/app/bills", label: "Bills & Recharges", icon: "🧾" },
  { path: "/app/beneficiaries", label: "Beneficiaries", icon: "👥" },
  { path: "/app/deposits", label: "Deposits", icon: "📦" },
  { path: "/app/offers", label: "Offers & Rewards", icon: "🎁" },
  { path: "/app/notifications", label: "Notifications", icon: "🔔" },
  { path: "/app/support", label: "Support", icon: "💬" },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/app/dashboard");
  };

  return (
    <aside className="sidebar">
      {/* Brand / Logo */}
      <div
        className="sidebar-header"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <div className="sidebar-logo" />
        <div className="sidebar-title-wrapper">
          <div className="sidebar-title">barath</div>
          <div className="sidebar-subtitle">AI-Powered Banking</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
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

        {/* Settings group */}
        <div
          style={{
            marginTop: 10,
            paddingTop: 8,
            borderTop: "1px solid rgba(15,23,42,0.9)",
          }}
        >
          <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            <span className="sidebar-link-icon">🧑</span>
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/app/settings/security"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            <span className="sidebar-link-icon">🔐</span>
            <span>Security</span>
          </NavLink>

          <NavLink
            to="/app/settings/kyc"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            <span className="sidebar-link-icon">📁</span>
            <span>KYC</span>
          </NavLink>
        </div>
      </nav>

      {/* Footer mini user */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">SP</div>
          <div>
            <div className="sidebar-user-name">Sakthi</div>
            <div
              style={{ fontSize: "0.7rem", color: "var(--bb-text-muted)" }}
            >
              Retail Customer
            </div>
          </div>
        </div>

        <button
          className="icon-button"
          title="Switch to admin"
          type="button"
          onClick={() => navigate("/admin")}
        >
          ⚙
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
