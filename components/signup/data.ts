interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const getPasswordStrengthText = (strength: number) => {
  if (strength === 0) return { text: "", color: "" };
  if (strength <= 2) return { text: "Weak", color: "text-red-400" };
  if (strength <= 3) return { text: "Fair", color: "text-yellow-400" };
  if (strength <= 4) return { text: "Good", color: "text-blue-400" };
  return { text: "Strong", color: "text-green-400" };
};

export type { FormData, FormErrors };
export { getPasswordStrength, getPasswordStrengthText };