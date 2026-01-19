import React, { useState } from "react";

const mockKycCases = [
  {
    id: "KYC-2025-0001",
    customerId: "BBNK00123456",
    name: "Sakthi Paramesh",
    pan: "ABCDE1234F",
    aadhaarMasked: "XXXX-XXXX-1234",
    submittedAt: "15 Nov 2025 · 10:12 AM",
    status: "PENDING", // PENDING | APPROVED | REJECTED
    riskTag: "LOW",
    aiMatchScore: 0.96,
    aiSummary:
      "PAN name matches profile name with high confidence. Address in Aadhaar partially matches declared address. Income range consistent with bank records.",
    aiFlags: ["Minor address variation"],
    docs: [
      { id: "doc-1", type: "PAN Card", status: "AI_MATCH", url: "#" },
      { id: "doc-2", type: "Aadhaar Card", status: "AI_PARTIAL_MATCH", url: "#" },
      { id: "doc-3", type: "Address Proof", status: "AI_MATCH", url: "#" },
    ],
  },
  {
    id: "KYC-2025-0002",
    customerId: "BBNK00123457",
    name: "Priya Sharma",
    pan: "PQRSX6789Y",
    aadhaarMasked: "XXXX-XXXX-9988",
    submittedAt: "16 Nov 2025 · 02:45 PM",
    status: "PENDING",
    riskTag: "MEDIUM",
    aiMatchScore: 0.78,
    aiSummary:
      "Name mismatch between PAN and profile. Aadhaar address substantially different from declared address. Multiple profile edits in last 30 days.",
    aiFlags: ["Name mismatch", "Address mismatch", "Frequent profile edits"],
    docs: [
      { id: "doc-4", type: "PAN Card", status: "AI_MISMATCH", url: "#" },
      { id: "doc-5", type: "Aadhaar Card", status: "AI_MISMATCH", url: "#" },
      { id: "doc-6", type: "Address Proof", status: "AI_MATCH", url: "#" },
    ],
  },
  {
    id: "KYC-2025-0003",
    customerId: "BBNK00123458",
    name: "Rahul Verma",
    pan: "LMNOP5432Z",
    aadhaarMasked: "XXXX-XXXX-4455",
    submittedAt: "17 Nov 2025 · 04:20 PM",
    status: "UNDER_REVIEW",
    riskTag: "HIGH",
    aiMatchScore: 0.61,
    aiSummary:
      "Significant mismatch between PAN, Aadhaar and profile details. Recent high-value transactions and device changes detected.",
    aiFlags: [
      "Multiple data mismatches",
      "High-value activity",
      "Device/location changes",
    ],
    docs: [
      { id: "doc-7", type: "PAN Card", status: "AI_MISMATCH", url: "#" },
      { id: "doc-8", type: "Aadhaar Card", status: "AI_MISMATCH", url: "#" },
      { id: "doc-9", type: "Address Proof", status: "AI_MISMATCH", url: "#" },
    ],
  },
];

function AdminKycPage() {
  const [statusFilter, setStatusFilter] = useState("PENDING"); // ALL | PENDING | UNDER_REVIEW | APPROVED | REJECTED
  const [riskFilter, setRiskFilter] = useState("ALL"); // ALL | LOW | MEDIUM | HIGH
  const [searchText, setSearchText] = useState("");
  const [selectedCase, setSelectedCase] = useState(mockKycCases[0] || null);

  const filteredCases = mockKycCases.filter((c) => {
    if (statusFilter !== "ALL" && c.status !== statusFilter) return false;
    if (riskFilter !== "ALL" && c.riskTag !== riskFilter) return false;

    if (searchText) {
      const t = (
        c.id +
        " " +
        c.customerId +
        " " +
        c.name +
        " " +
        c.pan
      ).toLowerCase();
      if (!t.includes(searchText.toLowerCase())) return false;
    }

    return true;
  });

  const statusBadgeClass = (status) => {
    if (status === "PENDING") return "bb-badge bb-badge-primary";
    if (status === "UNDER_REVIEW") return "bb-badge bb-badge-warning";
    if (status === "APPROVED") return "bb-badge bb-badge-success";
    if (status === "REJECTED") return "bb-badge bb-badge-danger";
    return "bb-badge";
  };

  const prettyStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "UNDER_REVIEW":
        return "Under Review";
      case "APPROVED":
        return "Approved";
      case "REJECTED":
        return "Rejected";
      default:
        return status;
    }
  };

  const riskBadgeClass = (risk) => {
    if (risk === "HIGH") return "bb-badge bb-badge-danger";
    if (risk === "MEDIUM") return "bb-badge bb-badge-primary";
    return "bb-badge bb-badge-success";
  };

  const docStatusBadgeClass = (status) => {
    if (status === "AI_MATCH") return "bb-badge bb-badge-success";
    if (status === "AI_PARTIAL_MATCH") return "bb-badge bb-badge-warning";
    if (status === "AI_MISMATCH") return "bb-badge bb-badge-danger";
    return "bb-badge";
  };

  const handleApprove = () => {
    if (!selectedCase) return;
    // later: POST /api/admin/kyc/{id}/approve
    alert(
      `Demo: Approved KYC case ${selectedCase.id}. Backend will update kyc_profile, user status, and write audit log.`
    );
  };

  const handleReject = () => {
    if (!selectedCase) return;
    // later: POST /api/admin/kyc/{id}/reject
    alert(
      `Demo: Rejected KYC case ${selectedCase.id}. Backend will ask for resubmission and log reason.`
    );
  };

  const handleRequestResubmission = () => {
    if (!selectedCase) return;
    // later: POST /api/admin/kyc/{id}/request-resubmit
    alert(
      "Demo: Requesting additional documents / resubmission. Real app will trigger secure message & email/SMS."
    );
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {/* Filters header */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">KYC Review</div>
            <div className="bb-card-subtitle">
              Review AI-assisted KYC cases and take final decisions.
            </div>
          </div>
          <span className="bb-badge">
            Pending cases:{" "}
            {mockKycCases.filter((c) => c.status === "PENDING").length}
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
                placeholder="KYC ID, customer ID, name, PAN"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Status filter */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Status
              </label>
              <select
                className="bb-input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="PENDING">Pending</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="ALL">All</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Risk filter */}
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

            {/* Placeholder for future advanced filters */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Advanced Filters (coming soon)
              </label>
              <input
                className="bb-input"
                placeholder="Region, branch, income range..."
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
            Backed by{" "}
            <code>
              /api/admin/kyc/cases?status=...&risk=...&query=...
            </code>{" "}
            and{" "}
            <code>/api/ai/kyc-ocr-verify</code> which provides AI suggestions
            based on document OCR and profile comparison.
          </p>
        </div>
      </div>

      {/* Main content: cases table + detail panel */}
      <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
        {/* KYC cases table */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">KYC Cases</div>
              <div className="bb-card-subtitle">
                Click a case to inspect details and AI insights.
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
                    <th style={{ padding: "8px 6px" }}>KYC ID</th>
                    <th style={{ padding: "8px 6px" }}>Customer</th>
                    <th style={{ padding: "8px 6px" }}>PAN</th>
                    <th style={{ padding: "8px 6px" }}>Submitted</th>
                    <th style={{ padding: "8px 6px" }}>AI Match</th>
                    <th style={{ padding: "8px 6px" }}>AI Risk</th>
                    <th style={{ padding: "8px 6px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCase(c)}
                      style={{
                        borderBottom: "1px solid rgba(15,23,42,0.9)",
                        cursor: "pointer",
                      }}
                    >
                      <td style={{ padding: "8px 6px" }}>{c.id}</td>
                      <td style={{ padding: "8px 6px" }}>
                        {c.name}
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--bb-text-muted)",
                          }}
                        >
                          {c.customerId}
                        </div>
                      </td>
                      <td style={{ padding: "8px 6px" }}>{c.pan}</td>
                      <td style={{ padding: "8px 6px" }}>{c.submittedAt}</td>
                      <td style={{ padding: "8px 6px" }}>
                        {(c.aiMatchScore * 100).toFixed(0)}%
                      </td>
                      <td style={{ padding: "8px 6px" }}>
                        <span className={riskBadgeClass(c.riskTag)}>
                          {c.riskTag}
                        </span>
                      </td>
                      <td style={{ padding: "8px 6px" }}>
                        <span className={statusBadgeClass(c.status)}>
                          {prettyStatus(c.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredCases.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: "10px 6px",
                          textAlign: "center",
                          color: "var(--bb-text-muted)",
                        }}
                      >
                        No KYC cases match the current filters.
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
              In production, rows can be sorted by submission time, AI match
              score or risk level. Bulk actions (export, assign to reviewer) can
              be added here.
            </p>
          </div>
        </div>

        {/* Right: selected case details */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">Case Details & AI Suggestion</div>
              <div className="bb-card-subtitle">
                Compare profile vs documents and use AI recommendations for
                final decision.
              </div>
            </div>
          </div>

          <div className="bb-card-body">
            {!selectedCase && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                }}
              >
                Select a KYC case from the table to view details.
              </p>
            )}

            {selectedCase && (
              <div style={{ display: "grid", gap: 10, fontSize: "0.85rem" }}>
                {/* Basic info */}
                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    Customer
                  </div>
                  <div>{selectedCase.name}</div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--bb-text-muted)",
                    }}
                  >
                    {selectedCase.customerId}
                  </div>
                </div>

                {/* PAN / Aadhaar */}
                <div className="grid-2">
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      PAN
                    </div>
                    <div>{selectedCase.pan}</div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      Aadhaar (masked)
                    </div>
                    <div>{selectedCase.aadhaarMasked}</div>
                  </div>
                </div>

                {/* AI scores */}
                <div className="grid-3">
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      AI Match Score
                    </div>
                    <div>{(selectedCase.aiMatchScore * 100).toFixed(0)}%</div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      AI Risk Tag
                    </div>
                    <span className={riskBadgeClass(selectedCase.riskTag)}>
                      {selectedCase.riskTag}
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
                      Case Status
                    </div>
                    <span className={statusBadgeClass(selectedCase.status)}>
                      {prettyStatus(selectedCase.status)}
                    </span>
                  </div>
                </div>

                {/* AI summary block */}
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
                    AI KYC Summary (Demo)
                  </div>
                  <div>{selectedCase.aiSummary}</div>
                  {selectedCase.aiFlags && selectedCase.aiFlags.length > 0 && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: "0.78rem",
                      }}
                    >
                      Flags:
                      <ul
                        style={{
                          margin: "4px 0 0 16px",
                          padding: 0,
                          fontSize: "0.78rem",
                          color: "var(--bb-text-muted)",
                        }}
                      >
                        {selectedCase.aiFlags.map((f, idx) => (
                          <li key={idx}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Documents list */}
                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 4,
                    }}
                  >
                    Documents
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    {selectedCase.docs.map((d) => (
                      <div
                        key={d.id}
                        style={{
                          padding: "6px 8px",
                          borderRadius: 8,
                          border: "1px solid rgba(31,41,55,0.9)",
                          background: "rgba(15,23,42,0.95)",
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.8rem",
                        }}
                      >
                        <div>{d.type}</div>
                        <span className={docStatusBadgeClass(d.status)}>
                          {d.status.replace("AI_", "").replace("_", " ")}
                        </span>
                      </div>
                    ))}
                    {selectedCase.docs.length === 0 && (
                      <p
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--bb-text-muted)",
                        }}
                      >
                        No documents linked to this case.
                      </p>
                    )}
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
                    onClick={handleApprove}
                  >
                    Approve KYC
                  </button>

                  <button
                    type="button"
                    className="bb-button bb-button-secondary"
                    style={{ fontSize: "0.8rem" }}
                    onClick={handleReject}
                  >
                    Reject KYC
                  </button>

                  <button
                    type="button"
                    className="bb-button bb-button-secondary"
                    style={{ fontSize: "0.8rem" }}
                    onClick={handleRequestResubmission}
                  >
                    Request Additional Documents
                  </button>

                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bb-text-muted)",
                    }}
                  >
                    AI provides suggestions only. Final decision is always taken
                    by a human reviewer and recorded in{" "}
                    <code>kyc_profile</code>, <code>kyc_documents</code> and{" "}
                    <code>audit_log</code>.
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

export default AdminKycPage;
