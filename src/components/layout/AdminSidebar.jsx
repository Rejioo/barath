import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Topbar from "./Topbar"; // same topbar or a separate AdminTopbar if you prefer

function AdminLayout() {
  return (
    <div className="bb-app-shell">
      <AdminSidebar />
      <div className="bb-main-area">
        <Topbar />
        <main className="bb-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
