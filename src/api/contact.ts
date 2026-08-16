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

// EmailJS public credentials — safe to expose in frontend (read-only keys)
const emailConfig = {
  serviceId:       import.meta.env.VITE_EMAILJS_SERVICE_ID       || 'service_5uu5de1',
  templateId:      import.meta.env.VITE_EMAILJS_TEMPLATE_ID      || 'template_wdpus6w',
  publicKey:       import.meta.env.VITE_EMAILJS_PUBLIC_KEY       || 'O1ayKpUZVzHDpU8QM',
  recipientEmail:  import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL  || 'jananthnikash.ky@outlook.in',
};

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateInput = (data: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!data.name.trim())                              errors.push('Name is required');
  if (!data.email.trim())                             errors.push('Email is required');
  else if (!validateEmail(data.email))                errors.push('Invalid email format');
  if (!data.subject.trim())                           errors.push('Subject is required');
  if (!data.message.trim())                           errors.push('Message is required');
  else if (data.message.length < 10)                  errors.push('Message must be at least 10 characters');
  return { isValid: errors.length === 0, errors };
};

export const submitContactForm = async (formData: ContactFormData): Promise<SubmitResult> => {
  try {
    const validation = validateInput(formData);
    if (!validation.isValid) {
      return { success: false, message: validation.errors.join(', ') };
    }

    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      {
        from_name:  formData.name,
        from_email: formData.email,
        subject:    formData.subject,
        message:    formData.message,
        to_email:   emailConfig.recipientEmail,
        reply_to:   formData.email,
      },
      { publicKey: emailConfig.publicKey }
    );

    return { success: true, message: 'Thank you! Your message has been sent successfully.' };
  } catch (error: any) {
    console.error('EmailJS error:', error);

    // Surface EmailJS-specific errors for easier debugging
    const detail = error?.text || error?.message || 'Unknown error';
    return {
      success: false,
      message: `Failed to send message (${detail}). You can also reach me directly at jananthnikash.ky@outlook.in`,
    };
  }
};
