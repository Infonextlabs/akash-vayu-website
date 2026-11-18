export interface ContactFormValues {
  fullName: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export interface ContactValidationResult {
  isValid: boolean;
  errors: ContactFormErrors;
  sanitized: ContactFormValues;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(values: ContactFormValues): ContactValidationResult {
  const sanitized: ContactFormValues = {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    organization: values.organization.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  };

  const errors: ContactFormErrors = {};

  if (!sanitized.fullName) {
    errors.fullName = 'Please enter your full name.';
  } else if (sanitized.fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  if (!sanitized.email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(sanitized.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (sanitized.organization && sanitized.organization.length < 2) {
    errors.organization = 'Organization name must be at least 2 characters if provided.';
  }

  if (!sanitized.subject) {
    errors.subject = 'Please specify an inquiry subject.';
  } else if (sanitized.subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!sanitized.message) {
    errors.message = 'Please enter your message.';
  } else if (sanitized.message.length < 15) {
    errors.message = 'Message must be at least 15 characters so our team has context.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}
