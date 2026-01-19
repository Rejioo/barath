import React, { useState } from "react";

const mockAuditLogs = [
  {
    id: "AUD-2025-0001",
    timestamp: "01 Dec 2025 · 09:15:21 AM",
    actorType: "ADMIN",
    actorId: "ADMIN-OPS-01",
    actorName: "Ops Admin",
    userId: "BBNK00123456",
    action: "USER_LOCKED",
    ipHash: "ip_a91f3c",
    metadata:
      '{ "reason": "Fraud console block from high-risk case TXN-2025-0003" }',
  },
  {
    id: "AUD-2025-0002",
    timestamp: "01 Dec 2025 · 09:05:10 AM",
    actorType: "SYSTEM",
    actorId: "AI-RISK-ENGINE",
    actorName: "AI Engine",
    userId: "BBNK00123458",
    action: "FRAUD_ALERT_CREATED",
    ipHash: "ip_89bc10",
    metadata:
      '{ "fraudScore": 0.93, "channel": "RTGS", "amount": 350000, "txnId": "TXN-2025-0003" }',
  },
  {
    id: "AUD-2025-0003",
    timestamp: "01 Dec 2025 · 08:55:02 AM",
    actorType: "CUSTOMER",
    actorId: "BBNK00123456",
    actorName: "Sakthi Paramesh",
    userId: "BBNK00123456",
    action: "LOGIN_SUCCESS",
    ipHash: "ip_45af89",
    metadata:
      '{ "device": "Chrome · Windows", "location": "Chennai, IN", "loginRisk": 0.18 }',
  },
  {
    id: "AUD-2025-0004",
    timestamp: "30 Nov 2025 · 11:20:44 PM",
    actorType: "ADMIN",
    actorId: "ADMIN-KYC-02",
    actorName: "KYC Officer",
    userId: "BBNK00123457",
    action: "KYC_APPROVED",
    ipHash: "ip_55ab10",
    metadata: '{ "kycCaseId": "KYC-2025-0002", "comment": "Address clarified" }',
  },
];

function AdminAuditPage() {
  const [searchText, setSearchText] = useState("");
  const [actorTypeFilter, setActorTypeFilter] = useState("ALL"); // ALL | ADMIN | CUSTOMER | SYSTEM
  const [actionFilter, setActionFilter] = useState("ALL"); // ALL, LOGIN_SUCCESS, USER_LOCKED, etc.
  const [selectedLog, setSelectedLog] = useState(mockAuditLogs[0] || null);

  const filteredLogs = mockAuditLogs.filter((log) => {
    if (actorTypeFilter !== "ALL" && log.actorType !== actorTypeFilter) {
      return false;
    }
    if (actionFilter !== "ALL" && log.action !== actionFilter) {
      return false;
    }

    if (searchText) {
      const t = (
        log.id +
        " " +
        log.actorId +
        " " +
        log.actorName +
        " " +
        log.userId +
        " " +
        log.action
      ).toLowerCase();
      if (!t.includes(searchText.toLowerCase())) return false;
    }

    return true;
  });

  const actorTypeBadgeClass = (type) => {
    if (type === "ADMIN") return "bb-badge bb-badge-primary";
    if (type === "CUSTOMER") return "bb-badge bb-badge-success";
    if (type === "SYSTEM") return "bb-badge bb-badge-warning";
    return "bb-badge";
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {/* Filters header */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Audit Logs</div>
            <div className="bb-card-subtitle">
              Immutable record of sensitive actions by users, admins and
              system services.
            </div>
          </div>
          <span className="bb-badge">
            Records shown: {filteredLogs.length}/{mockAuditLogs.length}
          </span>
        </div>

        <div className="bb-card-body">
          <div className="grid-4" style={{ gap: 10 }}>
            {/* Search */}
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
                placeholder="Audit ID, actor, user, action..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Actor type */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Actor Type
              </label>
              <select
                className="bb-input"
                value={actorTypeFilter}
                onChange={(e) => setActorTypeFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="ADMIN">Admin</option>
                <option value="CUSTOMER">Customer</option>
                <option value="SYSTEM">System / AI</option>
              </select>
            </div>

            {/* Action filter */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Action
              </label>
              <select
                className="bb-input"
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="LOGIN_SUCCESS">Login Success</option>
                <option value="USER_LOCKED">User Locked</option>
                <option value="FRAUD_ALERT_CREATED">Fraud Alert Created</option>
                <option value="KYC_APPROVED">KYC Approved</option>
                {/* more actions later */}
              </select>
            </div>

            {/* Placeholder date filter */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Date Range (coming soon)
              </label>
              <input
                className="bb-input"
                placeholder="Today, last 7 days..."
                disabled
                style={{ opacity: 0.7 }}
              />
            </div>
          </div>

          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--bb-text-muted)",
              marginTop: 8,
            }}
          >
            In production, this is backed by{" "}
            <code>
              /api/admin/audit?actorType=...&action=...&from=...&to=...&q=...
            </code>{" "}
            and stored in <code>audit_log</code> table with append-only
            semantics.
          </p>
        </div>
      </div>

      {/* Main content: table + details */}
      <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
        {/* Audit table */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">Log Entries</div>
              <div className="bb-card-subtitle">
                Click an entry to inspect full metadata.
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
                    <th style={{ padding: "8px 6px" }}>Audit ID</th>
                    <th style={{ padding: "8px 6px" }}>Timestamp</th>
                    <th style={{ padding: "8px 6px" }}>Actor</th>
                    <th style={{ padding: "8px 6px" }}>User</th>
                    <th style={{ padding: "8px 6px" }}>Action</th>
                    <th style={{ padding: "8px 6px" }}>IP Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
                      style={{
                        borderBottom: "1px solid rgba(15,23,42,0.9)",
                        cursor: "pointer",
                      }}
                    >
                      <td style={{ padding: "8px 6px" }}>{log.id}</td>
                      <td style={{ padding: "8px 6px" }}>{log.timestamp}</td>
                      <td style={{ padding: "8px 6px" }}>
                        {log.actorName}
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--bb-text-muted)",
                          }}
                        >
                          {log.actorId}{" "}
                          <span className={actorTypeBadgeClass(log.actorType)}>
                            {log.actorType}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "8px 6px" }}>{log.userId}</td>
                      <td style={{ padding: "8px 6px" }}>{log.action}</td>
                      <td style={{ padding: "8px 6px" }}>{log.ipHash}</td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          padding: "10px 6px",
                          textAlign: "center",
                          color: "var(--bb-text-muted)",
                        }}
                      >
                        No audit logs match the current filters.
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
              Logs can be exported as CSV/JSON for compliance, and older data
              can be archived to cold storage.
            </p>
          </div>
        </div>

        {/* Detail panel */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">Entry Details</div>
              <div className="bb-card-subtitle">
                Raw metadata as stored in <code>audit_log</code>.
              </div>
            </div>
          </div>

          <div className="bb-card-body">
            {!selectedLog && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                }}
              >
                Select a log entry to view all fields.
              </p>
            )}

            {selectedLog && (
              <div style={{ display: "grid", gap: 10, fontSize: "0.85rem" }}>
                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    Audit ID
                  </div>
                  <div>{selectedLog.id}</div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    Timestamp
                  </div>
                  <div>{selectedLog.timestamp}</div>
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
                      Actor
                    </div>
                    <div>{selectedLog.actorName}</div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      {selectedLog.actorId}{" "}
                      <span
                        className={actorTypeBadgeClass(selectedLog.actorType)}
                        style={{ marginLeft: 4 }}
                      >
                        {selectedLog.actorType}
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
                      Affected User
                    </div>
                    <div>{selectedLog.userId || "—"}</div>
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
                    Action
                  </div>
                  <div>{selectedLog.action}</div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    IP Hash
                  </div>
                  <div>{selectedLog.ipHash}</div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bb-text-muted)",
                      marginTop: 2,
                    }}
                  >
                    Raw IP is never stored, only a salted hash for privacy.
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
                    Metadata (JSON)
                  </div>
                  <pre
                    style={{
                      background: "rgba(15,23,42,0.95)",
                      border: "1px solid rgba(31,41,55,0.9)",
                      borderRadius: 10,
                      padding: 8,
                      fontSize: "0.75rem",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {selectedLog.metadata}
                  </pre>
                </div>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  In the backend, this is created by <code>AuditService</code>{" "}
                  whenever sensitive actions occur (login, OTP verification,
                  transfers, admin operations, KYC decisions, etc.).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAuditPage;
