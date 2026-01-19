import React from "react";

function DepositsPage() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div className="bb-card">
        <div className="bb-card-header">
          <div>
            <div className="bb-card-title">Deposits</div>
            <div className="bb-card-subtitle">
              Fixed deposits, recurring deposits and term investments.
            </div>
          </div>
        </div>
        <div className="bb-card-body">
          <div className="grid-3" style={{ gap: 12 }}>
            <div className="bb-card mini">
              <div className="bb-card-title">Fixed Deposit</div>
              <p className="bb-card-subtitle">
                Lock in your savings and earn assured returns.
              </p>
              <ul style={{ fontSize: "0.8rem", marginLeft: 16 }}>
                <li>Tenure: 7 days – 10 years</li>
                <li>Interest: up to 7.5% p.a.*</li>
                <li>Flexible payout options</li>
              </ul>
              <button className="bb-button" style={{ marginTop: 8 }}>
                Open FD (demo)
              </button>
            </div>

            <div className="bb-card mini">
              <div className="bb-card-title">Recurring Deposit</div>
              <p className="bb-card-subtitle">
                Invest a fixed amount every month and build a corpus.
              </p>
              <ul style={{ fontSize: "0.8rem", marginLeft: 16 }}>
                <li>Monthly auto-debit</li>
                <li>Ideal for goal-based savings</li>
                <li>Tenure: 6 months – 10 years</li>
              </ul>
              <button className="bb-button" style={{ marginTop: 8 }}>
                Start RD (demo)
              </button>
            </div>

            <div className="bb-card mini">
              <div className="bb-card-title">Tax Saver Deposit</div>
              <p className="bb-card-subtitle">
                5-year lock-in deposit eligible under section 80C.
              </p>
              <ul style={{ fontSize: "0.8rem", marginLeft: 16 }}>
                <li>Fixed 5-year tenure</li>
                <li>Tax benefits as per law</li>
                <li>Ideal for long-term planning</li>
              </ul>
              <button className="bb-button" style={{ marginTop: 8 }}>
                Explore Options (demo)
              </button>
            </div>
          </div>

          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--bb-text-muted)",
              marginTop: 10,
            }}
          >
            Later, this page will use{" "}
            <code>/api/deposits/products</code> and{" "}
            <code>/api/deposits/open</code> to fetch real deposit schemes and
            create bookings linked to your accounts.
          </p>
        </div>
      </div>

      <div className="bb-card">
        <div className="bb-card-header">
          <div className="bb-card-title">Your Active Deposits (demo)</div>
        </div>
        <div className="bb-card-body">
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--bb-text-muted)",
            }}
          >
            Once backend is wired, this table will show live deposit accounts
            from <code>/api/deposits</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DepositsPage;
