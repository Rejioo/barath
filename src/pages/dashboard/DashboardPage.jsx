// src/pages/dashboard/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingTxns, setLoadingTxns] = useState(false);
  const [error, setError] = useState(null);

  // Load accounts for current user
  useEffect(() => {
    if (!user?.id) return;

    const fetchAccounts = async () => {
      setLoadingAccounts(true);
      setError(null);
      try {
        const res = await api.get(`/api/accounts/user/${user.id}`);
        const data = res.data || [];
        setAccounts(data);
        if (data.length > 0) {
          setSelectedAccountId(data[0].id);
        }
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, [user?.id]);

  // Load transactions for selected account
  useEffect(() => {
    if (!selectedAccountId) return;

    const fetchTxns = async () => {
      setLoadingTxns(true);
      try {
        const res = await api.get(
          `/api/transactions/account/${selectedAccountId}`
        );
        setTransactions(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingTxns(false);
      }
    };

    fetchTxns();
  }, [selectedAccountId]);

  const primaryAccount = accounts.find((a) => a.id === selectedAccountId);

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + Number(acc.balance || 0),
    0
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Welcome back{user?.username ? `, ${user.username}` : ""}. Manage
            your accounts, view insights and track recent activity.
          </p>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/transfer")}
        >
          + Quick Transfer
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Summary cards */}
      <div className="grid-3">
        <div className="card glass-card">
          <h2 className="card-title">Total Balance</h2>
          <p className="big-amount">
            ₹ {totalBalance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </p>
          <p className="muted">Across all active accounts</p>
        </div>

        <div className="card glass-card">
          <h2 className="card-title">Accounts</h2>
          <p className="big-amount">{accounts.length}</p>
          <p className="muted">Savings, current, salary and more</p>
        </div>

        <div className="card glass-card">
          <h2 className="card-title">AI Risk Status</h2>
          <p className="pill pill-safe">No high-risk alerts</p>
          <p className="muted">
            (Later this will come from AI fraud engine: last 24h activity)
          </p>
        </div>
      </div>

      {/* Accounts & AI insight layout */}
      <div className="layout-two-columns">
        <div className="card">
          <div className="card-header-row">
            <h2 className="card-title">My Accounts</h2>
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/accounts")}
            >
              View all
            </button>
          </div>

          {loadingAccounts ? (
            <div className="muted">Loading accounts...</div>
          ) : accounts.length === 0 ? (
            <div className="muted">
              No accounts found. (Later: auto-create default savings account
              after KYC.)
            </div>
          ) : (
            <div>
              <div className="account-tabs">
                {accounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    className={
                      "account-tab" +
                      (acc.id === selectedAccountId ? " account-tab-active" : "")
                    }
                    onClick={() => setSelectedAccountId(acc.id)}
                  >
                    <div className="account-tab-title">
                      {acc.type || "ACCOUNT"}
                    </div>
                    <div className="account-tab-sub">
                      **** {String(acc.accountNumber || "").slice(-4)}
                    </div>
                  </button>
                ))}
              </div>

              {primaryAccount && (
                <div className="account-balance-panel">
                  <div>
                    <div className="muted">Current balance</div>
                    <div className="big-amount">
                      ₹{" "}
                      {Number(primaryAccount.balance || 0).toLocaleString(
                        "en-IN",
                        { maximumFractionDigits: 2 }
                      )}
                    </div>
                    <div className="muted">
                      Account: {primaryAccount.accountNumber}
                    </div>
                  </div>
                  <div className="actions">
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={() =>
                        navigate(`/accounts/${primaryAccount.id}`)
                      }
                    >
                      View details
                    </button>
                    <button
                      className="primary-button"
                      type="button"
                      onClick={() => navigate("/transfer")}
                    >
                      Transfer from this
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI Insights placeholder */}
        <div className="card">
          <h2 className="card-title">AI Spend Insights</h2>
          <p className="muted">
            Later this will call <code>/api/ai/spend-insights</code> and show
            real ML insights. For now, we display static sample text.
          </p>
          <ul className="insights-list">
            <li>
              <span className="pill pill-info">Insight</span> Your online
              shopping spends are 18% higher than last month.
            </li>
            <li>
              <span className="pill pill-info">Insight</span> You paid 3
              upcoming bills in advance. Great job maintaining a good credit
              score.
            </li>
            <li>
              <span className="pill pill-warning">Tip</span> You can set AI
              alerts for unusual high-value transfers.
            </li>
          </ul>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="card" style={{ marginTop: "1.5rem" }}>
        <div className="card-header-row">
          <h2 className="card-title">Recent Transactions</h2>
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/transactions")}
          >
            View full history
          </button>
        </div>

        {loadingTxns ? (
          <div className="muted">Loading recent transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="muted">
            No recent transactions for this account.
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Date/Time</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Ref</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 6).map((txn) => (
                  <tr key={txn.id}>
                    <td>
                      {new Date(txn.createdAt || txn.txnTime).toLocaleString(
                        "en-IN"
                      )}
                    </td>
                    <td>{txn.description || "-"}</td>
                    <td>
                      <span
                        className={
                          "pill " +
                          (txn.type === "DEBIT" ? "pill-debit" : "pill-credit")
                        }
                      >
                        {txn.type}
                      </span>
                    </td>
                    <td className={txn.type === "DEBIT" ? "text-debit" : "text-credit"}>
                      {txn.type === "DEBIT" ? "-" : "+"}₹{" "}
                      {Number(txn.amount || 0).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>{txn.reference || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
