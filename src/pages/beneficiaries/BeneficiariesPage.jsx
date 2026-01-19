import React, { useState } from "react";

const initialBeneficiaries = [
  {
    id: "ben-1",
    name: "Ramesh Kumar",
    nickname: "Rent Owner",
    bank: "HDFC Bank",
    account: "XXXXXX9876",
    ifsc: "HDFC0001234",
    type: "SAVINGS",
    trustLevel: "TRUSTED",
    lastUsed: "30 Nov 2025",
    dailyLimit: "₹ 50,000",
  },
  {
    id: "ben-2",
    name: "Priya Stores",
    nickname: "Groceries",
    bank: "SBI",
    account: "XXXXXX4567",
    ifsc: "SBIN0007654",
    type: "CURRENT",
    trustLevel: "NEW",
    lastUsed: "—",
    dailyLimit: "₹ 10,000",
  },
];

function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [filter, setFilter] = useState("ALL"); // ALL | TRUSTED | NEW
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newBeneficiary, setNewBeneficiary] = useState({
    name: "",
    nickname: "",
    bank: "",
    account: "",
    ifsc: "",
    type: "SAVINGS",
  });

  const handleChangeNew = (field, value) => {
    setNewBeneficiary((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNew = () => {
    if (!newBeneficiary.name || !newBeneficiary.bank || !newBeneficiary.account || !newBeneficiary.ifsc) {
      alert("Please fill all required fields.");
      return;
    }

    // In real app: POST /api/beneficiaries + AI/OTP flow
    const newItem = {
      ...newBeneficiary,
      id: `ben-${beneficiaries.length + 1}`,
      trustLevel: "NEW",
      lastUsed: "—",
      dailyLimit: "₹ 10,000",
    };

    setBeneficiaries((prev) => [...prev, newItem]);
    alert("Demo: Beneficiary added locally. In real app this will be saved to backend.");
    setShowAddModal(false);
    setNewBeneficiary({
      name: "",
      nickname: "",
      bank: "",
      account: "",
      ifsc: "",
      type: "SAVINGS",
    });
  };

  const filteredBeneficiaries = beneficiaries.filter((b) => {
    if (filter !== "ALL" && b.trustLevel !== filter) return false;
    if (search) {
      const text = `${b.name} ${b.nickname} ${b.bank} ${b.account} ${b.ifsc}`.toLowerCase();
      if (!text.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  const trustBadgeClass = (trustLevel) => {
    if (trustLevel === "TRUSTED") return "bb-badge bb-badge-success";
    if (trustLevel === "NEW") return "bb-badge bb-badge-primary";
    return "bb-badge";
  };

  return (
    <div>
      {/* Summary + actions */}
      <div className="bb-card" style={{ marginBottom: 16 }}>
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Beneficiaries</div>
            <div className="bb-card-subtitle">
              Manage people & businesses you transfer to frequently.
            </div>
          </div>
          <button
            className="bb-button"
            type="button"
            onClick={() => setShowAddModal(true)}
          >
            + Add Beneficiary
          </button>
        </div>

        <div className="bb-card-body">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,minmax(0,1fr))",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                  marginBottom: 2,
                }}
              >
                Total Beneficiaries
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: 600 }}>
                {beneficiaries.length}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                  marginBottom: 2,
                }}
              >
                Trusted
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {beneficiaries.filter((b) => b.trustLevel === "TRUSTED").length}
              </div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--bb-text-muted)",
                  marginTop: 2,
                }}
              >
                High-value transfers allowed with fewer checks (as per your security settings).
              </p>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                  marginBottom: 2,
                }}
              >
                Newly Added
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {beneficiaries.filter((b) => b.trustLevel === "NEW").length}
              </div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--bb-text-muted)",
                  marginTop: 2,
                }}
              >
                Often require OTP and may get higher AI risk scores initially.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + search */}
      <div className="bb-card" style={{ marginBottom: 16 }}>
        <div className="bb-card-body">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,minmax(0,1fr))",
              gap: 12,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                Trust Level
              </label>
              <select
                className="bb-input"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="TRUSTED">Trusted</option>
                <option value="NEW">New</option>
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
                Search
              </label>
              <input
                className="bb-input"
                placeholder="Name, nickname, bank, account or IFSC"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div
              style={{
                fontSize: "0.78rem",
                color: "var(--bb-text-muted)",
                alignSelf: "end",
              }}
            >
              Note: High-value payments to NEW beneficiaries may require OTP and
              manual confirmation depending on your security settings and AI risk.
            </div>
          </div>
        </div>
      </div>

      {/* Beneficiaries grid */}
      <div className="grid-3">
        {filteredBeneficiaries.map((b) => (
          <div key={b.id} className="bb-card">
            <div className="bb-card-header">
              <div>
                <div className="bb-card-title">{b.name}</div>
                <div className="bb-card-subtitle">
                  {b.bank} · {b.account}
                </div>
              </div>
              <span className={trustBadgeClass(b.trustLevel)}>
                {b.trustLevel}
              </span>
            </div>

            <div className="bb-card-body">
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                  marginBottom: 6,
                }}
              >
                Nickname:{" "}
                <span style={{ color: "#e5e7eb" }}>
                  {b.nickname || "—"}
                </span>
              </div>

              <div
                style={{
                  fontSize: "0.8rem",
                  marginBottom: 4,
                }}
              >
                IFSC: <span style={{ color: "#bfdbfe" }}>{b.ifsc}</span>
              </div>

              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--bb-text-muted)",
                  marginBottom: 4,
                }}
              >
                Type: {b.type === "SAVINGS" ? "Savings A/C" : "Current A/C"}
              </div>

              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--bb-text-muted)",
                  marginBottom: 8,
                }}
              >
                Daily limit for this beneficiary:{" "}
                <span style={{ color: "#e5e7eb" }}>{b.dailyLimit}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                }}
              >
                <button
                  className="bb-button"
                  style={{ flex: 1, fontSize: "0.8rem" }}
                  // later: navigate to /transfer with this beneficiary preselected
                >
                  Pay Now
                </button>
                <button
                  className="bb-button bb-button-secondary"
                  style={{ flex: 1, fontSize: "0.8rem" }}
                  // later: open edit beneficiary drawer
                >
                  Edit
                </button>
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: "0.75rem",
                  color: "var(--bb-text-muted)",
                }}
              >
                Last used: {b.lastUsed}
              </div>
            </div>
          </div>
        ))}

        {filteredBeneficiaries.length === 0 && (
          <div
            className="bb-card"
            style={{ gridColumn: "1 / -1", textAlign: "center" }}
          >
            <div className="bb-card-body">
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                }}
              >
                No beneficiaries match the selected filters. Try changing filters
                or add a new beneficiary.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Beneficiary modal */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bb-card"
            style={{ width: "100%", maxWidth: 520, padding: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bb-card-header">
              <div>
                <div className="bb-card-title">Add New Beneficiary</div>
                <div className="bb-card-subtitle">
                  In real app, you’ll confirm via OTP and AI fraud checks.
                </div>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="bb-card-body">
              <div
                style={{
                  display: "grid",
                  gap: 10,
                  marginBottom: 10,
                  fontSize: "0.8rem",
                }}
              >
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
                    value={newBeneficiary.name}
                    onChange={(e) => handleChangeNew("name", e.target.value)}
                    placeholder="Beneficiary Name"
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
                    Nickname (optional)
                  </label>
                  <input
                    className="bb-input"
                    value={newBeneficiary.nickname}
                    onChange={(e) =>
                      handleChangeNew("nickname", e.target.value)
                    }
                    placeholder="Rent, Groceries, etc."
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
                    Bank Name
                  </label>
                  <input
                    className="bb-input"
                    value={newBeneficiary.bank}
                    onChange={(e) => handleChangeNew("bank", e.target.value)}
                    placeholder="Bank Name"
                  />
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
                      Account Number
                    </label>
                    <input
                      className="bb-input"
                      value={newBeneficiary.account}
                      onChange={(e) =>
                        handleChangeNew("account", e.target.value)
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
                      IFSC
                    </label>
                    <input
                      className="bb-input"
                      value={newBeneficiary.ifsc}
                      onChange={(e) =>
                        handleChangeNew("ifsc", e.target.value.toUpperCase())
                      }
                    />
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
                    Account Type
                  </label>
                  <select
                    className="bb-input"
                    value={newBeneficiary.type}
                    onChange={(e) =>
                      handleChangeNew("type", e.target.value)
                    }
                  >
                    <option value="SAVINGS">Savings</option>
                    <option value="CURRENT">Current</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="bb-button"
                onClick={handleSaveNew}
              >
                Save Beneficiary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BeneficiariesPage;
