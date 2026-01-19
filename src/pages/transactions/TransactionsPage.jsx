// src/pages/transactions/TransactionsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const TransactionsPage = () => {
  const { user } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loadingAcc, setLoadingAcc] = useState(true);
  const [loadingTxns, setLoadingTxns] = useState(false);

  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    if (!user?.id) return;
    const fetchAccounts = async () => {
      setLoadingAcc(true);
      try {
        const res = await api.get(`/api/accounts/user/${user.id}`);
        const data = res.data || [];
        setAccounts(data);
        if (data.length > 0) {
          setSelectedAccountId(String(data[0].id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAcc(false);
      }
    };
    fetchAccounts();
  }, [user?.id]);

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

  const filteredTxns = useMemo(() => {
    return transactions.filter((t) => {
      if (typeFilter === "ALL") return true;
      return t.type === typeFilter;
    });
  }, [transactions, typeFilter]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">
            Filter and review your complete transaction history.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="filters-row">
          <div className="form-row-inline">
            <label>Account</label>
            {loadingAcc ? (
              <div className="muted">Loading accounts...</div>
            ) : (
              <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.type || "Account"} – ****
                    {String(acc.accountNumber || "").slice(-4)}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-row-inline">
            <label>Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="DEBIT">Debit</option>
              <option value="CREDIT">Credit</option>
            </select>
          </div>
        </div>

        {loadingTxns ? (
          <div className="muted">Loading transactions...</div>
        ) : filteredTxns.length === 0 ? (
          <div className="muted">No transactions found.</div>
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
                {filteredTxns.map((txn) => (
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
    </div>
  );
};

export default TransactionsPage;
