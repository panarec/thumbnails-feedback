import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg'];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateFileType(file: File) {
  return ALLOWED_FILE_TYPES.includes(file.type);
}

export const getAlphabetByIndex = (index: number) => {
  return String.fromCharCode(65 + index);
};

export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};
