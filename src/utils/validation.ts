export const validateEmail = (email: string): string | null => {
  return /\S+@\S+\.\S+/.test(email) ? null : 'Invalid email format';
};

export const validatePassword = (password: string): string | null => {
  return password.length >= 6 ? null : 'Password must be at least 6 characters';
};

export const validateName = (name: string): string | null => {
  return name.trim().length > 0 ? null : 'Name is required';
};

export const validatePhoneNumber = (phone: string): string | null => {
  return /^\d{10}$/.test(phone) ? null : 'Phone number must be 10 digits';
};
