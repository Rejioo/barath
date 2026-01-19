import React, { useState } from "react";

const mockTickets = [
  {
    id: "TKT-2025-0001",
    subject: "UPI transaction not reflected",
    category: "Transactions",
    status: "OPEN",
    createdAt: "01 Dec 2025 · 08:30 AM",
    priority: "HIGH",
  },
  {
    id: "TKT-2025-0002",
    subject: "Unable to update PAN details",
    category: "KYC",
    status: "IN_PROGRESS",
    createdAt: "30 Nov 2025 · 05:10 PM",
    priority: "MEDIUM",
  },
];

function SupportPage() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Demo: Ticket will be created and sent to /api/support/tickets with AI triage via /api/ai/support-triage."
    );
    setSubject("");
    setCategory("General");
    setDescription("");
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {/* New ticket form */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Raise a Support Ticket</div>
            <div className="bb-card-subtitle">
              Describe your issue and our support team will get back to you.
            </div>
          </div>
        </div>
        <div className="bb-card-body">
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 10, maxWidth: 640 }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Subject
              </label>
              <input
                className="bb-input"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Explain your issue in one line"
              />
            </div>

            <div className="grid-2" style={{ gap: 10 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  Category
                </label>
                <select
                  className="bb-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>General</option>
                  <option>Transactions</option>
                  <option>UPI</option>
                  <option>Cards</option>
                  <option>KYC</option>
                  <option>Security</option>
                </select>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Description
              </label>
              <textarea
                className="bb-input"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Give detailed information about your issue..."
              />
            </div>

            <button type="submit" className="bb-button">
              Submit Ticket (demo)
            </button>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--bb-text-muted)",
              }}
            >
              In production, this will call <code>/api/support/tickets</code>.
              Backend will forward the content to{" "}
              <code>/api/ai/support-triage</code> to assign priority, tags and a
              suggested response.
            </p>
          </form>
        </div>
      </div>

      {/* Existing tickets */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div className="bb-card-title">Your Tickets</div>
          <div className="bb-card-subtitle">
            Track progress of your support requests.
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
                  <th style={{ padding: "8px 6px" }}>Ticket ID</th>
                  <th style={{ padding: "8px 6px" }}>Subject</th>
                  <th style={{ padding: "8px 6px" }}>Category</th>
                  <th style={{ padding: "8px 6px" }}>Status</th>
                  <th style={{ padding: "8px 6px" }}>Priority</th>
                  <th style={{ padding: "8px 6px" }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {mockTickets.map((t) => (
                  <tr
                    key={t.id}
                    style={{
                      borderBottom: "1px solid rgba(15,23,42,0.9)",
                    }}
                  >
                    <td style={{ padding: "8px 6px" }}>{t.id}</td>
                    <td style={{ padding: "8px 6px" }}>{t.subject}</td>
                    <td style={{ padding: "8px 6px" }}>{t.category}</td>
                    <td style={{ padding: "8px 6px" }}>{t.status}</td>
                    <td style={{ padding: "8px 6px" }}>{t.priority}</td>
                    <td style={{ padding: "8px 6px" }}>{t.createdAt}</td>
                  </tr>
                ))}
                {mockTickets.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: "10px 6px",
                        textAlign: "center",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      No tickets yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
