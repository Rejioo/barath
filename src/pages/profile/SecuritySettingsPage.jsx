import React, { useState } from "react";

const initialSecuritySettings = {
  otpForLogin: true,
  otpForHighValue: true,
  otpForAllTransfers: false,
  newDeviceAlerts: true,
  sessionTimeoutMinutes: 15,
};

const mockTrustedDevices = [
  {
    id: "dev-1",
    name: "Chrome on Windows 10",
    location: "Chennai, India",
    lastUsed: "01 Dec 2025 · 08:45 AM",
    trustedOn: "15 Oct 2025",
    current: true,
  },
  {
    id: "dev-2",
    name: "Chrome on Android",
    location: "Bengaluru, India",
    lastUsed: "28 Nov 2025 · 09:12 PM",
    trustedOn: "10 Nov 2025",
    current: false,
  },
];

const mockActiveSessions = [
  {
    id: "sess-1",
    deviceName: "Chrome on Windows 10",
    ipMasked: "122.***.***.101",
    location: "Chennai, India",
    startedAt: "01 Dec 2025 · 08:10 AM",
    lastActivity: "01 Dec 2025 · 08:45 AM",
    current: true,
  },
  {
    id: "sess-2",
    deviceName: "Chrome on Android",
    ipMasked: "49.***.***.23",
    location: "Bengaluru, India",
    startedAt: "30 Nov 2025 · 10:22 PM",
    lastActivity: "30 Nov 2025 · 10:45 PM",
    current: false,
  },
];

function SecuritySettingsPage() {
  const [settings, setSettings] = useState(initialSecuritySettings);
  const [saving, setSaving] = useState(false);

  const handleToggle = (field) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangeTimeout = (value) => {
    const num = Number(value);
    if (!Number.isNaN(num)) {
      setSettings((prev) => ({ ...prev, sessionTimeoutMinutes: num }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);

    // TODO later: PUT /api/settings/security
    console.log("Security settings save:", settings);

    setTimeout(() => {
      setSaving(false);
      alert(
        "Demo: Security settings saved locally. In real app this will update backend and audit log."
      );
    }, 600);
  };

  const handleRevokeDevice = (deviceId) => {
    // TODO: call backend to revoke trust on device
    alert(
      `Demo: Trust revoked for device ${deviceId}. Real app will require OTP for next login from this device.`
    );
  };

  const handleLogoutSession = (sessionId) => {
    // TODO: call backend to kill session
    alert(
      `Demo: Session ${sessionId} logged out. Real app will invalidate token & log this in audit trail.`
    );
  };

  const handleLogoutAll = () => {
    // TODO: call backend to logout all sessions
    alert(
      "Demo: All sessions logged out. In real app this will revoke all tokens and keep only current session (if desired)."
    );
  };

  return (
    <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
      {/* LEFT: security config */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Security & Login</div>
            <div className="bb-card-subtitle">
              Configure OTP, high-value transfer security and session timeout.
            </div>
          </div>
          <span className="bb-badge bb-badge-primary">Secure</span>
        </div>

        <div className="bb-card-body">
          <form onSubmit={handleSave} style={{ display: "grid", gap: 12 }}>
            {/* OTP for login */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: 2,
                  }}
                >
                  OTP for Login
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  Require OTP on every login, even from trusted devices.
                </div>
              </div>
              <button
                type="button"
                className="bb-button bb-button-secondary"
                style={{ fontSize: "0.78rem" }}
                onClick={() => handleToggle("otpForLogin")}
              >
                {settings.otpForLogin ? "Enabled" : "Disabled"}
              </button>
            </div>

            {/* OTP for high value */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: 2,
                  }}
                >
                  OTP for High-Value Transfers
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  Always require OTP for transfers above your bank-defined
                  threshold.
                </div>
              </div>
              <button
                type="button"
                className="bb-button bb-button-secondary"
                style={{ fontSize: "0.78rem" }}
                onClick={() => handleToggle("otpForHighValue")}
              >
                {settings.otpForHighValue ? "Enabled" : "Disabled"}
              </button>
            </div>

            {/* OTP for all transfers */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: 2,
                  }}
                >
                  OTP for All Transfers
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  If enabled, even low-value internal transfers will require OTP.
                </div>
              </div>
              <button
                type="button"
                className="bb-button bb-button-secondary"
                style={{ fontSize: "0.78rem" }}
                onClick={() => handleToggle("otpForAllTransfers")}
              >
                {settings.otpForAllTransfers ? "Enabled" : "Disabled"}
              </button>
            </div>

            {/* new device alerts */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: 2,
                  }}
                >
                  New Device Alerts
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  Send alerts when your account is accessed from a new device or
                  location.
                </div>
              </div>
              <button
                type="button"
                className="bb-button bb-button-secondary"
                style={{ fontSize: "0.78rem" }}
                onClick={() => handleToggle("newDeviceAlerts")}
              >
                {settings.newDeviceAlerts ? "Enabled" : "Disabled"}
              </button>
            </div>

            {/* session timeout */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Session Timeout (minutes)
              </label>
              <input
                className="bb-input"
                type="number"
                min="5"
                step="5"
                value={settings.sessionTimeoutMinutes}
                onChange={(e) => handleChangeTimeout(e.target.value)}
              />
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--bb-text-muted)",
                  marginTop: 4,
                }}
              >
                Your session will auto-logout after a period of inactivity to
                protect your account.
              </p>
            </div>

            <button
              type="submit"
              className="bb-button"
              disabled={saving}
              style={{ marginTop: 4 }}
            >
              {saving ? "Saving..." : "Save Security Settings"}
            </button>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--bb-text-muted)",
              }}
            >
              These preferences will be enforced by the backend during login and
              transaction flows, combined with AI-driven risk scoring.
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT: trusted devices + active sessions */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Devices & Sessions</div>
            <div className="bb-card-subtitle">
              Manage trusted devices and active sessions.
            </div>
          </div>
          <button
            type="button"
            className="bb-button bb-button-secondary"
            style={{ fontSize: "0.8rem" }}
            onClick={handleLogoutAll}
          >
            Logout All Sessions
          </button>
        </div>

        <div className="bb-card-body" style={{ display: "grid", gap: 14 }}>
          {/* Trusted devices */}
          <div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--bb-text-muted)",
                marginBottom: 6,
              }}
            >
              Trusted Devices
            </div>
            <div
              style={{
                display: "grid",
                gap: 8,
              }}
            >
              {mockTrustedDevices.map((dev) => (
                <div
                  key={dev.id}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid rgba(31,41,55,0.9)",
                    background: "rgba(15,23,42,0.95)",
                    fontSize: "0.8rem",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <div>
                    <div>{dev.name}</div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      {dev.location}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      Trusted on: {dev.trustedOn}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      Last used: {dev.lastUsed}
                    </div>
                    {dev.current && (
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "#bbf7d0",
                          marginTop: 2,
                        }}
                      >
                        ✓ This device (current session)
                      </div>
                    )}
                  </div>
                  <div style={{ alignSelf: "center" }}>
                    {!dev.current && (
                      <button
                        type="button"
                        className="bb-button bb-button-secondary"
                        style={{ fontSize: "0.75rem" }}
                        onClick={() => handleRevokeDevice(dev.id)}
                      >
                        Revoke Trust
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {mockTrustedDevices.length === 0 && (
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  No trusted devices yet. Devices can be marked as trusted after
                  successful OTP verification.
                </p>
              )}
            </div>
          </div>

          {/* Active sessions */}
          <div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--bb-text-muted)",
                marginBottom: 6,
              }}
            >
              Active Sessions
            </div>
            <div
              style={{
                display: "grid",
                gap: 8,
              }}
            >
              {mockActiveSessions.map((sess) => (
                <div
                  key={sess.id}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid rgba(31,41,55,0.9)",
                    background: "rgba(15,23,42,0.95)",
                    fontSize: "0.8rem",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <div>
                    <div>{sess.deviceName}</div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      IP: {sess.ipMasked} · {sess.location}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      Started: {sess.startedAt}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      Last activity: {sess.lastActivity}
                    </div>
                    {sess.current && (
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "#bbf7d0",
                          marginTop: 2,
                        }}
                      >
                        ✓ Current session
                      </div>
                    )}
                  </div>
                  <div style={{ alignSelf: "center" }}>
                    {!sess.current && (
                      <button
                        type="button"
                        className="bb-button bb-button-secondary"
                        style={{ fontSize: "0.75rem" }}
                        onClick={() => handleLogoutSession(sess.id)}
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {mockActiveSessions.length === 0 && (
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  No other active sessions found.
                </p>
              )}
            </div>
          </div>

          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--bb-text-muted)",
            }}
          >
            Device fingerprint, IP hash and login risk scores are calculated on
            the backend and stored in audit logs to protect your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettingsPage;
