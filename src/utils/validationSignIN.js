/**
 * Validation functions for the sign-in form
 */

export const validateSignInForm = (formData) => {
  const errors = {};
  
  // Email validation
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  
  // Password validation
  if (!formData.password) {
    errors.password = "Password is required";
  }
  
  return errors;
};