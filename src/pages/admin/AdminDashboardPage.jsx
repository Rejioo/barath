import React, { useState, useEffect } from "react";

const mockMetrics = {
  totalUsers: 12450,
  kycVerified: 9820,
  todayTransfersCount: 452,
  todayTransfersValue: "₹ 3.8 Cr",
  highRiskAlertsToday: 18,
};

const mockFraudSummary = [
  {
    id: "f-1",
    time: "09:10 AM",
    user: "BBNK00123890",
    amount: "₹ 1,25,000",
    channel: "NetBanking",
    riskLevel: "HIGH",
    reason: "New beneficiary + unusual amount + new device",
  },
  {
    id: "f-2",
    time: "08:40 AM",
    user: "BBNK00099821",
    amount: "₹ 65,000",
    channel: "UPI",
    riskLevel: "MEDIUM",
    reason: "Out-of-pattern merchant and late night login",
  },
  {
    id: "f-3",
    time: "08:05 AM",
    user: "BBNK00112233",
    amount: "₹ 3,50,000",
    channel: "RTGS",
    riskLevel: "HIGH",
    reason: "First-time large RTGS + corporate account change",
  },
];

const mockVolumeByHour = [
  { hour: "06", count: 40 },
  { hour: "07", count: 96 },
  { hour: "08", count: 132 },
  { hour: "09", count: 184 },
  { hour: "10", count: 120 },
];

const mockFraudScoreBuckets = [
  { label: "0–0.2", count: 210 },
  { label: "0.2–0.4", count: 160 },
  { label: "0.4–0.6", count: 90 },
  { label: "0.6–0.8", count: 35 },
  { label: "0.8–1.0", count: 12 },
];

function AdminDashboardPage() {
  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    // Later: call backend /api/admin/ai/summary
    setAiLoading(true);
    setTimeout(() => {
      setAiSummary(
        "In the last 24 hours, 18 high-risk transactions were detected, " +
          "mainly from two regions and three merchants. No strong evidence of coordinated attack, " +
          "but monitoring is recommended for new beneficiary additions above ₹ 1,00,000."
      );
      setAiLoading(false);
    }, 800);
  }, []);

  const totalTransactions =
    mockFraudScoreBuckets.reduce((sum, b) => sum + b.count, 0) || 1;

  const riskBadgeClass = (level) => {
    switch (level) {
      case "HIGH":
        return "bb-badge bb-badge-danger";
      case "MEDIUM":
        return "bb-badge bb-badge-primary";
      default:
        return "bb-badge";
    }
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {/* Top row: metrics + AI summary */}
      <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
        {/* Metrics cards */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">Operational Snapshot</div>
              <div className="bb-card-subtitle">
                Key metrics for today across the platform.
              </div>
            </div>
          </div>
          <div className="bb-card-body">
            <div className="grid-4">
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--bb-text-muted)",
                    marginBottom: 4,
                  }}
                >
                  Total Customers
                </div>
                <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                  {mockMetrics.totalUsers.toLocaleString("en-IN")}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                    marginTop: 2,
                  }}
                >
                  Active internet banking users.
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--bb-text-muted)",
                    marginBottom: 4,
                  }}
                >
                  KYC Verified
                </div>
                <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                  {mockMetrics.kycVerified.toLocaleString("en-IN")}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                    marginTop: 2,
                  }}
                >
                  Fully compliant customers.
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--bb-text-muted)",
                    marginBottom: 4,
                  }}
                >
                  Transfers Today
                </div>
                <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                  {mockMetrics.todayTransfersCount}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                    marginTop: 2,
                  }}
                >
                  Volume: {mockMetrics.todayTransfersValue}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--bb-text-muted)",
                    marginBottom: 4,
                  }}
                >
                  High-Risk Alerts (Today)
                </div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "#f97316",
                  }}
                >
                  {mockMetrics.highRiskAlertsToday}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                    marginTop: 2,
                  }}
                >
                  From AI risk engine & rules.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI narrative summary */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">AI Activity Summary</div>
              <div className="bb-card-subtitle">
                Generated by the Risk & Intelligence engine.
              </div>
            </div>
            <span className="bb-badge bb-badge-primary">AI Generated</span>
          </div>
          <div className="bb-card-body">
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                background:
                  "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(15,23,42,0.95))",
                border: "1px solid rgba(37,99,235,0.7)",
                fontSize: "0.85rem",
              }}
            >
              {aiLoading && (
                <p style={{ color: "var(--bb-text-muted)" }}>
                  Generating summary based on latest fraud scores…
                </p>
              )}
              {!aiLoading && <p>{aiSummary}</p>}
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: "0.78rem",
                color: "var(--bb-text-muted)",
              }}
            >
              In production, this card will call{" "}
              <code>/api/admin/ai/summary</code>, which aggregates data from
              login risk, transaction fraud scores and KYC anomalies for the
              last 24 hours.
            </div>
          </div>
        </div>
      </div>

      {/* Middle row: Fraud score distribution & volume by hour */}
      <div className="grid-2" style={{ alignItems: "stretch", gap: 18 }}>
        {/* Fraud score distribution */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">Fraud Score Distribution</div>
              <div className="bb-card-subtitle">
                Distribution of AI fraud scores across today&apos;s
                transactions.
              </div>
            </div>
          </div>
          <div className="bb-card-body">
            <div
              style={{
                display: "grid",
                gap: 8,
                fontSize: "0.8rem",
              }}
            >
              {mockFraudScoreBuckets.map((bucket) => {
                const pct = Math.round(
                  (bucket.count / totalTransactions) * 100
                );
                return (
                  <div key={bucket.label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span>{bucket.label}</span>
                      <span style={{ color: "var(--bb-text-muted)" }}>
                        {bucket.count} ({pct}%)
                      </span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        borderRadius: 999,
                        background: "rgba(15,23,42,0.95)",
                        border: "1px solid rgba(31,41,55,0.9)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          background:
                            bucket.label === "0.8–1.0"
                              ? "linear-gradient(90deg,#ef4444,#f97316)"
                              : bucket.label === "0.6–0.8"
                              ? "linear-gradient(90deg,#f97316,#facc15)"
                              : "linear-gradient(90deg,#22c55e,#3b82f6)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--bb-text-muted)",
                marginTop: 10,
              }}
            >
              Backed by data from{" "}
              <code>/api/admin/fraud/summary</code> and{" "}
              <code>/api/ai/fraud-score</code>. Buckets with unusually high
              counts trigger alerts on the Fraud Console.
            </p>
          </div>
        </div>

        {/* Transaction volume by hour */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">Transaction Volume (Today)</div>
              <div className="bb-card-subtitle">
                Hourly count of successful transactions.
              </div>
            </div>
          </div>
          <div className="bb-card-body">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 10,
                height: 160,
                paddingBottom: 6,
              }}
            >
              {mockVolumeByHour.map((item) => {
                const maxCount = Math.max(
                  ...mockVolumeByHour.map((i) => i.count)
                );
                const heightPct = Math.round(
                  (item.count / (maxCount || 1)) * 100
                );
                return (
                  <div
                    key={item.hour}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        height: `${heightPct}%`,
                        width: "70%",
                        borderRadius: 6,
                        background:
                          "linear-gradient(180deg,#3b82f6,#0f172a)",
                        border: "1px solid rgba(37,99,235,0.7)",
                      }}
                    />
                    <div style={{ color: "var(--bb-text-muted)" }}>
                      {item.hour}:00
                    </div>
                  </div>
                );
              })}
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--bb-text-muted)",
                marginTop: 4,
              }}
            >
              Data sourced from{" "}
              <code>/api/admin/transactions/volume?range=today</code>. Spikes
              combined with high-risk scores can auto-raise SEV alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom row: latest high-risk transactions */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Latest High-Risk Transactions</div>
            <div className="bb-card-subtitle">
              Highlighted by fraud engine for review.
            </div>
          </div>
          <button
            type="button"
            className="bb-button bb-button-secondary"
            style={{ fontSize: "0.8rem" }}
            // later: navigate to /admin/fraud
          >
            Open Fraud Console
          </button>
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
                  <th style={{ padding: "8px 6px" }}>Time</th>
                  <th style={{ padding: "8px 6px" }}>Customer ID</th>
                  <th style={{ padding: "8px 6px" }}>Amount</th>
                  <th style={{ padding: "8px 6px" }}>Channel</th>
                  <th style={{ padding: "8px 6px" }}>Risk</th>
                  <th style={{ padding: "8px 6px" }}>Reason (AI)</th>
                </tr>
              </thead>
              <tbody>
                {mockFraudSummary.map((tx) => (
                  <tr
                    key={tx.id}
                    style={{
                      borderBottom: "1px solid rgba(15,23,42,0.9)",
                    }}
                  >
                    <td style={{ padding: "8px 6px" }}>{tx.time}</td>
                    <td style={{ padding: "8px 6px" }}>{tx.user}</td>
                    <td style={{ padding: "8px 6px" }}>{tx.amount}</td>
                    <td style={{ padding: "8px 6px" }}>{tx.channel}</td>
                    <td style={{ padding: "8px 6px" }}>
                      <span className={riskBadgeClass(tx.riskLevel)}>
                        {tx.riskLevel}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "8px 6px",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      {tx.reason}
                    </td>
                  </tr>
                ))}
                {mockFraudSummary.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: "10px 6px",
                        textAlign: "center",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      No high-risk transactions detected in the recent window.
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
            In the full system, this table will be populated from{" "}
            <code>/api/admin/fraud/recent</code>, and clicking a row will open
            the fraud case detail view in the Fraud Console.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
