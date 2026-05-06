export const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

export const monthOptions = [
  { value: "1", label: "يناير" },
  { value: "2", label: "فبراير" },
  { value: "3", label: "مارس" },
  { value: "4", label: "أبريل" },
  { value: "5", label: "مايو" },
  { value: "6", label: "يونيو" },
  { value: "7", label: "يوليو" },
  { value: "8", label: "أغسطس" },
  { value: "9", label: "سبتمبر" },
  { value: "10", label: "أكتوبر" },
  { value: "11", label: "نوفمبر" },
  { value: "12", label: "ديسمبر" },
];

export const yearOptions = Array.from({ length: 70 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return {
    value: String(year),
    label: String(year),
  };
});

export const genderOptions = [
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
];