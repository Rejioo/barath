import React, { useState } from "react";

const mockCards = [
  {
    id: "card-1",
    type: "DEBIT",
    label: "barath Platinum Debit",
    maskedNumber: "XXXX XXXX XXXX 1234",
    network: "VISA",
    status: "ACTIVE",
    limit: "₹ 75,000 / day",
    intlEnabled: true,
    contactlessEnabled: true,
    linkedAccount: "Savings · 1234",
  },
  {
    id: "card-2",
    type: "CREDIT",
    label: "barath Rewards Credit",
    maskedNumber: "XXXX XXXX XXXX 5678",
    network: "RUPAY",
    status: "ACTIVE",
    limit: "₹ 1,50,000 / cycle",
    intlEnabled: false,
    contactlessEnabled: true,
    linkedAccount: "Credit Card · 5678",
  },
];

const mockRecentCardTx = [
  {
    id: "ctx-1",
    date: "01 Dec 2025",
    merchant: "Zomato",
    card: "Debit · 1234",
    amount: "₹ 640",
    status: "SUCCESS",
    aiNote: "Food transaction in your usual spend pattern.",
  },
  {
    id: "ctx-2",
    date: "30 Nov 2025",
    merchant: "Amazon India",
    card: "Credit · 5678",
    amount: "₹ 3,200",
    status: "SUCCESS",
    aiNote: "Shopping transaction; within typical monthly limit.",
  },
  {
    id: "ctx-3",
    date: "28 Nov 2025",
    merchant: "Hotel – Goa",
    card: "Credit · 5678",
    amount: "₹ 18,500",
    status: "SUCCESS",
    aiNote: "Slightly higher than usual; flagged LOW risk.",
  },
];

function CardsPage() {
  const [selectedCardId, setSelectedCardId] = useState(mockCards[0]?.id || "");
  const [showLimitModal, setShowLimitModal] = useState(false);

  const selectedCard =
    mockCards.find((c) => c.id === selectedCardId) || mockCards[0];

  const handleToggle = (field) => {
    // later: call backend e.g. PATCH /api/cards/:id/settings
    console.log("Toggle", field, "for card", selectedCard.id);
    alert(
      `Demo: Toggled ${field} for ${selectedCard.label}. In real app this will update backend & may trigger OTP.`
    );
  };

  const handleBlockCard = () => {
    // later: POST /api/cards/:id/block
    alert(
      "Demo: Card block requested. In real app this will immediately lock card, notify you and start fraud workflow."
    );
  };

  return (
    <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
      {/* LEFT: card visual + controls */}
      <div>
        {/* Card selector */}
        <div className="bb-card" style={{ marginBottom: 16 }}>
          <div className="bb-card-header">
            <div>
              <div className="bb-card-title">My Cards</div>
              <div className="bb-card-subtitle">
                Manage your debit and credit cards, limits & controls.
              </div>
            </div>
          </div>
          <div className="bb-card-body">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {mockCards.map((card) => {
                const active = card.id === selectedCardId;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedCardId(card.id)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 999,
                      border: active
                        ? "1px solid rgba(59,130,246,0.8)"
                        : "1px solid rgba(31,41,55,0.9)",
                      background: active
                        ? "linear-gradient(135deg,rgba(37,99,235,0.45),rgba(15,23,42,1))"
                        : "rgba(15,23,42,0.95)",
                      fontSize: "0.78rem",
                      color: "#e5e7eb",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span>
                      {card.type === "DEBIT" ? "💳" : "🧾"}
                    </span>
                    <span>{card.type === "DEBIT" ? "Debit" : "Credit"}</span>
                    <span style={{ color: "var(--bb-text-muted)" }}>
                      · {card.maskedNumber.slice(-4)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card visual */}
        <div className="bb-card" style={{ marginBottom: 16 }}>
          <div className="bb-card-body">
            <div
              style={{
                borderRadius: 18,
                padding: 18,
                background:
                  "radial-gradient(circle at top left,#3b82f6,#0f172a)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* subtle overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at bottom right,rgba(15,23,42,0.2),transparent)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#bfdbfe",
                  marginBottom: 6,
                }}
              >
                barath
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {selectedCard.label}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  letterSpacing: "0.16em",
                  marginBottom: 14,
                }}
              >
                {selectedCard.maskedNumber}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  fontSize: "0.8rem",
                  color: "#e5e7eb",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      opacity: 0.85,
                      marginBottom: 2,
                    }}
                  >
                    Linked to
                  </div>
                  <div>{selectedCard.linkedAccount}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      opacity: 0.85,
                      marginBottom: 2,
                    }}
                  >
                    Network
                  </div>
                  <div>{selectedCard.network}</div>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  right: 16,
                  top: 14,
                  padding: "3px 8px",
                  borderRadius: 999,
                  fontSize: "0.7rem",
                  border: "1px solid rgba(209,213,219,0.4)",
                  color: "#f9fafb",
                }}
              >
                {selectedCard.type === "DEBIT" ? "DEBIT" : "CREDIT"}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bb-card">
          <div className="bb-card-header">
            <div className="bb-card-title">Card Controls</div>
          </div>
          <div className="bb-card-body" style={{ display: "grid", gap: 10 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: 2,
                  }}
                >
                  International Usage
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  Enable or disable international transactions for this card.
                </div>
              </div>
              <button
                type="button"
                className="bb-button bb-button-secondary"
                style={{ fontSize: "0.78rem" }}
                onClick={() => handleToggle("international")}
              >
                {selectedCard.intlEnabled ? "Disable" : "Enable"}
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: 2,
                  }}
                >
                  Contactless (Tap & Pay)
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  Control tap-and-go payments above low-value thresholds.
                </div>
              </div>
              <button
                type="button"
                className="bb-button bb-button-secondary"
                style={{ fontSize: "0.78rem" }}
                onClick={() => handleToggle("contactless")}
              >
                {selectedCard.contactlessEnabled ? "Disable" : "Enable"}
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: 2,
                  }}
                >
                  Card Limit
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  Current limit:{" "}
                  <span style={{ color: "#e5e7eb" }}>
                    {selectedCard.limit}
                  </span>
                  . You can adjust transaction limits.
                </div>
              </div>
              <button
                type="button"
                className="bb-button bb-button-secondary"
                style={{ fontSize: "0.78rem" }}
                onClick={() => setShowLimitModal(true)}
              >
                Change
              </button>
            </div>

            <div
              style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: "1px solid rgba(31,41,55,0.9)",
              }}
            >
              <button
                type="button"
                className="bb-button"
                style={{
                  width: "100%",
                  background:
                    "linear-gradient(135deg,rgba(248,113,113,0.9),rgba(127,29,29,1))",
                  borderColor: "rgba(248,113,113,0.9)",
                }}
                onClick={handleBlockCard}
              >
                Block Card & Report Issue
              </button>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--bb-text-muted)",
                  marginTop: 6,
                }}
              >
                If you suspect fraud, blocking will immediately stop new
                transactions. Our AI & fraud team will review recent activity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: AI summary + recent card transactions */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Card Insights & Activity</div>
            <div className="bb-card-subtitle">
              AI summary of card usage and recent transactions.
            </div>
          </div>
          <span className="bb-badge bb-badge-primary">AI Assistant</span>
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
              AI Usage Insight (Demo)
            </div>
            <div>
              Your{" "}
              <span style={{ color: "#fde68a" }}>credit card spend</span> is{" "}
              <span style={{ color: "#bbf7d0" }}>12% lower</span> than last
              month. Most transactions are{" "}
              <span style={{ color: "#bfdbfe" }}>online shopping</span> and{" "}
              <span style={{ color: "#bfdbfe" }}>food delivery</span>.
            </div>
          </div>

          {/* Recent card transactions */}
          <div
            style={{
              fontSize: "0.8rem",
              marginBottom: 6,
              color: "var(--bb-text-muted)",
            }}
          >
            Recent card transactions
          </div>
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
                  <th style={{ padding: "8px 6px" }}>Merchant</th>
                  <th style={{ padding: "8px 6px" }}>Card</th>
                  <th style={{ padding: "8px 6px" }}>Amount</th>
                  <th style={{ padding: "8px 6px" }}>Status</th>
                  <th style={{ padding: "8px 6px" }}>AI Note</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentCardTx.map((tx) => (
                  <tr
                    key={tx.id}
                    style={{
                      borderBottom: "1px solid rgba(15,23,42,0.9)",
                    }}
                  >
                    <td style={{ padding: "8px 6px" }}>{tx.date}</td>
                    <td style={{ padding: "8px 6px" }}>{tx.merchant}</td>
                    <td style={{ padding: "8px 6px" }}>{tx.card}</td>
                    <td style={{ padding: "8px 6px" }}>{tx.amount}</td>
                    <td style={{ padding: "8px 6px" }}>
                      <span className="bb-badge">{tx.status}</span>
                    </td>
                    <td
                      style={{
                        padding: "8px 6px",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      {tx.aiNote}
                    </td>
                  </tr>
                ))}
                {mockRecentCardTx.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: "10px 6px",
                        textAlign: "center",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      No card transactions recorded yet.
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
            In the full system, this data would come from{" "}
            <span style={{ color: "#bfdbfe" }}>/api/cards</span> and{" "}
            <span style={{ color: "#bfdbfe" }}>
              /api/cards/{`{cardId}`}/transactions
            </span>
            , with AI highlighting risky or unusual card activity.
          </p>
        </div>
      </div>

      {/* Limit change modal (frontend-only demo) */}
      {showLimitModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={() => setShowLimitModal(false)}
        >
          <div
            className="bb-card"
            style={{ width: "100%", maxWidth: 480, padding: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bb-card-header">
              <div>
                <div className="bb-card-title">
                  Change Card Limit (Demo)
                </div>
                <div className="bb-card-subtitle">
                  In real app, this will call backend and require OTP.
                </div>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setShowLimitModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="bb-card-body">
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                  marginBottom: 8,
                }}
              >
                Current limit:{" "}
                <span style={{ color: "#e5e7eb" }}>
                  {selectedCard.limit}
                </span>
              </p>
              <div style={{ marginBottom: 10 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  New Limit (₹ per day / cycle)
                </label>
                <input
                  className="bb-input"
                  type="number"
                  placeholder="Enter new limit"
                />
              </div>
              <button
                type="button"
                className="bb-button"
                onClick={() => {
                  alert(
                    "Demo: Limit change request submitted. Backend would evaluate with AI & require OTP."
                  );
                  setShowLimitModal(false);
                }}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardsPage;
