// src/pages/auth/OtpPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const OTP_LENGTH = 6;

const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();

  const initialMode =
    searchParams.get("mode") === "login" ? "login" : "register";
  const [mode, setMode] = useState(initialMode);

  const [identifier, setIdentifier] = useState(location.state?.identifier || "");
  const [channel, setChannel] = useState("EMAIL");

  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const [secondsLeft, setSecondsLeft] = useState(45);
  const [isResending, setIsResending] = useState(false);
  const [trustDevice, setTrustDevice] = useState(true);

  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fromAfterLogin = location.state?.from?.pathname || "/dashboard";

  // Timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  useEffect(() => {
    setMsg(null);
    setError(null);
    setOtpValues(Array(OTP_LENGTH).fill(""));
    setSecondsLeft(45);
  }, [mode]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const next = [...otpValues];
    next[index] = value.slice(-1);
    setOtpValues(next);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const formattedTimer =
    secondsLeft > 0
      ? `00:${secondsLeft.toString().padStart(2, "0")}`
      : "00:00";

  const handleResend = async () => {
    if (secondsLeft > 0 || isResending || loading) return;

    setError(null);
    setMsg(null);
    setIsResending(true);

    try {
      if (mode === "login") {
        await api.post("/api/auth/login-step1", { identifier });
        setMsg("A new login OTP has been sent.");
      } else {
        await api.post("/api/auth/resend-register-otp", {
          identifier,
          channel,
        });
        setMsg("Registration OTP sent again.");
      }
      setSecondsLeft(45);
    } catch (err) {
      setError("Failed to resend OTP. Try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otp = otpValues.join("");

    if (otp.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError(null);
    setMsg(null);

    try {
      if (mode === "register") {
        const res = await api.post("/api/auth/verify-otp", {
          identifier,
          channel,
          otp,
        });

        setMsg(
          res.data?.message ||
            "OTP verified successfully. Complete both EMAIL & SMS verification."
        );
      } else {
        const res = await api.post("/api/auth/login-step2", {
          identifier,
          channel,
          otp,
          trustDevice,
        });

        if (res.data?.accessToken) {
          login(res.data);
          navigate(fromAfterLogin, { replace: true });
          return;
        }

        setError(res.data?.message || "Invalid OTP.");
      }
    } catch (err) {
      setError("OTP verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px",
        background: "var(--bb-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* CARD */}
      <div
        className="bb-card"
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "32px 28px",
          borderRadius: "16px",
          background: "var(--bb-surface)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          border: "1px solid var(--bb-border)",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "18px" }}>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {mode === "login" ? "Verify your login" : "Complete OTP verification"}
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--bb-text-muted)" }}>
            Enter the 6-digit code sent to your registered{" "}
            <span style={{ color: "var(--bb-primary)" }}>
              {channel === "EMAIL" ? "email" : "mobile"}
            </span>
            .
          </p>
        </div>

        {/* Success / error */}
        {msg && (
          <div
            style={{
              background: "var(--bb-success-light)",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid var(--bb-success)",
              marginBottom: "12px",
              fontSize: "0.82rem",
              color: "var(--bb-success-dark)",
            }}
          >
            {msg}
          </div>
        )}

        {error && (
          <div
            style={{
              background: "var(--bb-danger-light)",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid var(--bb-danger)",
              marginBottom: "12px",
              fontSize: "0.82rem",
              color: "var(--bb-danger-dark)",
            }}
          >
            {error}
          </div>
        )}

        {/* MODE TOGGLE */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            background: "var(--bb-surface-alt)",
            padding: "6px",
            borderRadius: "12px",
            border: "1px solid var(--bb-border)",
          }}
        >
          <button
            className={mode === "register" ? "otpSelActive" : "otpSel"}
            onClick={() => setMode("register")}
          >
            Registration OTP
          </button>

          <button
            className={mode === "login" ? "otpSelActive" : "otpSel"}
            onClick={() => setMode("login")}
          >
            Login OTP
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* Identifier */}
          <div style={{ marginBottom: "14px" }}>
            <label className="bb-label">Identifier</label>
            <input
              type="text"
              className="bb-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          {/* Channel */}
          <div style={{ marginBottom: "14px" }}>
            <label className="bb-label">Channel</label>

            <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
              <label style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <input
                  type="radio"
                  name="ch"
                  checked={channel === "EMAIL"}
                  onChange={() => setChannel("EMAIL")}
                />
                Email
              </label>

              <label style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <input
                  type="radio"
                  name="ch"
                  checked={channel === "SMS"}
                  onChange={() => setChannel("SMS")}
                />
                SMS
              </label>
            </div>
          </div>

          {/* OTP BOXES */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            {otpValues.map((v, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={v}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                maxLength={1}
                className="bb-input"
                style={{
                  width: "46px",
                  height: "50px",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  borderRadius: "12px",
                }}
              />
            ))}
          </div>

          {/* Timer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "18px",
              fontSize: "0.82rem",
              color: "var(--bb-text-muted)",
            }}
          >
            <span>
              Expires in{" "}
              <b style={{ color: "var(--bb-primary)" }}>{formattedTimer}</b>
            </span>

            <button
              type="button"
              disabled={secondsLeft > 0 || loading}
              onClick={handleResend}
              style={{
                border: "none",
                background: "none",
                color:
                  secondsLeft === 0
                    ? "var(--bb-primary)"
                    : "var(--bb-text-disabled)",
                cursor: secondsLeft === 0 ? "pointer" : "not-allowed",
              }}
            >
              Resend
            </button>
          </div>

          {/* Trust device */}
          {mode === "login" && (
            <label
              style={{
                fontSize: "0.82rem",
                display: "flex",
                gap: "8px",
                alignItems: "center",
                marginBottom: "18px",
                color: "var(--bb-text-muted)",
              }}
            >
              <input
                type="checkbox"
                checked={trustDevice}
                onChange={(e) => setTrustDevice(e.target.checked)}
              />{" "}
              Trust this device for faster logins
            </label>
          )}

          {/* Submit */}
          <button
            className="bb-button"
            style={{ width: "100%", marginTop: "4px" }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        {/* security note */}
        <p
          style={{
            marginTop: "14px",
            fontSize: "0.75rem",
            color: "var(--bb-text-muted)",
          }}
        >
          Never share OTP with anyone. Bharath Bank will{" "}
          <b style={{ color: "var(--bb-danger)" }}>never</b> ask for your OTP.
        </p>
      </div>
    </div>
  );
};

export default OtpPage;
