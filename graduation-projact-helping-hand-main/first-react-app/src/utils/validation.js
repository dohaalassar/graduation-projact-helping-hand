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

export function checkPasswordStrength(value) {
  if (!value) {
    return {
      checks: {
        length: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
      },
      score: 0,
      isValid: false,
    };
  }

  const checks = {
    length: value.length >= 8,
    hasUpper: /[A-Z]/.test(value),
    hasLower: /[a-z]/.test(value),
    hasNumber: /\d/.test(value),
    hasSpecial: /[@$!%*#?&]/.test(value) || /[^A-Za-z0-9]/.test(value),
  };

  const score = Object.values(checks).filter(Boolean).length;

  return {
    checks,
    score,
    isValid: score === 5,
  };
}

export function isValidPassword(value) {
  if (!value || !value.trim()) {
    return "هذا الحقل مطلوب";
  }

  const { score, checks } = checkPasswordStrength(value);

  if (score < 5) {
    if (!checks.length) return "يجب أن تكون كلمة السر 8 أحرف على الأقل";
    if (!checks.hasUpper) return "يجب أن تحتوي كلمة السر على حرف كبير واحد على الأقل (A-Z)";
    if (!checks.hasLower) return "يجب أن تحتوي كلمة السر على حرف صغير واحد على الأقل (a-z)";
    if (!checks.hasNumber) return "يجب أن تحتوي كلمة السر على رقم واحد على الأقل (0-9)";
    if (!checks.hasSpecial) return "يجب أن تحتوي كلمة السر على رمز خاص واحد على الأقل (مثل ! و&)";
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