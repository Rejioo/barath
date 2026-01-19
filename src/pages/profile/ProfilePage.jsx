import React, { useState } from "react";

const initialProfile = {
  fullName: "Sakthi Paramesh",
  customerId: "BBNK00123456",
  email: "sakthi@example.com",
  phone: "+91 98XXXXXX45",
  dob: "1999-08-15",
  addressLine1: "No. 10, Bharath Nagar",
  addressLine2: "Near City Bus Stand",
  city: "Chennai",
  state: "Tamil Nadu",
  pincode: "600001",
  communicationPreference: "EMAIL", // EMAIL | SMS | BOTH
};

function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    // TODO later: PUT /api/profile
    console.log("Profile save:", profile);

    setTimeout(() => {
      setSaving(false);
      alert("Demo: Profile saved locally. In real app this will update backend.");
    }, 600);
  };

  return (
    <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
      {/* LEFT: basic profile + form */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Profile</div>
            <div className="bb-card-subtitle">
              View and update your basic details.
            </div>
          </div>
          <span className="bb-badge">Customer ID: {profile.customerId}</span>
        </div>

        <div className="bb-card-body">
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 12, fontSize: "0.85rem" }}
          >
            {/* Name + DOB */}
            <div className="grid-2">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  Full Name
                </label>
                <input
                  className="bb-input"
                  value={profile.fullName}
                  onChange={(e) =>
                    handleChange("fullName", e.target.value)
                  }
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
                  Date of Birth
                </label>
                <input
                  className="bb-input"
                  type="date"
                  value={profile.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid-2">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  Email
                </label>
                <input
                  className="bb-input"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
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
                  Phone
                </label>
                <input
                  className="bb-input"
                  value={profile.phone}
                  onChange={(e) =>
                    handleChange("phone", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Address Line 1
              </label>
              <input
                className="bb-input"
                value={profile.addressLine1}
                onChange={(e) =>
                  handleChange("addressLine1", e.target.value)
                }
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
                Address Line 2 (optional)
              </label>
              <input
                className="bb-input"
                value={profile.addressLine2}
                onChange={(e) =>
                  handleChange("addressLine2", e.target.value)
                }
              />
            </div>

            <div className="grid-3">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  City
                </label>
                <input
                  className="bb-input"
                  value={profile.city}
                  onChange={(e) =>
                    handleChange("city", e.target.value)
                  }
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
                  State
                </label>
                <input
                  className="bb-input"
                  value={profile.state}
                  onChange={(e) =>
                    handleChange("state", e.target.value)
                  }
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
                  Pincode
                </label>
                <input
                  className="bb-input"
                  value={profile.pincode}
                  onChange={(e) =>
                    handleChange("pincode", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Communication preference */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Communication Preference
              </label>
              <select
                className="bb-input"
                value={profile.communicationPreference}
                onChange={(e) =>
                  handleChange("communicationPreference", e.target.value)
                }
              >
                <option value="EMAIL">Email only</option>
                <option value="SMS">SMS only</option>
                <option value="BOTH">Email & SMS</option>
              </select>
            </div>

            <button
              type="submit"
              className="bb-button"
              disabled={saving}
              style={{ marginTop: 4 }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--bb-text-muted)",
              }}
            >
              In the full system, these details will be{" "}
              <span style={{ color: "#bfdbfe" }}>read from</span> and{" "}
              <span style={{ color: "#bfdbfe" }}>saved to</span>{" "}
              <code>/api/profile</code>, with audit logs and KYC checks.
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT: AI + profile summary */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Profile Insights</div>
            <div className="bb-card-subtitle">
              AI & security overview about your profile.
            </div>
          </div>
          <span className="bb-badge bb-badge-primary">AI Summary</span>
        </div>

        <div className="bb-card-body" style={{ display: "grid", gap: 10 }}>
          <div
            style={{
              padding: "8px 10px",
              borderRadius: 10,
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
              AI Profile Insight (Demo)
            </div>
            <div>
              Your contact details are{" "}
              <span style={{ color: "#bbf7d0" }}>up to date</span>. Enabling{" "}
              <span style={{ color: "#fde68a" }}>both Email and SMS</span> is
              recommended for critical security alerts.
            </div>
          </div>

          <div
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(31,41,55,0.9)",
              background: "rgba(15,23,42,0.95)",
              fontSize: "0.8rem",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "var(--bb-text-muted)",
                marginBottom: 4,
              }}
            >
              Security Tips
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 16,
                color: "var(--bb-text-muted)",
              }}
            >
              <li>Keep your email and mobile number updated.</li>
              <li>
                Do not share OTP, CVV or passwords with anyone claiming to be
                from the bank.
              </li>
              <li>
                If you change phone number, update it here and re-verify to
                continue receiving OTPs.
              </li>
            </ul>
          </div>

          <div
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(31,41,55,0.9)",
              background: "rgba(15,23,42,0.95)",
              fontSize: "0.8rem",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "var(--bb-text-muted)",
                marginBottom: 4,
              }}
            >
              KYC Snapshot (Demo)
            </div>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--bb-text-muted)",
              }}
            >
              KYC status, documents and verification details are managed in the{" "}
              <span style={{ color: "#bfdbfe" }}>KYC section</span>. Admins can
              view AI-assisted document checks from their dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
