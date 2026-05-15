const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'video/mp4',
  'video/quicktime',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function validateEmail(email: string): string | null {
  if (!email || typeof email !== 'string') return 'Email is required';
  const trimmed = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Invalid email format';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password || typeof password !== 'string') return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
}

export function validateIdeaFields(fields: {
  title: unknown;
  description: unknown;
  category: unknown;
}): string | null {
  const validCategories = ['TECHNICAL_INNOVATION', 'PROCESS_IMPROVEMENT', 'CLIENT_SOLUTION', 'OTHER'];
  if (!fields.title || typeof fields.title !== 'string' || !fields.title.trim()) {
    return 'Title is required';
  }
  if (fields.title.toString().trim().length > 200) return 'Title must be 200 characters or fewer';
  if (!fields.description || typeof fields.description !== 'string' || !fields.description.trim()) {
    return 'Description is required';
  }
  if (fields.description.toString().trim().length > 2000) return 'Description must be 2000 characters or fewer';
  if (!fields.category || !validCategories.includes(fields.category as string)) {
    return 'Invalid category';
  }
  return null;
}

export function validateFile(file: { type: string; size: number }): string | null {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return 'File type not allowed. Allowed: PDF, PNG, JPG, JPEG, DOCX, MP4, MOV, PPTX';
  }
  if (file.size > MAX_FILE_SIZE) return 'File size exceeds 50MB limit';
  return null;
}
