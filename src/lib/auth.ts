

// src/lib/auth.ts
export function isAuthenticated(): boolean {
  return localStorage.getItem("auth") === "true";
}

export function login(): void {
  localStorage.setItem("auth", "true");
}

export function logout(): void {
  localStorage.removeItem("auth");
}
