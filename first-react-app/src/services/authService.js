export async function loginUser(data) {
  console.log("[authService] loginUser called with:", data);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return { success: true, message: "تم تسجيل الدخول بنجاح" };
}