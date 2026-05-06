import React from "react";

const DashboardActionButton = ({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  const buttonClass = `
    dashboard-action-button
    ${variant === "success" ? "success" : "primary"}
    ${fullWidth ? "full-width" : ""}
    ${className}
  `;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default DashboardActionButton;