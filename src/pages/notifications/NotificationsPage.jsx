import React, { useState } from "react";

const mockNotifications = [
  {
    id: "NT-001",
    type: "SECURITY",
    title: "New Device Login Detected",
    message: "We noticed a login from a new Chrome browser on Windows.",
    time: "Just now",
    unread: true,
  },
  {
    id: "NT-002",
    type: "TRANSACTION",
    title: "UPI Payment of ₹750",
    message: "Paid ₹750 to Swiggy via UPI.",
    time: "10 mins ago",
    unread: false,
  },
  {
    id: "NT-003",
    type: "OFFER",
    title: "Exclusive Offer on FD",
    message: "Earn +0.25% extra on new FDs above ₹2,00,000.",
    time: "Yesterday",
    unread: false,
  },
];

function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Notifications</div>
            <div className="bb-card-subtitle">
              Security alerts, transaction updates and personalized messages.
            </div>
          </div>
          <button
            type="button"
            className="bb-button bb-button-secondary"
            style={{ fontSize: "0.8rem" }}
            onClick={markAllRead}
          >
            Mark all as read
          </button>
        </div>

        <div className="bb-card-body">
          <div style={{ display: "grid", gap: 8 }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bb-card mini"
                style={{
                  borderColor: n.unread
                    ? "rgba(37,99,235,0.8)"
                    : "rgba(31,41,55,0.9)",
                  background: n.unread
                    ? "rgba(30,64,175,0.25)"
                    : "rgba(15,23,42,0.95)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    {n.title}
                  </div>
                  <span className="bb-badge">
                    {n.type === "SECURITY"
                      ? "Security"
                      : n.type === "TRANSACTION"
                      ? "Transaction"
                      : "Offer"}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--bb-text-muted)",
                    marginBottom: 2,
                  }}
                >
                  {n.message}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bb-text-muted)",
                  }}
                >
                  {n.time}
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--bb-text-muted)",
                }}
              >
                You have no notifications.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bb-card">
        <div className="bb-card-header">
          <div className="bb-card-title">Notification Preferences</div>
          <div className="bb-card-subtitle">
            Choose how you want to receive alerts.
          </div>
        </div>
        <div className="bb-card-body" style={{ fontSize: "0.85rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
            />
            <span>Email alerts</span>
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
            />
            <span>SMS alerts</span>
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={(e) => setPushAlerts(e.target.checked)}
            />
            <span>In-app push notifications</span>
          </label>

          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--bb-text-muted)",
              marginTop: 8,
            }}
          >
            Later, this will call{" "}
            <code>/api/profile/notification-preferences</code> to save your
            choices and integrate with email/SMS providers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
