// src/pages/auth/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

const steps = [
  "Basic Details",
  "Contact Info",
  "KYC Details",
  "Documents",
  "Review",
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    pan: "",
    aadhaar: "",
    employmentType: "",
    incomeRange: "",
    agreeTerms: false,
  });

  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    setError(null);

    if (step === 0) {
      const { fullName, username, email, phone, password } = form;
      if (!fullName || !username || !email || !phone || !password) {
        setError("Please fill all basic details before continuing.");
        return false;
      }
    } else if (step === 1) {
      const { addressLine, city, state, pincode } = form;
      if (!addressLine || !city || !state || !pincode) {
        setError("Please complete address details before continuing.");
        return false;
      }
    } else if (step === 2) {
      const { pan, aadhaar, employmentType, incomeRange } = form;
      if (!pan || !aadhaar || !employmentType || !incomeRange) {
        setError("Please fill all mandatory KYC details.");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step < steps.length - 1) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      nextStep();
      return;
    }

    if (!form.agreeTerms) {
      setError("Please agree to the Terms of Use and Privacy Policy.");
      return;
    }

    setLoading(true);
    setMsg(null);
    setError(null);

    try {
      const payload = { ...form };
      const res = await api.post("/api/auth/register", payload);

      setMsg(
        res.data?.message ||
          "Registration successful. OTPs have been sent to your email and mobile."
      );

      navigate("/otp?mode=register", {
        state: { identifier: form.email || form.phone },
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const stepTitle = steps[step];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bb-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      <div
        className="bb-card"
        style={{
          width: "100%",
          maxWidth: "960px",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          overflow: "hidden",
          background: "var(--bb-surface)",
        }}
      >
        {/* LEFT PANEL – FORM */}
        <div
          style={{
            padding: "32px 28px",
            borderRight: "1px solid var(--bb-border)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "18px",
            }}
          >
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                Open your barath account
              </div>
              <div
                style={{ fontSize: "0.85rem", color: "var(--bb-text-muted)" }}
              >
                Complete the steps below to start banking with us.
              </div>
            </div>

            <button
              type="button"
              className="bb-button-secondary"
              style={{ width: "auto", padding: "6px 14px", fontSize: "0.75rem" }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>

          {/* Messages */}
          {msg && (
            <div
              style={{
                background: "var(--bb-primary-light)",
                color: "var(--bb-primary)",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                fontSize: "0.85rem",
                border: "1px solid var(--bb-primary)",
              }}
            >
              {msg}
            </div>
          )}

          {error && (
            <div
              style={{
                background: "#ffe6e8",
                color: "var(--bb-danger)",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                fontSize: "0.85rem",
                border: "1px solid var(--bb-danger)",
              }}
            >
              {error}
            </div>
          )}

          {/* STEP INDICATOR */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ display: "flex", gap: "14px", marginBottom: "6px" }}>
              {steps.map((label, index) => {
                const active = index === step;
                const completed = index < step;
                return (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        border: "1px solid var(--bb-border)",
                        background: completed
                          ? "var(--bb-success)"
                          : active
                          ? "var(--bb-primary)"
                          : "var(--bb-surface-alt)",
                        color: completed || active ? "#fff" : "var(--bb-text-muted)",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {completed ? "✓" : index + 1}
                    </div>

                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: active
                          ? "var(--bb-primary)"
                          : "var(--bb-text-muted)",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--bb-text-muted)",
              }}
            >
              Step {step + 1} of {steps.length} — {stepTitle}
            </div>
          </div>

          {/* FORM BODY */}
          <form onSubmit={handleSubmit}>
            {/* ------------ STEP 0 ------------ */}
            {step === 0 && (
              <div style={{ display: "grid", gap: "14px" }}>
                <div>
                  <label className="bb-label">Full Name</label>
                  <input
                    className="bb-input"
                    placeholder="As per PAN/Aadhaar"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </div>

                <div>
                  <label className="bb-label">Username</label>
                  <input
                    className="bb-input"
                    placeholder="Choose username"
                    value={form.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                  />
                </div>

                <div className="grid-2">
                  <div>
                    <label className="bb-label">Email</label>
                    <input
                      className="bb-input"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="bb-label">Mobile Number</label>
                    <input
                      className="bb-input"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="bb-label">Create Password</label>
                  <input
                    className="bb-input"
                    type="password"
                    placeholder="Strong password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* ------------ STEP 1 ------------ */}
            {step === 1 && (
              <div style={{ display: "grid", gap: "14px" }}>
                <div>
                  <label className="bb-label">Address</label>
                  <input
                    className="bb-input"
                    placeholder="House, Street, Area"
                    value={form.addressLine}
                    onChange={(e) => handleChange("addressLine", e.target.value)}
                  />
                </div>

                <div className="grid-3">
                  <div>
                    <label className="bb-label">City</label>
                    <input
                      className="bb-input"
                      value={form.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="bb-label">State</label>
                    <input
                      className="bb-input"
                      value={form.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="bb-label">PIN Code</label>
                    <input
                      className="bb-input"
                      value={form.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ------------ STEP 2 ------------ */}
            {step === 2 && (
              <div style={{ display: "grid", gap: "14px" }}>
                <div className="grid-2">
                  <div>
                    <label className="bb-label">PAN</label>
                    <input
                      className="bb-input"
                      value={form.pan}
                      onChange={(e) =>
                        handleChange("pan", e.target.value.toUpperCase())
                      }
                    />
                  </div>

                  <div>
                    <label className="bb-label">Aadhaar</label>
                    <input
                      className="bb-input"
                      value={form.aadhaar}
                      onChange={(e) => handleChange("aadhaar", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div>
                    <label className="bb-label">Employment Type</label>
                    <select
                      className="bb-input"
                      value={form.employmentType}
                      onChange={(e) =>
                        handleChange("employmentType", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self employed</option>
                      <option value="student">Student</option>
                      <option value="retired">Retired</option>
                    </select>
                  </div>

                  <div>
                    <label className="bb-label">Annual Income</label>
                    <select
                      className="bb-input"
                      value={form.incomeRange}
                      onChange={(e) =>
                        handleChange("incomeRange", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="0-2">Below ₹2L</option>
                      <option value="2-5">₹2L – ₹5L</option>
                      <option value="5-10">₹5L – ₹10L</option>
                      <option value="10-25">₹10L – ₹25L</option>
                      <option value="25+">Above ₹25L</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ------------ STEP 3 ------------ */}
            {step === 3 && (
              <div style={{ display: "grid", gap: "14px" }}>
                <p className="bb-helper">
                  Uploads are placeholders for this prototype.
                </p>

                <div className="grid-2">
                  <div>
                    <label className="bb-label">PAN Document</label>
                    <input className="bb-input" type="file" />
                  </div>

                  <div>
                    <label className="bb-label">Aadhaar / ID Proof</label>
                    <input className="bb-input" type="file" />
                  </div>
                </div>

                <div>
                  <label className="bb-label">Address Proof</label>
                  <input className="bb-input" type="file" />
                </div>
              </div>
            )}

            {/* ------------ STEP 4 ------------ */}
            {step === 4 && (
              <div style={{ display: "grid", gap: "14px" }}>
                <p className="bb-helper">
                  Review your details before submitting.
                </p>

                <div className="grid-2">
                  <div className="bb-card" style={{ padding: "12px" }}>
                    <div className="bb-card-title">Personal</div>
                    <div>Name: {form.fullName}</div>
                    <div>Email: {form.email}</div>
                    <div>Phone: {form.phone}</div>
                    <div>Username: {form.username}</div>
                  </div>

                  <div className="bb-card" style={{ padding: "12px" }}>
                    <div className="bb-card-title">Address</div>
                    <div>{form.addressLine}</div>
                    <div>
                      {form.city}, {form.state} {form.pincode}
                    </div>
                  </div>
                </div>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.85rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) =>
                      handleChange("agreeTerms", e.target.checked)
                    }
                  />
                  I agree to the Terms of Use & Privacy Policy.
                </label>
              </div>
            )}

            {/* FOOTER BUTTONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
              }}
            >
              <button
                type="button"
                disabled={step === 0}
                onClick={prevStep}
                className="bb-button-secondary"
                style={{
                  opacity: step === 0 ? 0.5 : 1,
                  width: "120px",
                }}
              >
                Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  className="bb-button"
                  onClick={nextStep}
                  disabled={loading}
                  style={{ width: "160px" }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  className="bb-button"
                  disabled={loading}
                  style={{ width: "200px" }}
                >
                  {loading ? "Creating..." : "Submit & Create Account"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT SIDE PANEL */}
        <div
          style={{
            padding: "32px 24px",
            background: "var(--bb-surface-alt)",
            borderLeft: "1px solid var(--bb-border)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--bb-text-muted)",
                marginBottom: "10px",
              }}
            >
              Why barath?
            </div>

            <ul
              style={{
                listStyle: "none",
                paddingLeft: "0",
                fontSize: "0.85rem",
                color: "var(--bb-text-muted)",
                marginBottom: "16px",
              }}
            >
              <li>• AI-powered fraud detection</li>
              <li>• Instant UPI, NEFT, IMPS</li>
              <li>• Smart savings insights</li>
              <li>• Manage all accounts in one place</li>
            </ul>
          </div>

          <div className="bb-helper">
            KYC is verified using our AI OCR engine after submission.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
