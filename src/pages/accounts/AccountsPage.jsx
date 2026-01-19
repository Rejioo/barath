// src/pages/accounts/AccountsPage.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AccountsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    const fetchAccounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/api/accounts/user/${user.id}`);
        setAccounts(res.data || []);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [user?.id]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Accounts</h1>
          <p className="page-subtitle">
            View all your savings, current, and other accounts.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="muted">Loading accounts...</div>
      ) : accounts.length === 0 ? (
        <div className="muted">
          No accounts found yet. KYC and account opening will be handled later.
        </div>
      ) : (
        <div className="accounts-grid">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="card account-card"
              onClick={() => navigate(`/accounts/${acc.id}`)}
            >
              <div className="account-card-header">
                <span className="badge badge-type">
                  {acc.type || "ACCOUNT"}
                </span>
                <span className={`badge badge-status status-${acc.status?.toLowerCase()}`}>
                  {acc.status}
                </span>
              </div>

              <div className="account-card-body">
                <div className="account-label">Account Number</div>
                <div className="account-number">
                  **** {String(acc.accountNumber || "").slice(-4)}
                </div>

                <div className="account-label">Balance</div>
                <div className="account-balance">
                  ₹{" "}
                  {Number(acc.balance || 0).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="muted">
                  Currency: {acc.currency || "INR"}
                </div>
              </div>

              <div className="account-card-footer">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/accounts/${acc.id}`);
                  }}
                >
                  View details
                </button>
                <button
                  type="button"
                  className="link-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/transfer", {
                      state: { fromAccountId: acc.id },
                    });
                  }}
                >
                  Transfer from this
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
