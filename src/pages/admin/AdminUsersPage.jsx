import React, { useState } from "react";

const mockUsers = [
  {
    id: "BBNK00123456",
    name: "Sakthi Paramesh",
    email: "sakthi@example.com",
    phone: "+91 98XXXXXX45",
    role: "CUSTOMER",
    kycStatus: "VERIFIED",
    riskTag: "LOW",
    lastLogin: "01 Dec 2025 · 08:45 AM · Chennai",
    status: "ACTIVE",
  },
  {
    id: "BBNK00123457",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98XXXXXX12",
    role: "CUSTOMER",
    kycStatus: "PENDING",
    riskTag: "MEDIUM",
    lastLogin: "30 Nov 2025 · 10:22 PM · Bengaluru",
    status: "ACTIVE",
  },
  {
    id: "BBNK00123458",
    name: "Rahul Verma",
    email: "rahul@example.com",
    phone: "+91 99XXXXXX78",
    role: "CUSTOMER",
    kycStatus: "REJECTED",
    riskTag: "HIGH",
    lastLogin: "29 Nov 2025 · 06:05 PM · Mumbai",
    status: "LOCKED",
  },
  {
    id: "BBNK-ADMIN-01",
    name: "Ops Admin",
    email: "ops.admin@bharathbank.com",
    phone: "+91 90XXXXXX01",
    role: "ADMIN",
    kycStatus: "VERIFIED",
    riskTag: "LOW",
    lastLogin: "01 Dec 2025 · 08:00 AM · Chennai HQ",
    status: "ACTIVE",
  },
];

function AdminUsersPage() {
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL"); // ALL | CUSTOMER | ADMIN
  const [kycFilter, setKycFilter] = useState("ALL"); // ALL | VERIFIED | PENDING | REJECTED
  const [riskFilter, setRiskFilter] = useState("ALL"); // ALL | LOW | MEDIUM | HIGH
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = mockUsers.filter((u) => {
    if (roleFilter !== "ALL" && u.role !== roleFilter) return false;
    if (kycFilter !== "ALL" && u.kycStatus !== kycFilter) return false;
    if (riskFilter !== "ALL" && u.riskTag !== riskFilter) return false;

    if (searchText) {
      const t = (
        u.id +
        " " +
        u.name +
        " " +
        u.email +
        " " +
        u.phone
      ).toLowerCase();
      if (!t.includes(searchText.toLowerCase())) return false;
    }

    return true;
  });

  const riskBadgeClass = (risk) => {
    if (risk === "HIGH") return "bb-badge bb-badge-danger";
    if (risk === "MEDIUM") return "bb-badge bb-badge-primary";
    return "bb-badge bb-badge-success";
  };

  const kycBadgeClass = (status) => {
    if (status === "VERIFIED") return "bb-badge bb-badge-success";
    if (status === "PENDING") return "bb-badge bb-badge-primary";
    if (status === "REJECTED") return "bb-badge bb-badge-danger";
    return "bb-badge";
  };

  const userStatusBadgeClass = (status) => {
    if (status === "ACTIVE") return "bb-badge bb-badge-success";
    if (status === "LOCKED") return "bb-badge bb-badge-danger";
    return "bb-badge";
  };

  const handleLockUnlock = (user) => {
    // later: POST /api/admin/users/{id}/lock or unlock
    const action = user.status === "ACTIVE" ? "lock" : "unlock";
    alert(
      `Demo: Request to ${action} user ${user.id}. In real app this will call backend and write an admin audit log.`
    );
  };

  const handleResetPassword = (user) => {
    // later: POST /api/admin/users/{id}/reset-password
    alert(
      `Demo: Password reset link/OTP will be triggered for ${user.email}. Actual implementation handled by backend.`
    );
  };

  const handleForceLogout = (user) => {
    // later: POST /api/admin/users/{id}/logout-sessions
    alert(
      `Demo: Force logout all sessions for ${user.id}. Backend will invalidate tokens and log this admin action.`
    );
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {/* Top filters + summary */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">User Management</div>
            <div className="bb-card-subtitle">
              Search, filter and manage customer & admin accounts.
            </div>
          </div>
          <span className="bb-badge">
            Total users: {mockUsers.length.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="bb-card-body">
          <div className="grid-4" style={{ gap: 10 }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Search
              </label>
              <input
                className="bb-input"
                placeholder="Name, ID, email or phone"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Role
              </label>
              <select
                className="bb-input"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                KYC Status
              </label>
              <select
                className="bb-input"
                value={kycFilter}
                onChange={(e) => setKycFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="VERIFIED">Verified</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                AI Risk Tag
              </label>
              <select
                className="bb-input"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--bb-text-muted)",
              marginTop: 8,
            }}
          >
            Filters are backed by{" "}
            <code>/api/admin/users?query=...&role=...&kycStatus=...&riskTag=...</code>{" "}
            in the full system. AI risk tags come from the Risk Engine.
          </p>
        </div>
      </div>

      {/* Main area: users table + side panel */}
      <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
        {/* Users table */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">Users</div>
              <div className="bb-card-subtitle">
                Click a row to view details and manage the account.
              </div>
            </div>
          </div>
          <div className="bb-card-body">
            <div style={{ width: "100%", overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.8rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      textAlign: "left",
                      color: "var(--bb-text-muted)",
                      borderBottom: "1px solid rgba(31,41,55,0.9)",
                    }}
                  >
                    <th style={{ padding: "8px 6px" }}>Customer ID</th>
                    <th style={{ padding: "8px 6px" }}>Name</th>
                    <th style={{ padding: "8px 6px" }}>Email</th>
                    <th style={{ padding: "8px 6px" }}>Role</th>
                    <th style={{ padding: "8px 6px" }}>KYC</th>
                    <th style={{ padding: "8px 6px" }}>AI Risk</th>
                    <th style={{ padding: "8px 6px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      onClick={() => setSelectedUser(u)}
                      style={{
                        borderBottom: "1px solid rgba(15,23,42,0.9)",
                        cursor: "pointer",
                      }}
                    >
                      <td style={{ padding: "8px 6px" }}>{u.id}</td>
                      <td style={{ padding: "8px 6px" }}>{u.name}</td>
                      <td style={{ padding: "8px 6px" }}>{u.email}</td>
                      <td style={{ padding: "8px 6px" }}>{u.role}</td>
                      <td style={{ padding: "8px 6px" }}>
                        <span className={kycBadgeClass(u.kycStatus)}>
                          {u.kycStatus}
                        </span>
                      </td>
                      <td style={{ padding: "8px 6px" }}>
                        <span className={riskBadgeClass(u.riskTag)}>
                          {u.riskTag}
                        </span>
                      </td>
                      <td style={{ padding: "8px 6px" }}>
                        <span className={userStatusBadgeClass(u.status)}>
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: "10px 6px",
                          textAlign: "center",
                          color: "var(--bb-text-muted)",
                        }}
                      >
                        No users match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--bb-text-muted)",
                marginTop: 8,
              }}
            >
              In production, table data will support pagination using{" "}
              <code>/api/admin/users?page=...&size=...</code>.
            </p>
          </div>
        </div>

        {/* Side panel: selected user details */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">User Details</div>
              <div className="bb-card-subtitle">
                Account summary, risk and quick actions.
              </div>
            </div>
          </div>

          <div className="bb-card-body">
            {!selectedUser && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                }}
              >
                Select a user from the list to view details and manage their
                account.
              </p>
            )}

            {selectedUser && (
              <div style={{ display: "grid", gap: 10, fontSize: "0.85rem" }}>
                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    Name & Customer ID
                  </div>
                  <div>{selectedUser.name}</div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--bb-text-muted)",
                    }}
                  >
                    {selectedUser.id}
                  </div>
                </div>

                <div className="grid-2">
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      Email
                    </div>
                    <div>{selectedUser.email}</div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      Phone
                    </div>
                    <div>{selectedUser.phone}</div>
                  </div>
                </div>

                <div className="grid-3">
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      Role
                    </div>
                    <span className="bb-badge">{selectedUser.role}</span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      KYC
                    </div>
                    <span className={kycBadgeClass(selectedUser.kycStatus)}>
                      {selectedUser.kycStatus}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      AI Risk
                    </div>
                    <span className={riskBadgeClass(selectedUser.riskTag)}>
                      {selectedUser.riskTag}
                    </span>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    Last Login
                  </div>
                  <div>{selectedUser.lastLogin}</div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    Account Status
                  </div>
                  <span className={userStatusBadgeClass(selectedUser.status)}>
                    {selectedUser.status}
                  </span>
                </div>

                {/* AI-style note (demo) */}
                <div
                  style={{
                    padding: "8px 10px",
                    borderRadius: 10,
                    background:
                      "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(15,23,42,0.95))",
                    border: "1px solid rgba(37,99,235,0.7)",
                    fontSize: "0.8rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#bfdbfe",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    AI User Risk Insight (Demo)
                  </div>
                  <div>
                    AI engine summarises recent activity (login locations,
                    device changes, high-value transfers) to suggest{" "}
                    <span style={{ color: "#bbf7d0" }}>
                      {selectedUser.riskTag} risk
                    </span>{" "}
                    for this user. Detailed reasoning is shown in the Fraud
                    Console when investigating cases.
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <button
                    type="button"
                    className="bb-button"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => handleLockUnlock(selectedUser)}
                  >
                    {selectedUser.status === "ACTIVE"
                      ? "Lock User Account"
                      : "Unlock User Account"}
                  </button>

                  <button
                    type="button"
                    className="bb-button bb-button-secondary"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => handleResetPassword(selectedUser)}
                  >
                    Reset Password / Send Reset Link
                  </button>

                  <button
                    type="button"
                    className="bb-button bb-button-secondary"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => handleForceLogout(selectedUser)}
                  >
                    Force Logout All Sessions
                  </button>

                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bb-text-muted)",
                    }}
                  >
                    In production, every action writes an entry to{" "}
                    <code>admin_actions</code> and{" "}
                    <code>audit_log</code> with timestamp, admin ID and
                    reason.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersPage;
