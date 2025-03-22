/**
 * Form validation utilities
 */

// Validate signup form data
export const validateSignUpForm = (formData) => {
  const errors = {};
  
  if (!formData.firstName.trim()) errors.firstName = "First name is required";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required";
  if (!formData.jobTitle.trim()) errors.jobTitle = "Job title is required";
  
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  
  return errors;
};

// Add other validation functions as needed