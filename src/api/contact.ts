import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmitResult {
  success: boolean;
  message: string;
}

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
  recipientEmail: import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL ?? '',
};

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

const isEmailConfigValid = (): { valid: boolean; missing: string[] } => {
  const missing = Object.entries({
    serviceId: emailConfig.serviceId,
    templateId: emailConfig.templateId,
    publicKey: emailConfig.publicKey,
    recipientEmail: emailConfig.recipientEmail,
  })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  return {
    valid: missing.length === 0,
    missing,
  };
};

export const submitContactForm = async (formData: ContactFormData): Promise<SubmitResult> => {
  try {
    // Validate input
    const validation = validateInput(formData);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errors.join(', ')
      };
    }

    const configCheck = isEmailConfigValid();
    if (!configCheck.valid) {
      return {
        success: false,
        message: `Contact service is not configured. Missing: ${configCheck.missing.join(', ')}`
      };
    }

    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: emailConfig.recipientEmail,
      },
      {
        publicKey: emailConfig.publicKey,
      }
    );

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again later.'
    };
  }
}; 