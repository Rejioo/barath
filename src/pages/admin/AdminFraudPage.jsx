import React, { useState } from "react";

const mockSuspiciousTx = [
  {
    id: "TXN-2025-0001",
    time: "01 Dec 2025 · 09:10 AM",
    customerId: "BBNK00123890",
    customerName: "Rahul Verma",
    amount: 125000,
    amountDisplay: "₹ 1,25,000",
    currency: "INR",
    channel: "NetBanking",
    riskLevel: "HIGH",
    fraudScore: 0.87,
    status: "PENDING_REVIEW",
    beneficiaryName: "Apex Traders Pvt Ltd",
    beneficiaryAccount: "XXXXXX9821",
    originLocation: "Chennai, India",
    device: "Chrome · Windows 10",
    reasons: [
      "New beneficiary",
      "Unusual amount vs typical pattern",
      "Login from new device",
    ],
    aiSuggestedActions: [
      "Call customer to verify transaction intent",
      "Temporarily hold settlement until verification",
    ],
  },
  {
    id: "TXN-2025-0002",
    time: "01 Dec 2025 · 08:40 AM",
    customerId: "BBNK00099821",
    customerName: "Priya Sharma",
    amount: 65000,
    amountDisplay: "₹ 65,000",
    currency: "INR",
    channel: "UPI",
    riskLevel: "MEDIUM",
    fraudScore: 0.62,
    status: "PENDING_REVIEW",
    beneficiaryName: "XYZ Services",
    beneficiaryAccount: "UPI: xyz@upi",
    originLocation: "Bengaluru, India",
    device: "Android App",
    reasons: [
      "Late night login in last session",
      "Merchant not seen in last 6 months",
    ],
    aiSuggestedActions: [
      "Monitor for repeat payments to same merchant",
      "Optional call-back if multiple similar attempts occur",
    ],
  },
  {
    id: "TXN-2025-0003",
    time: "30 Nov 2025 · 11:55 PM",
    customerId: "BBNK00112233",
    customerName: "Anjali Mehta",
    amount: 350000,
    amountDisplay: "₹ 3,50,000",
    currency: "INR",
    channel: "RTGS",
    riskLevel: "HIGH",
    fraudScore: 0.93,
    status: "UNDER_INVESTIGATION",
    beneficiaryName: "Global Exports LLP",
    beneficiaryAccount: "XXXXXX5501",
    originLocation: "Mumbai, India",
    device: "Chrome · macOS",
    reasons: [
      "Very high amount vs salary credit",
      "Multiple beneficiary changes in last 24 hours",
      "IP location mismatch vs usual city",
    ],
    aiSuggestedActions: [
      "Keep transaction on hold",
      "Escalate to L2 fraud analyst",
      "Consider temporary debit freeze after customer verification",
    ],
  },
];

function AdminFraudPage() {
  const [riskFilter, setRiskFilter] = useState("ALL"); // ALL | LOW | MEDIUM | HIGH
  const [timeFilter, setTimeFilter] = useState("24H"); // TODAY | 24H | 7D
  const [channelFilter, setChannelFilter] = useState("ALL"); // ALL | UPI | NETBANKING | RTGS | CARD
  const [searchText, setSearchText] = useState("");
  const [selectedTxn, setSelectedTxn] = useState(mockSuspiciousTx[0] || null);

  const filteredTx = mockSuspiciousTx.filter((tx) => {
    if (riskFilter !== "ALL" && tx.riskLevel !== riskFilter) return false;
    if (channelFilter !== "ALL" && tx.channel.toUpperCase() !== channelFilter)
      return false;

    if (searchText) {
      const t = (
        tx.id +
        " " +
        tx.customerId +
        " " +
        tx.customerName +
        " " +
        tx.beneficiaryName
      ).toLowerCase();
      if (!t.includes(searchText.toLowerCase())) return false;
    }

    // timeFilter demo: we are not checking actual timestamps here
    return true;
  });

  const riskBadgeClass = (risk) => {
    if (risk === "HIGH") return "bb-badge bb-badge-danger";
    if (risk === "MEDIUM") return "bb-badge bb-badge-primary";
    return "bb-badge bb-badge-success";
  };

  const statusBadgeClass = (status) => {
    if (status === "PENDING_REVIEW") return "bb-badge bb-badge-primary";
    if (status === "UNDER_INVESTIGATION") return "bb-badge bb-badge-warning";
    if (status === "CLOSED_CONFIRMED_FRAUD")
      return "bb-badge bb-badge-danger";
    if (status === "CLOSED_FALSE_POSITIVE")
      return "bb-badge bb-badge-success";
    return "bb-badge";
  };

  const prettyStatus = (status) => {
    switch (status) {
      case "PENDING_REVIEW":
        return "Pending Review";
      case "UNDER_INVESTIGATION":
        return "Under Investigation";
      case "CLOSED_CONFIRMED_FRAUD":
        return "Closed · Confirmed Fraud";
      case "CLOSED_FALSE_POSITIVE":
        return "Closed · Genuine Transaction";
      default:
        return status;
    }
  };

  const handleMarkReviewed = () => {
    if (!selectedTxn) return;
    // later: POST /api/admin/fraud/{id}/mark-reviewed
    alert(
      `Demo: Marked ${selectedTxn.id} as reviewed. Backend will update status + audit log.`
    );
  };

  const handleEscalate = () => {
    if (!selectedTxn) return;
    // later: POST /api/admin/fraud/{id}/escalate
    alert(
      `Demo: Escalated ${selectedTxn.id} to L2 team. Backend will create a case + notify relevant queue.`
    );
  };

  const handleBlockUser = () => {
    if (!selectedTxn) return;
    // later: POST /api/admin/users/{customerId}/lock
    alert(
      `Demo: Block user ${selectedTxn.customerId}. Real system locks account, cancels pending transactions and logs admin action.`
    );
  };

  const handleFreezeAccount = () => {
    if (!selectedTxn) return;
    // later: POST /api/admin/accounts/{id}/freeze
    alert(
      "Demo: Temporary debit freeze requested for customer accounts. Backend will apply rules and ask for additional justification."
    );
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {/* Top filters & summary */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Fraud Console</div>
            <div className="bb-card-subtitle">
              Monitor and investigate high-risk transactions flagged by AI &
              rules engine.
            </div>
          </div>
          <span className="bb-badge bb-badge-danger">
            Active alerts: {mockSuspiciousTx.length}
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
                placeholder="Txn ID, customer ID, name or beneficiary"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
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
                Risk Level
              </label>
              <select
                className="bb-input"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            {/* Time filter */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Time Range
              </label>
              <select
                className="bb-input"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="TODAY">Today</option>
                <option value="24H">Last 24 hours</option>
                <option value="7D">Last 7 days</option>
              </select>
            </div>

            {/* Channel filter */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Channel
              </label>
              <select
                className="bb-input"
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="UPI">UPI</option>
                <option value="NETBANKING">NetBanking</option>
                <option value="RTGS">RTGS / NEFT</option>
                <option value="CARD">Cards</option>
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
            In the full system, this query is backed by{" "}
            <code>
              /api/admin/fraud/alerts?risk=...&timeRange=...&channel=...&q=...
            </code>{" "}
            and supports pagination and export for case management.
          </p>
        </div>
      </div>

      {/* Main area: table + details */}
      <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
        {/* Suspicious transactions table */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">Flagged Transactions</div>
              <div className="bb-card-subtitle">
                Click a row to see AI explanation and take action.
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
                    <th style={{ padding: "8px 6px" }}>Txn ID</th>
                    <th style={{ padding: "8px 6px" }}>Time</th>
                    <th style={{ padding: "8px 6px" }}>Customer</th>
                    <th style={{ padding: "8px 6px" }}>Amount</th>
                    <th style={{ padding: "8px 6px" }}>Channel</th>
                    <th style={{ padding: "8px 6px" }}>Risk</th>
                    <th style={{ padding: "8px 6px" }}>Score</th>
                    <th style={{ padding: "8px 6px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTx.map((tx) => (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTxn(tx)}
                      style={{
                        borderBottom: "1px solid rgba(15,23,42,0.9)",
                        cursor: "pointer",
                      }}
                    >
                      <td style={{ padding: "8px 6px" }}>{tx.id}</td>
                      <td style={{ padding: "8px 6px" }}>{tx.time}</td>
                      <td style={{ padding: "8px 6px" }}>
                        {tx.customerName}
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--bb-text-muted)",
                          }}
                        >
                          {tx.customerId}
                        </div>
                      </td>
                      <td style={{ padding: "8px 6px" }}>
                        {tx.amountDisplay}
                      </td>
                      <td style={{ padding: "8px 6px" }}>{tx.channel}</td>
                      <td style={{ padding: "8px 6px" }}>
                        <span className={riskBadgeClass(tx.riskLevel)}>
                          {tx.riskLevel}
                        </span>
                      </td>
                      <td style={{ padding: "8px 6px" }}>
                        {tx.fraudScore.toFixed(2)}
                      </td>
                      <td style={{ padding: "8px 6px" }}>
                        <span className={statusBadgeClass(tx.status)}>
                          {prettyStatus(tx.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredTx.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        style={{
                          padding: "10px 6px",
                          textAlign: "center",
                          color: "var(--bb-text-muted)",
                        }}
                      >
                        No suspicious transactions match the current filters.
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
              Rows are sorted by a combination of fraud score, amount and time
              in descending risk order in the production setup.
            </p>
          </div>
        </div>

        {/* Detail panel */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">Case Details & AI Explanation</div>
              <div className="bb-card-subtitle">
                Deep dive into a single transaction and perform actions.
              </div>
            </div>
          </div>

          <div className="bb-card-body">
            {!selectedTxn && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                }}
              >
                Select a transaction from the table to view full details.
              </p>
            )}

            {selectedTxn && (
              <div style={{ display: "grid", gap: 10, fontSize: "0.85rem" }}>
                {/* Basic header */}
                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    Transaction
                  </div>
                  <div>{selectedTxn.id}</div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--bb-text-muted)",
                    }}
                  >
                    {selectedTxn.time}
                  </div>
                </div>

                {/* Amount + risk row */}
                <div className="grid-3">
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      Amount
                    </div>
                    <div>{selectedTxn.amountDisplay}</div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      Channel: {selectedTxn.channel}
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
                      Fraud Score
                    </div>
                    <div>{selectedTxn.fraudScore.toFixed(2)}</div>
                    <div style={{ marginTop: 4 }}>
                      <span className={riskBadgeClass(selectedTxn.riskLevel)}>
                        {selectedTxn.riskLevel} risk
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
                      Status
                    </div>
                    <span className={statusBadgeClass(selectedTxn.status)}>
                      {prettyStatus(selectedTxn.status)}
                    </span>
                  </div>
                </div>

                {/* Customer / Beneficiary */}
                <div className="grid-2">
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
                    <div>{selectedTxn.customerName}</div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      {selectedTxn.customerId}
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
                      Beneficiary
                    </div>
                    <div>{selectedTxn.beneficiaryName}</div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      {selectedTxn.beneficiaryAccount}
                    </div>
                  </div>
                </div>

                {/* Context */}
                <div className="grid-2">
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--bb-text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      Origin
                    </div>
                    <div>{selectedTxn.originLocation}</div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      Device: {selectedTxn.device}
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
                      AI Reasons
                    </div>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 16,
                        fontSize: "0.78rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      {selectedTxn.reasons.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI explanation / recommendation block */}
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
                    AI Recommendation (Demo)
                  </div>
                  <div>
                    Based on recent account behaviour and known fraud patterns,
                    the engine suggests:
                    <ul
                      style={{
                        margin: "6px 0 0 16px",
                        padding: 0,
                        fontSize: "0.78rem",
                      }}
                    >
                      {selectedTxn.aiSuggestedActions.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
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
                    onClick={handleMarkReviewed}
                  >
                    Mark as Reviewed
                  </button>

                  <button
                    type="button"
                    className="bb-button bb-button-secondary"
                    style={{ fontSize: "0.8rem" }}
                    onClick={handleEscalate}
                  >
                    Escalate Case
                  </button>

                  <button
                    type="button"
                    className="bb-button bb-button-secondary"
                    style={{
                      fontSize: "0.8rem",
                      background:
                        "linear-gradient(135deg,rgba(248,113,113,0.9),rgba(127,29,29,1))",
                      borderColor: "rgba(248,113,113,0.9)",
                    }}
                    onClick={handleBlockUser}
                  >
                    Block User Account
                  </button>

                  <button
                    type="button"
                    className="bb-button bb-button-secondary"
                    style={{ fontSize: "0.8rem" }}
                    onClick={handleFreezeAccount}
                  >
                    Temporary Debit Freeze
                  </button>

                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bb-text-muted)",
                    }}
                  >
                    In production, these actions call{" "}
                    <code>/api/admin/fraud/*</code>,{" "}
                    <code>/api/admin/users/*</code> and{" "}
                    <code>/api/admin/accounts/*</code> and every step is
                    recorded in <code>admin_actions</code> and{" "}
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

export default AdminFraudPage;
