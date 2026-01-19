// src/pages/accounts/AccountDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const AccountDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingAcc, setLoadingAcc] = useState(true);
  const [loadingTxns, setLoadingTxns] = useState(true);
  const [error, setError] = useState(null);

  // account details
  useEffect(() => {
    const fetchAccount = async () => {
      setLoadingAcc(true);
      setError(null);
      try {
        const res = await api.get(`/api/accounts/${id}`);
        setAccount(res.data);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
      } finally {
        setLoadingAcc(false);
      }
    };
    if (id) fetchAccount();
  }, [id]);

  // transactions
  useEffect(() => {
    const fetchTxns = async () => {
      setLoadingTxns(true);
      try {
        const res = await api.get(`/api/transactions/account/${id}`);
        setTransactions(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingTxns(false);
      }
    };
    if (id) fetchTxns();
  }, [id]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Account Details</h1>
          <p className="page-subtitle">
            View balance, information and transactions for this account.
          </p>
        </div>
        <button
          className="secondary-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loadingAcc ? (
        <div className="muted">Loading account...</div>
      ) : !account ? (
        <div className="muted">Account not found.</div>
      ) : (
        <>
          <div className="card">
            <div className="account-detail-header">
              <div>
                <div className="muted">Account Type</div>
                <h2>{account.type || "ACCOUNT"}</h2>
                <div className="muted">
                  Account No: {account.accountNumber} | IFSC:{" "}
                  {account.ifsc || "BHRT000XXXX"}
                </div>
                <div className="muted">
                  Holder: {user?.username || user?.fullName || "-"}
                </div>
              </div>
              <div>
                <div className="muted">Current Balance</div>
                <div className="big-amount">
                  ₹{" "}
                  {Number(account.balance || 0).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="muted">Status: {account.status}</div>
              </div>
            </div>
            <div className="account-detail-actions">
              <button
                className="primary-button"
                type="button"
                onClick={() =>
                  navigate("/transfer", { state: { fromAccountId: account.id } })
                }
              >
                Transfer from this
              </button>
            </div>
          </div>

          <div className="card" style={{ marginTop: "1.5rem" }}>
            <h2 className="card-title">Recent Transactions</h2>
            {loadingTxns ? (
              <div className="muted">Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="muted">No transactions yet.</div>
            ) : (
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date/Time</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr key={txn.id}>
                        <td>
                          {new Date(
                            txn.createdAt || txn.txnTime
                          ).toLocaleString("en-IN")}
                        </td>
                        <td>{txn.description || "-"}</td>
                        <td>
                          <span
                            className={
                              "pill " +
                              (txn.type === "DEBIT"
                                ? "pill-debit"
                                : "pill-credit")
                            }
                          >
                            {txn.type}
                          </span>
                        </td>
                        <td
                          className={
                            txn.type === "DEBIT" ? "text-debit" : "text-credit"
                          }
                        >
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
        </>
      )}
    </div>
  );
};

export default AccountDetailsPage;
