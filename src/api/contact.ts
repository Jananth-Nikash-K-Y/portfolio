import axios from 'axios';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateInput = (data: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push('Name is required');
  }

  if (!data.email.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.subject.trim()) {
    errors.push('Subject is required');
  }

  if (!data.message.trim()) {
    errors.push('Message is required');
  } else if (data.message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const submitContactForm = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate input
    const validation = validateInput(formData);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errors.join(', ')
      };
    }

    // Send to backend API
    const response = await axios.post('/api/contact', formData, {
      headers: {
        'Content-Type': 'application/json',
        // Add CSRF token if your backend requires it
        // 'X-CSRF-Token': getCsrfToken()
      }
    });

    return {
      success: true,
      message: 'Message sent successfully!'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again later.'
    };
  }
}; 