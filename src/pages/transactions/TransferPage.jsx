// src/pages/transactions/TransferPage.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const TransferPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const preselectedFrom = location.state?.fromAccountId || null;

  const [accounts, setAccounts] = useState([]);
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [loadingAcc, setLoadingAcc] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    const fetchAccounts = async () => {
      setLoadingAcc(true);
      try {
        const res = await api.get(`/api/accounts/user/${user.id}`);
        const data = res.data || [];
        setAccounts(data);
        if (data.length > 0) {
          // if state has fromAccountId, use that
          const fromId =
            preselectedFrom && data.some((a) => a.id === preselectedFrom)
              ? preselectedFrom
              : data[0].id;
          setFromAccountId(String(fromId));

          // choose a different destination by default
          const other = data.find((a) => a.id !== fromId);
          if (other) {
            setToAccountId(String(other.id));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAcc(false);
      }
    };
    fetchAccounts();
  }, [user?.id, preselectedFrom]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    setError(null);

    try {
      const res = await api.post("/api/transactions/transfer", {
        fromAccountId: Number(fromAccountId),
        toAccountId: Number(toAccountId),
        amount: Number(amount),
        description: remark,
        deviceFingerprint: "web-demo-device",
        clientIp: "127.0.0.1",
        userAgent: navigator.userAgent,
      });

      setMsg(`Transfer successful. Ref: ${res.data.reference || "-"}`);
      setAmount("");
      setRemark("");
    } catch (err) {
      const apiMsg = err.response?.data || err.message;
      setError(apiMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Transfer Funds</h1>
          <p className="page-subtitle">
            Transfer between your barath accounts. External / UPI will be
            added later.
          </p>
        </div>
      </div>

      <div className="card">
        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {loadingAcc ? (
          <div className="muted">Loading accounts...</div>
        ) : accounts.length < 2 ? (
          <div className="muted">
            You need at least two accounts to perform an internal transfer.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-row">
              <label>From account</label>
              <select
                value={fromAccountId}
                onChange={(e) => setFromAccountId(e.target.value)}
                required
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.type || "Account"} – ****
                    {String(acc.accountNumber || "").slice(-4)} (₹{" "}
                    {Number(acc.balance || 0).toLocaleString("en-IN")})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label>To account</label>
              <select
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
                required
              >
                {accounts
                  .filter((acc) => String(acc.id) !== String(fromAccountId))
                  .map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.type || "Account"} – ****
                      {String(acc.accountNumber || "").slice(-4)}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-row">
              <label>Amount (INR)</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label>Remark (optional)</label>
              <input
                type="text"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Rent, savings, investments..."
              />
            </div>

            <div className="form-row">
              <button
                type="submit"
                className="primary-button"
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TransferPage;
