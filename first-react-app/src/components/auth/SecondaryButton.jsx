const SecondaryButton = ({ children, ...props }) => {
  return (
    <button className="auth-btn-secondary" {...props}>
      {children}
    </button>
  );
};

export default SecondaryButton;