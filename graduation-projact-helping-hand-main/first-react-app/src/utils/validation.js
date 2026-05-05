// export function isRequired(value) {
//   if (!value.trim()) return "هذا الحقل مطلوب";
//   return undefined;
// }

// export function isValidEmailOrPhone(value) {
//   if (!value.trim()) return "هذا الحقل مطلوب";

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^[0-9+]{8,15}$/;

//   if (!emailRegex.test(value) && !phoneRegex.test(value)) {
//     return "يرجى إدخال بريد إلكتروني أو رقم هاتف صالح";
//   }

//   return undefined;
// }
export function isRequired(value) {
  if (!value || !value.trim()) {
    return "هذا الحقل مطلوب";
  }
  return "";
}

export function isValidEmailOrPhone(value) {
  if (!value || !value.trim()) {
    return "هذا الحقل مطلوب";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    return "صيغة البريد الإلكتروني غير صحيحة";
  }

  return "";
}

export function isValidPassword(value) {
  if (!value || !value.trim()) {
    return "هذا الحقل مطلوب";
  }

  // At least 6 chars, 1 letter, 1 number, 1 special character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

  if (!passwordRegex.test(value)) {
    return "يجب أن تحتوي كلمة السر على أحرف، أرقام، ورموز (مثل ! و&)";
  }

  return "";
}

export function isValidNationalId(value) {
  if (!value || !value.trim()) {
    return "هذا الحقل مطلوب";
  }

  const idRegex = /^[0-9]{9}$/;

  if (!idRegex.test(value)) {
    return "رقم الهوية يجب أن يكون 9 أرقام";
  }

  return "";
}

export function isValidEmployeeId(value) {
  if (!value || !value.trim()) {
    return "هذا الحقل مطلوب";
  }

  const idRegex = /^[0-9]{9}$/;

  if (!idRegex.test(value)) {
    return "الرقم الوظيفي يجب أن يكون 9 أرقام";
  }

  return "";
}