import React, { useState, useEffect } from "react";

/**
 * ReAuthModal
 *
 * Props:
 * - open: boolean
 * - mode: "password" | "otp"
 * - title?: string
 * - description?: string
 * - maskedDestination?: string (for otp mode, e.g. "****@gmail.com" or "+91 98XXXXXX45")
 * - loading?: boolean
 * - onClose: () => void
 * - onConfirm: (payload: { mode: string; value: string }) => void
 */
function ReAuthModal({
  open,
  mode = "password",
  title,
  description,
  maskedDestination,
  loading = false,
  onClose,
  onConfirm,
}) {
  const [value, setValue] = useState("");
  const [resent, setResent] = useState(false);
  const [counter, setCounter] = useState(30); // resend timer

  useEffect(() => {
    if (!open) {
      setValue("");
      setResent(false);
      setCounter(30);
      return;
    }

    if (mode === "otp") {
      setCounter(30);
      setResent(false);
    }
  }, [open, mode]);

  useEffect(() => {
    if (!open || mode !== "otp") return;
    if (counter <= 0) return;

    const t = setTimeout(() => setCounter((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [counter, open, mode]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      alert(mode === "password" ? "Please enter your password." : "Please enter the OTP.");
      return;
    }
    onConfirm?.({ mode, value });
  };

  const handleResend = () => {
    if (counter > 0) return;
    // TODO later: call backend /api/auth/resend-otp
    setResent(true);
    setCounter(30);
    alert("Demo: OTP resend requested. Real app will send OTP via email/SMS.");
  };

  const defaultTitle =
    mode === "password" ? "Confirm with Password" : "Confirm with OTP";
  const defaultDescription =
    mode === "password"
      ? "For your security, please re-enter your password to proceed."
      : "Enter the OTP sent to your registered contact.";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.8)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        className="bb-card"
        style={{
          width: "100%",
          maxWidth: 480,
          padding: 18,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">{title || defaultTitle}</div>
            <div className="bb-card-subtitle">
              {description || defaultDescription}
            </div>
          </div>
          <button type="button" className="icon-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="bb-card-body">
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 12, fontSize: "0.85rem" }}
          >
            {mode === "password" && (
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  Password
                </label>
                <input
                  className="bb-input"
                  type="password"
                  placeholder="Enter your password"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            {mode === "otp" && (
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  One Time Password
                </label>
                <input
                  className="bb-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit OTP"
                  value={value}
                  onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                />
                {maskedDestination && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bb-text-muted)",
                      marginTop: 4,
                    }}
                  >
                    Sent to: <span style={{ color: "#bfdbfe" }}>{maskedDestination}</span>
                  </p>
                )}
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                    marginTop: 4,
                  }}
                >
                  Didn&apos;t receive OTP?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={counter > 0}
                    style={{
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      margin: 0,
                      color: counter > 0 ? "#6b7280" : "#bfdbfe",
                      cursor: counter > 0 ? "not-allowed" : "pointer",
                      textDecoration: counter > 0 ? "none" : "underline",
                      fontSize: "0.75rem",
                    }}
                  >
                    Resend
                  </button>{" "}
                  {counter > 0 && <span>in {counter}s</span>}
                  {resent && counter > 0 && (
                    <span style={{ marginLeft: 4, color: "#bbf7d0" }}>
                      OTP resent
                    </span>
                  )}
                </p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                marginTop: 6,
              }}
            >
              <button
                type="button"
                className="bb-button bb-button-secondary"
                onClick={onClose}
                disabled={loading}
                style={{ fontSize: "0.8rem" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bb-button"
                disabled={loading}
                style={{ fontSize: "0.8rem" }}
              >
                {loading ? "Verifying..." : "Confirm"}
              </button>
            </div>

            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--bb-text-muted)",
                marginTop: 4,
              }}
            >
              For sensitive actions (card limits, high-value transfers,
              contact changes), the server will verify your password/OTP and
              only then proceed.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReAuthModal;
