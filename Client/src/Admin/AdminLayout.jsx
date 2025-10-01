// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Outlet /> {/* Only Admin content will render */}
    </div>
  );
}
