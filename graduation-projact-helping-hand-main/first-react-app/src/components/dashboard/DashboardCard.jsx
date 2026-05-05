import React from "react";

const DashboardCard = ({ icon, title, children, className = "" }) => {
  return (
    <div className={`dashboard-card ${className}`}>
      <div className="dashboard-card-header">
        <span className="dashboard-card-icon">{icon}</span>
        <h2 className="dashboard-card-title">{title}</h2>
      </div>

      {children}
    </div>
  );
};

export default DashboardCard;