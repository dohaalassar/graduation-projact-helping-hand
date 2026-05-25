export async function loginUser(data) {
  console.log("[authService] loginUser called with:", data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Default hardcoded mock users
  const mockUsers = [
    { emailOrPhone: "parent@gmail.com", password: "Password123!", role: "parent" },
    { emailOrPhone: "psychologist@gmail.com", password: "Password123!", role: "psychologist" }
  ];

  // Retrieve dynamically registered users from localStorage
  const localUsersJson = localStorage.getItem("registered_users");
  const localUsers = localUsersJson ? JSON.parse(localUsersJson) : [];

  // Combine both default and dynamic users
  const allUsers = [...mockUsers, ...localUsers];

  const user = allUsers.find(
    (u) => u.emailOrPhone.trim().toLowerCase() === data.emailOrPhone.trim().toLowerCase()
  );

  if (!user) {
    throw new Error("EMAIL_NOT_FOUND");
  }

  if (user.password !== data.password) {
    throw new Error("INCORRECT_PASSWORD");
  }

  return { success: true, role: user.role, message: "تم تسجيل الدخول بنجاح" };
}

export async function registerUser(userData) {
  console.log("[authService] registerUser called with:", userData);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Retrieve current users
  const localUsersJson = localStorage.getItem("registered_users");
  const localUsers = localUsersJson ? JSON.parse(localUsersJson) : [];

  // Predefined users to avoid duplicate emails/phones
  const mockUsers = [
    { emailOrPhone: "parent@gmail.com" },
    { emailOrPhone: "psychologist@gmail.com" }
  ];

  const exists = [...mockUsers, ...localUsers].some(
    (u) => u.emailOrPhone.trim().toLowerCase() === userData.emailOrPhone.trim().toLowerCase()
  );

  if (exists) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  localUsers.push({
    emailOrPhone: userData.emailOrPhone,
    password: userData.password,
    role: userData.role, // "parent" or "psychologist"
    firstName: userData.firstName,
    lastName: userData.lastName,
  });

  localStorage.setItem("registered_users", JSON.stringify(localUsers));
  return { success: true, message: "تم تسجيل الحساب بنجاح" };
}