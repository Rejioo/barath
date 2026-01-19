import React, { useState } from "react";

const mockBillers = [
  {
    id: "bill-cat-1",
    category: "Electricity",
    providers: ["TNEB", "BESCOM", "MSEB"],
    icon: "⚡",
  },
  {
    id: "bill-cat-2",
    category: "Mobile Postpaid",
    providers: ["Jio", "Airtel", "VI"],
    icon: "📱",
  },
  {
    id: "bill-cat-3",
    category: "DTH / Cable",
    providers: ["Tata Play", "Airtel DTH", "Dish TV"],
    icon: "📺",
  },
  {
    id: "bill-cat-4",
    category: "Broadband / Wifi",
    providers: ["Airtel", "JioFiber", "ACT"],
    icon: "🌐",
  },
  {
    id: "bill-cat-5",
    category: "Water & Gas",
    providers: ["Metro Water", "Indane", "HP Gas"],
    icon: "💧",
  },
];

const mockRecentPayments = [
  {
    id: "bp-1",
    date: "01 Dec 2025",
    biller: "TNEB",
    category: "Electricity",
    consumerId: "1234567890",
    amount: "₹ 3,250",
    status: "SUCCESS",
    mode: "NetBanking",
  },
  {
    id: "bp-2",
    date: "28 Nov 2025",
    biller: "Jio Postpaid",
    category: "Mobile Postpaid",
    consumerId: "98XXXXXX45",
    amount: "₹ 899",
    status: "SUCCESS",
    mode: "UPI",
  },
  {
    id: "bp-3",
    date: "25 Nov 2025",
    biller: "Airtel Xstream Fiber",
    category: "Broadband",
    consumerId: "AXF123456",
    amount: "₹ 1,199",
    status: "SUCCESS",
    mode: "NetBanking",
  },
  {
    id: "bp-4",
    date: "22 Nov 2025",
    biller: "Tata Play",
    category: "DTH",
    consumerId: "6000123456",
    amount: "₹ 450",
    status: "SUCCESS",
    mode: "UPI",
  },
];

function BillsPage() {
  const [selectedCategory, setSelectedCategory] = useState(mockBillers[0]);
  const [selectedProvider, setSelectedProvider] = useState(
    mockBillers[0].providers[0]
  );
  const [consumerId, setConsumerId] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);

  const handleCategoryClick = (biller) => {
    setSelectedCategory(biller);
    setSelectedProvider(biller.providers[0] || "");
  };

  const handlePayBill = (e) => {
    e.preventDefault();
    if (!consumerId || !billAmount) {
      alert("Please fill consumer number and amount.");
      return;
    }

    // TODO (later): call backend /api/bills/pay or /api/billers/{id}/pay
    console.log("Bill payment submit:", {
      selectedCategory,
      selectedProvider,
      consumerId,
      billAmount,
      autoPayEnabled,
    });

    alert(
      "Demo: Bill payment initiated. Backend will handle payment, store record and call AI for insights."
    );
    setBillAmount("");
  };

  return (
    <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
      {/* LEFT: biller selection + pay form */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Bills & Payments</div>
            <div className="bb-card-subtitle">
              Pay electricity, mobile, DTH, broadband and more.
            </div>
          </div>
        </div>

        <div className="bb-card-body" style={{ display: "grid", gap: 14 }}>
          {/* Categories */}
          <div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--bb-text-muted)",
                marginBottom: 6,
              }}
            >
              Choose biller category
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {mockBillers.map((biller) => {
                const active = selectedCategory.id === biller.id;
                return (
                  <button
                    key={biller.id}
                    type="button"
                    onClick={() => handleCategoryClick(biller)}
                    style={{
                      borderRadius: 999,
                      border: active
                        ? "1px solid rgba(59,130,246,0.8)"
                        : "1px solid rgba(31,41,55,0.9)",
                      background: active
                        ? "linear-gradient(135deg,rgba(37,99,235,0.45),rgba(15,23,42,1))"
                        : "rgba(15,23,42,0.95)",
                      padding: "6px 12px",
                      fontSize: "0.78rem",
                      color: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                    }}
                  >
                    <span>{biller.icon}</span>
                    <span>{biller.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Provider + form */}
          <form onSubmit={handlePayBill} style={{ display: "grid", gap: 10 }}>
            <div className="grid-2">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  Provider
                </label>
                <select
                  className="bb-input"
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                >
                  {selectedCategory.providers.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
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
                  Consumer / Account Number
                </label>
                <input
                  className="bb-input"
                  placeholder="Consumer number / mobile / account"
                  value={consumerId}
                  onChange={(e) => setConsumerId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  Amount (₹)
                </label>
                <input
                  className="bb-input"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Enter bill amount"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  required
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
                  Payment Mode (demo)
                </label>
                <select className="bb-input" defaultValue="NETBANKING">
                  <option value="NETBANKING">NetBanking</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Debit/Credit Card</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <input
                type="checkbox"
                id="autopay"
                checked={autoPayEnabled}
                onChange={(e) => setAutoPayEnabled(e.target.checked)}
              />
              <label
                htmlFor="autopay"
                style={{
                  fontSize: "0.78rem",
                  color: "var(--bb-text-muted)",
                }}
              >
                Enable AutoPay for this bill (up to a max amount). In real app,
                AI will detect anomalies before auto-payment.
              </label>
            </div>

            <button type="submit" className="bb-button">
              Pay Bill
            </button>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--bb-text-muted)",
              }}
            >
              Payments are protected with{" "}
              <span style={{ color: "#bfdbfe" }}>OTP</span> and{" "}
              <span style={{ color: "#bfdbfe" }}>AI fraud checks</span> for
              unusual amounts or new billers.
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT: recent payments + AI suggestion */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Recent Bill Payments</div>
            <div className="bb-card-subtitle">
              Track your past bills and AI insights.
            </div>
          </div>
        </div>

        <div className="bb-card-body">
          {/* AI insight summary */}
          <div
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              marginBottom: 10,
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
              AI Bill Insight (Demo)
            </div>
            <div>
              Your average{" "}
              <span style={{ color: "#fde68a" }}>electricity bill</span> over
              the last 6 months is{" "}
              <span style={{ color: "#bbf7d0" }}>₹ 3,100</span>. This month’s
              bill seems within the normal range.
            </div>
          </div>

          {/* Recent payments table */}
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
                  <th style={{ padding: "8px 6px" }}>Date</th>
                  <th style={{ padding: "8px 6px" }}>Biller</th>
                  <th style={{ padding: "8px 6px" }}>Category</th>
                  <th style={{ padding: "8px 6px" }}>Consumer ID</th>
                  <th style={{ padding: "8px 6px" }}>Amount</th>
                  <th style={{ padding: "8px 6px" }}>Status</th>
                  <th style={{ padding: "8px 6px" }}>Mode</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentPayments.map((p) => (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: "1px solid rgba(15,23,42,0.9)",
                    }}
                  >
                    <td style={{ padding: "8px 6px" }}>{p.date}</td>
                    <td style={{ padding: "8px 6px" }}>{p.biller}</td>
                    <td style={{ padding: "8px 6px" }}>{p.category}</td>
                    <td style={{ padding: "8px 6px" }}>{p.consumerId}</td>
                    <td style={{ padding: "8px 6px" }}>{p.amount}</td>
                    <td style={{ padding: "8px 6px" }}>
                      <span className="bb-badge">{p.status}</span>
                    </td>
                    <td style={{ padding: "8px 6px" }}>{p.mode}</td>
                  </tr>
                ))}
                {mockRecentPayments.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        padding: "10px 6px",
                        textAlign: "center",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      No bill payments recorded yet.
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
            In the full system, this table will come from{" "}
            <span style={{ color: "#bfdbfe" }}>/api/bill-payments</span>, with
            AI tagging unusually high bills or changes in consumption.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BillsPage;
