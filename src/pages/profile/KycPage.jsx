import React, { useState } from "react";

const initialKyc = {
  status: "PENDING_REVIEW", // NOT_STARTED | IN_PROGRESS | PENDING_REVIEW | APPROVED | REJECTED
  pan: "ABCDE1234F",
  aadhaarMasked: "XXXX-XXXX-1234",
  employmentType: "Salaried",
  incomeRange: "5–10 LPA",
};

const mockDocs = [
  {
    id: "doc-1",
    type: "PAN Card",
    status: "VERIFIED",
    uploadedAt: "15 Nov 2025",
  },
  {
    id: "doc-2",
    type: "Aadhaar Card",
    status: "UNDER_REVIEW",
    uploadedAt: "15 Nov 2025",
  },
  {
    id: "doc-3",
    type: "Address Proof (EB Bill)",
    status: "UNDER_REVIEW",
    uploadedAt: "16 Nov 2025",
  },
];

function KycPage() {
  const [kyc, setKyc] = useState(initialKyc);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setKyc((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    // TODO later: PUT /api/kyc/profile
    console.log("KYC basic info save:", kyc);

    setTimeout(() => {
      setSaving(false);
      alert(
        "Demo: KYC details saved locally. In real app this will update backend and trigger KYC workflow."
      );
    }, 600);
  };

  const handleUpload = (type) => {
    // TODO: open file picker & POST /api/kyc/documents
    alert(
      `Demo: Upload for ${type}. In real app, file will be uploaded, OCR run by AI and sent for review.`
    );
  };

  const statusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED":
      case "VERIFIED":
        return "bb-badge bb-badge-success";
      case "PENDING_REVIEW":
      case "UNDER_REVIEW":
        return "bb-badge bb-badge-primary";
      case "REJECTED":
        return "bb-badge bb-badge-danger";
      default:
        return "bb-badge";
    }
  };

  const prettyStatus = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return "Not Started";
      case "IN_PROGRESS":
        return "In Progress";
      case "PENDING_REVIEW":
        return "Pending Bank Review";
      case "APPROVED":
        return "KYC Approved";
      case "REJECTED":
        return "Rejected · Resubmission Required";
      default:
        return status;
    }
  };

  return (
    <div className="grid-2" style={{ alignItems: "flex-start", gap: 18 }}>
      {/* LEFT: KYC status + basic info form */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">KYC Details</div>
            <div className="bb-card-subtitle">
              Complete and maintain your Know Your Customer information.
            </div>
          </div>
          <span className={statusBadgeClass(kyc.status)}>
            {prettyStatus(kyc.status)}
          </span>
        </div>

        <div className="bb-card-body" style={{ display: "grid", gap: 14 }}>
          {/* Progress steps */}
          <div
            style={{
              display: "flex",
              gap: 10,
              fontSize: "0.75rem",
              color: "var(--bb-text-muted)",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#22c55e",
                }}
              />
              Basic details
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#22c55e",
                }}
              />
              PAN & Aadhaar
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background:
                    kyc.status === "APPROVED" ? "#22c55e" : "#facc15",
                }}
              />
              Document verification
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background:
                    kyc.status === "APPROVED" ? "#22c55e" : "#6b7280",
                }}
              />
              Final approval
            </div>
          </div>

          {/* Basic info form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 12, fontSize: "0.85rem" }}
          >
            <div className="grid-2">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  PAN
                </label>
                <input
                  className="bb-input"
                  value={kyc.pan}
                  onChange={(e) =>
                    handleChange("pan", e.target.value.toUpperCase())
                  }
                  maxLength={10}
                  placeholder="ABCDE1234F"
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
                  Aadhaar (masked)
                </label>
                <input
                  className="bb-input"
                  value={kyc.aadhaarMasked}
                  onChange={(e) =>
                    handleChange("aadhaarMasked", e.target.value)
                  }
                  placeholder="XXXX-XXXX-1234"
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  Employment Type
                </label>
                <select
                  className="bb-input"
                  value={kyc.employmentType}
                  onChange={(e) =>
                    handleChange("employmentType", e.target.value)
                  }
                >
                  <option value="Salaried">Salaried</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Student">Student</option>
                  <option value="Retired">Retired</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    marginBottom: 4,
                  }}
                >
                  Income Range
                </label>
                <select
                  className="bb-input"
                  value={kyc.incomeRange}
                  onChange={(e) =>
                    handleChange("incomeRange", e.target.value)
                  }
                >
                  <option value="Below 2.5 LPA">Below 2.5 LPA</option>
                  <option value="2.5–5 LPA">2.5–5 LPA</option>
                  <option value="5–10 LPA">5–10 LPA</option>
                  <option value="10–25 LPA">10–25 LPA</option>
                  <option value="25+ LPA">25+ LPA</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bb-button"
              disabled={saving}
              style={{ marginTop: 4 }}
            >
              {saving ? "Saving..." : "Save KYC Info"}
            </button>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--bb-text-muted)",
              }}
            >
              These details are used for regulatory compliance and risk scoring.
              Misrepresentation of information may lead to account restrictions.
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT: documents + AI recommendation */}
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">KYC Documents</div>
            <div className="bb-card-subtitle">
              Upload and track verification of your documents.
            </div>
          </div>
        </div>

        <div className="bb-card-body" style={{ display: "grid", gap: 12 }}>
          {/* Upload actions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,minmax(0,1fr))",
              gap: 10,
              fontSize: "0.8rem",
            }}
          >
            <button
              type="button"
              className="bb-button bb-button-secondary"
              onClick={() => handleUpload("PAN Card")}
            >
              Upload PAN
            </button>
            <button
              type="button"
              className="bb-button bb-button-secondary"
              onClick={() => handleUpload("Aadhaar")}
            >
              Upload Aadhaar
            </button>
            <button
              type="button"
              className="bb-button bb-button-secondary"
              onClick={() => handleUpload("Address Proof")}
            >
              Upload Address Proof
            </button>
            <button
              type="button"
              className="bb-button bb-button-secondary"
              onClick={() => handleUpload("Income Proof")}
            >
              Upload Income Proof
            </button>
          </div>

          {/* AI KYC insight (demo) */}
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
              AI KYC Recommendation (Demo)
            </div>
            <div>
              Our AI engine has{" "}
              <span style={{ color: "#bbf7d0" }}>
                high confidence (96%)
              </span>{" "}
              that your{" "}
              <span style={{ color: "#fde68a" }}>PAN name</span> matches your
              profile name. Address in Aadhaar appears{" "}
              <span style={{ color: "#bfdbfe" }}>slightly different</span>;
              final decision will be taken by a bank officer.
            </div>
          </div>

          {/* Documents list */}
          <div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--bb-text-muted)",
                marginBottom: 6,
              }}
            >
              Uploaded Documents
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {mockDocs.map((doc) => (
                <div
                  key={doc.id}
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
                    <div>{doc.type}</div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--bb-text-muted)",
                      }}
                    >
                      Uploaded on: {doc.uploadedAt}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className={statusBadgeClass(doc.status)}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
              {mockDocs.length === 0 && (
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  No documents uploaded yet.
                </p>
              )}
            </div>
          </div>

          {/* Info note */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--bb-text-muted)",
            }}
          >
            In the full system, this section talks to{" "}
            <code>/api/kyc/profile</code>,{" "}
            <code>/api/kyc/documents</code> and{" "}
            <code>/api/ai/kyc-ocr-verify</code>, where AI assists in
            extracting and matching details but{" "}
            <strong>final approval is always manual</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default KycPage;
