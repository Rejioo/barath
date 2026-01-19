import React from "react";

function Topbar({ title, subtitle }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">{title}</div>
        <div className="topbar-subtitle">{subtitle}</div>
      </div>

      <div className="topbar-right">
        {/* Notifications */}
        <button className="icon-button" type="button" title="Notifications">
          🔔
        </button>

        {/* AI Assistant trigger (customer side) */}
        <button className="icon-button" type="button" title="AI Assistant">
          🤖
        </button>

        {/* Profile chip (static for now, later use real user data) */}
        <div className="profile-chip">
          <div className="profile-chip-avatar">SP</div>
          <div className="profile-chip-name">Sakthi</div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
