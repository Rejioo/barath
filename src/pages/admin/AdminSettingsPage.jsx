import React, { useState } from "react";

const initialFraudConfig = {
  highRiskThreshold: 0.8,
  mediumRiskThreshold: 0.6,
  autoHoldAmount: 100000, // ₹
  alwaysOtpAboveAmount: 50000,
  applyToChannels: {
    UPI: true,
    NETBANKING: true,
    RTGS: true,
    CARD: true,
  },
};

const initialOtpConfig = {
  otpLength: 6,
  expiryMinutes: 5,
  maxAttempts: 3,
  loginMfaRequired: true,
  highValueTransferOtp: true,
  newDeviceOtp: true,
  emailChannelEnabled: true,
  smsChannelEnabled: true,
};

const initialAiConfig = {
  fraudEngineEnabled: true,
  loginRiskEnabled: true,
  spendInsightsEnabled: true,
  kycOcrEnabled: true,
  supportTriageEnabled: true,
  refreshMinutes: 15,
};

const initialBillers = [
  {
    id: "BILLER-001",
    name: "Electricity Board",
    category: "Electricity",
    enabled: true,
  },
  {
    id: "BILLER-002",
    name: "Water Supply Corporation",
    category: "Water",
    enabled: true,
  },
  {
    id: "BILLER-003",
    name: "FiberNet Broadband",
    category: "Internet",
    enabled: false,
  },
];

function AdminSettingsPage() {
  const [fraudConfig, setFraudConfig] = useState(initialFraudConfig);
  const [otpConfig, setOtpConfig] = useState(initialOtpConfig);
  const [aiConfig, setAiConfig] = useState(initialAiConfig);
  const [billers, setBillers] = useState(initialBillers);

  const handleFraudFieldChange = (field, value) => {
    setFraudConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFraudChannelToggle = (channel) => {
    setFraudConfig((prev) => ({
      ...prev,
      applyToChannels: {
        ...prev.applyToChannels,
        [channel]: !prev.applyToChannels[channel],
      },
    }));
  };

  const handleOtpFieldChange = (field, value) => {
    setOtpConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAiFieldChange = (field, value) => {
    setAiConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleBiller = (id) => {
    setBillers((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              enabled: !b.enabled,
            }
          : b
      )
    );
  };

  const handleSaveAll = () => {
    // later: call /api/admin/settings/* endpoints
    alert(
      "Demo: Settings saved. In real app, this will send payloads to /api/admin/settings/fraud, /otp, /ai, /billers and write audit logs."
    );
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {/* Header + global save */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Configuration & Settings</div>
            <div className="bb-card-subtitle">
              Manage fraud thresholds, OTP rules, AI modules and billers.
            </div>
          </div>
          <button
            type="button"
            className="bb-button"
            style={{ fontSize: "0.85rem" }}
            onClick={handleSaveAll}
          >
            Save All Changes
          </button>
        </div>
        <div className="bb-card-body">
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--bb-text-muted)",
            }}
          >
            These settings are usually stored in configuration tables (e.g.
            <code>fraud_config</code>, <code>otp_config</code>,{" "}
            <code>ai_config</code>, <code>biller</code>) and cached by the
            backend. Every change is audited.
          </p>
        </div>
      </div>

      {/* 2-column grid: fraud + OTP / AI + billers */}
      <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
        {/* Left column: Fraud & OTP */}
        <div style={{ display: "grid", gap: 18 }}>
          {/* Fraud configuration */}
          <div className="bb-card">
            <div className="bb-card-header">
              <div>
                <div className="bb-card-title">Fraud Risk Configuration</div>
                <div className="bb-card-subtitle">
                  Thresholds and OTP rules for risky transactions.
                </div>
              </div>
            </div>
            <div className="bb-card-body">
              <div className="grid-2" style={{ gap: 10 }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      marginBottom: 4,
                    }}
                  >
                    High Risk Threshold
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--bb-text-muted)",
                        marginLeft: 4,
                      }}
                    >
                      (0.0 - 1.0)
                    </span>
                  </label>
                  <input
                    className="bb-input"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={fraudConfig.highRiskThreshold}
                    onChange={(e) =>
                      handleFraudFieldChange(
                        "highRiskThreshold",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bb-text-muted)",
                      marginTop: 2,
                    }}
                  >
                    Transactions with fraud score ≥ this value are considered
                    HIGH risk.
                  </p>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      marginBottom: 4,
                    }}
                  >
                    Medium Risk Threshold
                  </label>
                  <input
                    className="bb-input"
                    type="number"
                    step="0.01"
                    min="0"
                    max={fraudConfig.highRiskThreshold}
                    value={fraudConfig.mediumRiskThreshold}
                    onChange={(e) =>
                      handleFraudFieldChange(
                        "mediumRiskThreshold",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bb-text-muted)",
                      marginTop: 2,
                    }}
                  >
                    Fraud score between MEDIUM and HIGH thresholds triggers
                    extra monitoring.
                  </p>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      marginBottom: 4,
                    }}
                  >
                    Auto-Hold Amount (₹)
                  </label>
                  <input
                    className="bb-input"
                    type="number"
                    min="0"
                    value={fraudConfig.autoHoldAmount}
                    onChange={(e) =>
                      handleFraudFieldChange(
                        "autoHoldAmount",
                        parseInt(e.target.value || "0", 10)
                      )
                    }
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bb-text-muted)",
                      marginTop: 2,
                    }}
                  >
                    HIGH risk transactions above this amount may be held for
                    manual review.
                  </p>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      marginBottom: 4,
                    }}
                  >
                    Mandatory OTP Above (₹)
                  </label>
                  <input
                    className="bb-input"
                    type="number"
                    min="0"
                    value={fraudConfig.alwaysOtpAboveAmount}
                    onChange={(e) =>
                      handleFraudFieldChange(
                        "alwaysOtpAboveAmount",
                        parseInt(e.target.value || "0", 10)
                      )
                    }
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--bb-text-muted)",
                      marginTop: 2,
                    }}
                  >
                    Any transfer above this amount always requires OTP
                    regardless of risk score.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--bb-text-muted)",
                    marginBottom: 4,
                  }}
                >
                  Channels Covered
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    fontSize: "0.8rem",
                  }}
                >
                  {Object.keys(fraudConfig.applyToChannels).map((ch) => (
                    <label
                      key={ch}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 8px",
                        borderRadius: 999,
                        border: "1px solid rgba(31,41,55,0.9)",
                        background: "rgba(15,23,42,0.95)",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={fraudConfig.applyToChannels[ch]}
                        onChange={() => handleFraudChannelToggle(ch)}
                      />
                      <span>{ch}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* OTP configuration */}
          <div className="bb-card">
            <div className="bb-card-header">
              <div>
                <div className="bb-card-title">OTP & MFA Rules</div>
                <div className="bb-card-subtitle">
                  Control OTP length, expiry and when MFA is required.
                </div>
              </div>
            </div>
            <div className="bb-card-body">
              <div className="grid-3" style={{ gap: 10 }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      marginBottom: 4,
                    }}
                  >
                    OTP Length
                  </label>
                  <input
                    className="bb-input"
                    type="number"
                    min="4"
                    max="8"
                    value={otpConfig.otpLength}
                    onChange={(e) =>
                      handleOtpFieldChange(
                        "otpLength",
                        parseInt(e.target.value || "0", 10)
                      )
                    }
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
                    Expiry (minutes)
                  </label>
                  <input
                    className="bb-input"
                    type="number"
                    min="1"
                    max="15"
                    value={otpConfig.expiryMinutes}
                    onChange={(e) =>
                      handleOtpFieldChange(
                        "expiryMinutes",
                        parseInt(e.target.value || "0", 10)
                      )
                    }
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
                    Max Attempts
                  </label>
                  <input
                    className="bb-input"
                    type="number"
                    min="1"
                    max="10"
                    value={otpConfig.maxAttempts}
                    onChange={(e) =>
                      handleOtpFieldChange(
                        "maxAttempts",
                        parseInt(e.target.value || "0", 10)
                      )
                    }
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 6,
                  marginTop: 12,
                  fontSize: "0.8rem",
                }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={otpConfig.loginMfaRequired}
                    onChange={(e) =>
                      handleOtpFieldChange("loginMfaRequired", e.target.checked)
                    }
                  />
                  <span>Require OTP after password for every login</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={otpConfig.highValueTransferOtp}
                    onChange={(e) =>
                      handleOtpFieldChange(
                        "highValueTransferOtp",
                        e.target.checked
                      )
                    }
                  />
                  <span>Require OTP for high-value / unusual transfers</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={otpConfig.newDeviceOtp}
                    onChange={(e) =>
                      handleOtpFieldChange("newDeviceOtp", e.target.checked)
                    }
                  />
                  <span>Always require OTP on new devices/browsers</span>
                </label>
              </div>

              <div
                style={{
                  marginTop: 12,
                  fontSize: "0.8rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--bb-text-muted)",
                    marginBottom: 4,
                  }}
                >
                  Channels
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={otpConfig.emailChannelEnabled}
                      onChange={(e) =>
                        handleOtpFieldChange(
                          "emailChannelEnabled",
                          e.target.checked
                        )
                      }
                    />
                    <span>Email OTP</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={otpConfig.smsChannelEnabled}
                      onChange={(e) =>
                        handleOtpFieldChange(
                          "smsChannelEnabled",
                          e.target.checked
                        )
                      }
                    />
                    <span>SMS OTP</span>
                  </label>
                </div>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                    marginTop: 8,
                  }}
                >
                  These map to the <code>otp_tokens</code> and{" "}
                  <code>notification</code> services in the backend. Disabling a
                  channel will prevent generation/sending via that medium.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: AI config + billers */}
        <div style={{ display: "grid", gap: 18 }}>
          {/* AI modules configuration */}
          <div className="bb-card">
            <div className="bb-card-header">
              <div>
                <div className="bb-card-title">AI Modules</div>
                <div className="bb-card-subtitle">
                  Enable/disable AI engines and set refresh intervals.
                </div>
              </div>
              <span className="bb-badge bb-badge-primary">AI</span>
            </div>

            <div className="bb-card-body">
              <div
                style={{
                  display: "grid",
                  gap: 6,
                  fontSize: "0.8rem",
                }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={aiConfig.fraudEngineEnabled}
                    onChange={(e) =>
                      handleAiFieldChange(
                        "fraudEngineEnabled",
                        e.target.checked
                      )
                    }
                  />
                  <span>Fraud Detection Engine</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={aiConfig.loginRiskEnabled}
                    onChange={(e) =>
                      handleAiFieldChange("loginRiskEnabled", e.target.checked)
                    }
                  />
                  <span>Login Risk Scoring</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={aiConfig.spendInsightsEnabled}
                    onChange={(e) =>
                      handleAiFieldChange(
                        "spendInsightsEnabled",
                        e.target.checked
                      )
                    }
                  />
                  <span>Spending Insights & Categorisation</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={aiConfig.kycOcrEnabled}
                    onChange={(e) =>
                      handleAiFieldChange("kycOcrEnabled", e.target.checked)
                    }
                  />
                  <span>KYC OCR & Matching</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={aiConfig.supportTriageEnabled}
                    onChange={(e) =>
                      handleAiFieldChange(
                        "supportTriageEnabled",
                        e.target.checked
                      )
                    }
                  />
                  <span>Support Ticket Triage</span>
                </label>
              </div>

              <div style={{ marginTop: 12 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  Refresh Interval (minutes)
                </label>
                <input
                  className="bb-input"
                  type="number"
                  min="5"
                  max="60"
                  value={aiConfig.refreshMinutes}
                  onChange={(e) =>
                    handleAiFieldChange(
                      "refreshMinutes",
                      parseInt(e.target.value || "0", 10)
                    )
                  }
                />
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                    marginTop: 4,
                  }}
                >
                  How often the backend fetches AI summaries for admin
                  dashboards, fraud console and support analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Billers configuration */}
          <div className="bb-card">
            <div className="bb-card-header">
              <div>
                <div className="bb-card-title">Billers & Payments</div>
                <div className="bb-card-subtitle">
                  Enable/disable billers and categories for the customer portal.
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
                      <th style={{ padding: "8px 6px" }}>Biller ID</th>
                      <th style={{ padding: "8px 6px" }}>Name</th>
                      <th style={{ padding: "8px 6px" }}>Category</th>
                      <th style={{ padding: "8px 6px" }}>Status</th>
                      <th style={{ padding: "8px 6px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billers.map((b) => (
                      <tr
                        key={b.id}
                        style={{
                          borderBottom: "1px solid rgba(15,23,42,0.9)",
                        }}
                      >
                        <td style={{ padding: "8px 6px" }}>{b.id}</td>
                        <td style={{ padding: "8px 6px" }}>{b.name}</td>
                        <td style={{ padding: "8px 6px" }}>{b.category}</td>
                        <td style={{ padding: "8px 6px" }}>
                          <span
                            className={
                              b.enabled
                                ? "bb-badge bb-badge-success"
                                : "bb-badge bb-badge-danger"
                            }
                          >
                            {b.enabled ? "Enabled" : "Disabled"}
                          </span>
                        </td>
                        <td style={{ padding: "8px 6px" }}>
                          <button
                            type="button"
                            className="bb-button bb-button-secondary"
                            style={{ fontSize: "0.75rem", padding: "4px 8px" }}
                            onClick={() => handleToggleBiller(b.id)}
                          >
                            {b.enabled ? "Disable" : "Enable"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {billers.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          style={{
                            padding: "10px 6px",
                            textAlign: "center",
                            color: "var(--bb-text-muted)",
                          }}
                        >
                          No billers configured yet.
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
                Biller configuration is stored in <code>biller</code> table and
                used by the <code>/api/bills/*</code> endpoints to show options
                on the customer Bills & Payments page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsPage;
