export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email) ? null : 'Invalid email format';
};

export const validatePassword = (password) => {
  return password.length >= 6 ? null : 'Password must be at least 6 characters';
};

export const validateName = (name) => {
  return name.trim().length > 0 ? null : 'Name is required';
};

export const validatePhoneNumber = (phone) => {
  return /^\d{10}$/.test(phone) ? null : 'Phone number must be 10 digits';
};
