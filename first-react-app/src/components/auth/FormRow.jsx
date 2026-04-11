const FormRow = ({ children, columns = 2 }) => {
  const className =
    columns === 3 ? "form-row form-row-3" : "form-row form-row-2";

  return <div className={className}>{children}</div>;
};

export default FormRow;