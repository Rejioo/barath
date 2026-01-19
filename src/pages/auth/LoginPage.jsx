// src/pages/auth/LoginPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [mode, setMode] = useState("login");
  const [loginMethod, setLoginMethod] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isSignupMode = mode === "signup";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setError(null);

    try {
      const res = await api.post("/api/auth/login-step1", {
        identifier,
        password,
      });

      setMsg(
        res.data?.message ||
          "Password OK. Login OTP has been sent to your registered contact."
      );

      navigate("/otp?mode=login", {
        state: { identifier, from },
      });
    } catch (err) {
      const apiMsg =
        err.response?.data?.message || err.response?.data || err.message;
      setError(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToFullSignup = () => navigate("/register");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "var(--bb-bg)",
      }}
    >
      <div
        className="bb-card"
        style={{
          width: "100%",
          maxWidth: "900px",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          overflow: "hidden",
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            padding: "32px",
            borderRight: "1px solid var(--bb-border)",
            background: "var(--bb-surface)",
          }}
        >
          {/* BRAND ROW */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "var(--bb-primary)",
              }}
            />
            <div>
              <div style={{ fontWeight: 700 }}>barath</div>
              <div style={{ fontSize: "0.75rem", color: "var(--bb-text-muted)" }}>
                Internet Banking
              </div>
            </div>
          </div>

          {/* TOP ROW — TITLE + SWITCH */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <div style={{ fontSize: "1.3rem", fontWeight: 600 }}>
                {isSignupMode ? "Create your account" : "Welcome back"}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--bb-text-muted)" }}>
                {isSignupMode
                  ? "Open a barath account in minutes."
                  : "Sign in to continue."}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMode(isSignupMode ? "login" : "signup")}
              className="bb-button-secondary"
              style={{ padding: "6px 12px", width: "auto" }}
            >
              {isSignupMode ? "Sign in" : "Create account"}
            </button>
          </div>

          {/* API MESSAGES */}
          {msg && (
            <div
              style={{
                padding: "8px 12px",
                background: "var(--bb-primary-light)",
                border: "1px solid var(--bb-primary)",
                borderRadius: "10px",
                marginBottom: "10px",
                fontSize: "0.85rem",
                color: "var(--bb-primary)",
              }}
            >
              {msg}
            </div>
          )}

          {error && (
            <div
              style={{
                padding: "8px 12px",
                background: "#ffe4e6",
                border: "1px solid var(--bb-danger)",
                borderRadius: "10px",
                marginBottom: "10px",
                fontSize: "0.85rem",
                color: "var(--bb-danger)",
              }}
            >
              {error}
            </div>
          )}

          {/* SLIDER CONTAINER */}
          <div style={{ height: "300px", overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                width: "200%",
                height: "100%",
                transform: isSignupMode ? "translateX(-50%)" : "translateX(0)",
                transition: "0.4s ease",
              }}
            >
              {/* LOGIN PANEL */}
              <div style={{ width: "50%", paddingRight: "20px" }}>
                {/* LOGIN METHOD TABS */}
                <div className="bb-tabs" style={{ marginBottom: "16px" }}>
                  <button
                    className={`bb-tab ${
                      loginMethod === "email" ? "bb-tab-active" : ""
                    }`}
                    onClick={() => setLoginMethod("email")}
                  >
                    Email
                  </button>
                  <button
                    className={`bb-tab ${
                      loginMethod === "phone" ? "bb-tab-active" : ""
                    }`}
                    onClick={() => setLoginMethod("phone")}
                  >
                    Phone
                  </button>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="bb-field">
                    <label className="bb-label">
                      {loginMethod === "email"
                        ? "Registered Email"
                        : "Mobile Number"}
                    </label>
                    <input
                      className="bb-input"
                      type={loginMethod === "email" ? "email" : "tel"}
                      placeholder={
                        loginMethod === "email"
                          ? "you@example.com"
                          : "10-digit mobile number"
                      }
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>

                  <div className="bb-field">
                    <label className="bb-label">Password</label>
                    <input
                      className="bb-input"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bb-button"
                    disabled={loading}
                    style={{ marginTop: "10px" }}
                  >
                    {loading ? "Checking..." : "Continue Securely"}
                  </button>
                </form>
              </div>

              {/* SIGNUP PANEL */}
              <div style={{ width: "50%", paddingLeft: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      marginBottom: "6px",
                    }}
                  >
                    Open a barath account
                  </div>
                  <p className="bb-helper">
                    Digital account opening with secure KYC.
                  </p>
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: 0,
                    fontSize: "0.85rem",
                    color: "var(--bb-text-muted)",
                    marginBottom: "16px",
                  }}
                >
                  <li>• Free online account opening</li>
                  <li>• UPI, NEFT, IMPS, RTGS</li>
                  <li>• AI-powered fraud detection</li>
                </ul>

                <button
                  className="bb-button"
                  style={{ width: "100%" }}
                  onClick={handleGoToFullSignup}
                >
                  Start Full Signup →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            padding: "32px",
            background: "var(--bb-surface-alt)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "var(--bb-text-muted)",
                marginBottom: "8px",
              }}
            >
              AI Security Layer
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              Every login is risk-scored.
            </div>
            <div className="bb-helper" style={{ marginBottom: "16px" }}>
              AI monitors unusual behavior, device changes & anomalies.
            </div>

            <div className="grid-2">
              <div className="bb-card" style={{ padding: "12px" }}>
                <div className="bb-subtitle">Login Risk</div>
                <div style={{ fontWeight: 500 }}>Low • Trusted device</div>
              </div>

              <div className="bb-card" style={{ padding: "12px" }}>
                <div className="bb-subtitle">Last Alert</div>
                <div style={{ fontWeight: 500, color: "var(--bb-danger)" }}>
                  Blocked suspicious device
                </div>
              </div>
            </div>
          </div>

          <div className="bb-helper">
            Tip: Enable step-up OTP for high-value transactions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
