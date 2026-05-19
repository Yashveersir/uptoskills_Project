// Fake login API
export const loginUser = async (data) => {
  // simulate API delay
  await new Promise((res) => setTimeout(res, 1000));

  // Check registered user first
  const mockUserStr = localStorage.getItem("mockUser");
  if (mockUserStr) {
    const mockUser = JSON.parse(mockUserStr);
    if (data.email === mockUser.email && data.password === mockUser.password) {
      return { token: "customToken123", role: "user", user: { name: mockUser.name, email: mockUser.email } };
    }
  }

  if (data.email === "demo@gmail.com" && data.password === "123456") {
    return { token: "demoToken", role: "user", user: { name: "Demo User", email: data.email } };
  }

  if (data.email === "admin@gmail.com" && data.password === "admin123") {
    return { token: "adminToken", role: "admin", user: { name: "Admin User", email: data.email } };
  }

  throw new Error("Invalid credentials");
};

// Fake register API
export const registerUser = async (data) => {
  await new Promise((res) => setTimeout(res, 1000));

  // Store in localStorage for mock login
  localStorage.setItem("mockUser", JSON.stringify(data));

  return { message: "User registered successfully" };
};