import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.5fr)",
          gap: "32px",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid rgba(59,130,246,0.7)",
              background: "rgba(15,23,42,0.9)",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background:
                  "radial-gradient(circle, #22c55e, #16a34a, #16a34a)",
              }}
            />
            <span style={{ fontSize: "0.75rem", color: "#bfdbfe" }}>
              AI-powered fraud shield • 24×7 secure banking
            </span>
          </div>

          <h1
            style={{
              fontSize: "2.4rem",
              lineHeight: 1.2,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Secure Banking, <br />
            <span style={{ color: "var(--bb-accent)" }}>
              Made Simple & Intelligent.
            </span>
          </h1>

          <p
            style={{
              fontSize: "0.98rem",
              color: "var(--bb-text-muted)",
              maxWidth: 520,
              marginBottom: 22,
            }}
          >
            Welcome to barath – a modern internet banking experience with
            AI-powered fraud detection, deep spend analytics, multi-factor
            security, and smooth payments across accounts, UPI, bills and more.
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
            <Link to="/register" className="bb-button">
              Open an Account
              <span>→</span>
            </Link>
            <Link to="/login" className="bb-button bb-button-secondary">
              Sign In
            </Link>
          </div>

          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--bb-text-muted)",
            }}
          >
            Trusted device recognition, OTP on high-risk actions, and AI risk
            scoring keep your money safe.
          </p>
        </div>

        {/* Right side highlight card */}
        <div>
          <div className="bb-card">
            <div className="bb-card-header">
              <div>
                <div className="bb-card-title">Live Snapshot</div>
                <div className="bb-card-subtitle">
                  A glimpse of your barath dashboard
                </div>
              </div>
              <span className="bb-badge bb-badge-primary">Preview</span>
            </div>

            <div className="bb-card-body">
              <div className="grid-2" style={{ marginBottom: 12 }}>
                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bb-text-muted)",
                      marginBottom: 4,
                    }}
                  >
                    Total Balance
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                    ₹ 4,52,380.75
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
                    Monthly Spend
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 500 }}>
                    ₹ 83,240
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginBottom: 14,
                  padding: "10px 12px",
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(15,23,42,0.95))",
                  border: "1px solid rgba(37,99,235,0.7)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#bfdbfe",
                    marginBottom: 6,
                  }}
                >
                  AI Insight
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--bb-text-main)",
                  }}
                >
                  Your{" "}
                  <span style={{ color: "#fde68a" }}>travel spending</span> is{" "}
                  <strong>18% higher</strong> than last month. Consider setting
                  a smart budget in the dashboard.
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid rgba(51,65,85,0.9)",
                    background: "rgba(15,23,42,0.95)",
                  }}
                >
                  <div style={{ color: "var(--bb-text-muted)", marginBottom: 4 }}>
                    Savings A/C
                  </div>
                  <div style={{ fontWeight: 500 }}>₹ 2,10,500</div>
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid rgba(51,65,85,0.9)",
                    background: "rgba(15,23,42,0.95)",
                  }}
                >
                  <div style={{ color: "var(--bb-text-muted)", marginBottom: 4 }}>
                    Current A/C
                  </div>
                  <div style={{ fontWeight: 500 }}>₹ 1,88,200</div>
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid rgba(51,65,85,0.9)",
                    background: "rgba(15,23,42,0.95)",
                  }}
                >
                  <div style={{ color: "var(--bb-text-muted)", marginBottom: 4 }}>
                    Credit Card Due
                  </div>
                  <div style={{ fontWeight: 500, color: "#fca5a5" }}>₹ 53,680</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 16 }}>
          Why bank with <span style={{ color: "var(--bb-accent)" }}>barath</span>?
        </h2>

        <div className="grid-3">
          <div className="bb-card">
            <div className="bb-card-title">AI Fraud Shield</div>
            <div className="bb-card-body">
              <p style={{ fontSize: "0.85rem", color: "var(--bb-text-muted)" }}>
                Every login and transaction is analysed by our AI risk engine to
                detect unusual patterns and protect you from fraud.
              </p>
            </div>
          </div>

          <div className="bb-card">
            <div className="bb-card-title">Powerful Payments</div>
            <div className="bb-card-body">
              <p style={{ fontSize: "0.85rem", color: "var(--bb-text-muted)" }}>
                UPI, NEFT, IMPS, RTGS, bill payments, recharges and standing
                instructions – all in a single seamless interface.
              </p>
            </div>
          </div>

          <div className="bb-card">
            <div className="bb-card-title">Deep Spend Analytics</div>
            <div className="bb-card-body">
              <p style={{ fontSize: "0.85rem", color: "var(--bb-text-muted)" }}>
                Visualise where your money goes each month, get category-wise
                breakdowns, and AI-driven nudges to save more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          paddingTop: 20,
          borderTop: "1px solid rgba(15,23,42,0.85)",
          fontSize: "0.75rem",
          color: "var(--bb-text-muted)",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>© {new Date().getFullYear()} barath. All rights reserved.</div>
        <div style={{ display: "flex", gap: 12 }}>
          <span>Security</span>
          <span>Privacy</span>
          <span>Contact</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
