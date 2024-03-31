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
