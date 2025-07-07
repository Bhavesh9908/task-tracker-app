export const validateSignupForm = (formData) => {
  const errors = {};
  
  // Username validation
  if (!formData.username.trim()) {
    errors.username = 'Username is required';
  } else if (formData.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
    errors.username = 'Username can only contain letters, numbers and underscores';
  }

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter';
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = 'Password must contain at least one number';
  }

  // Confirm password validation
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const validateLoginForm = (formData) => {
  const errors = {};
  if (!formData.username.trim()) errors.username = 'Username or email is required';
  if (!formData.password) errors.password = 'Password is required';
  return errors;
};