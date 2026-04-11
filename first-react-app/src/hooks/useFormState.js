// import { useState, useCallback } from "react";

// export function useFormState(initialState) {
//   const [values, setValues] = useState(initialState);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [serverError, setServerError] = useState(null);

//   const handleChange = useCallback(
//     (field) => (e) => {
//       setValues((prev) => ({ ...prev, [field]: e.target.value }));
//       setErrors((prev) => ({ ...prev, [field]: undefined }));
//       setServerError(null);
//     },
//     []
//   );

//   const reset = useCallback(() => {
//     setValues(initialState);
//     setErrors({});
//     setServerError(null);
//   }, [initialState]);

//   return {
//     values,
//     errors,
//     setErrors,
//     loading,
//     setLoading,
//     serverError,
//     setServerError,
//     handleChange,
//     reset,
//   };
// }
import { useState, useCallback } from "react";

export function useFormState(initialState) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleChange = useCallback(
    (field) => (e) => {
      setValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));

      setServerError(null);
    },
    []
  );

  const reset = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setServerError(null);
  }, [initialState]);

  return {
    values,
    setValues,
    errors,
    setErrors,
    loading,
    setLoading,
    serverError,
    setServerError,
    handleChange,
    reset,
  };
}