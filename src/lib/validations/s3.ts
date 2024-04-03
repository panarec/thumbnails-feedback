import { ALLOWED_FILE_TYPES } from '@/config/s3';
import { z } from 'zod';

export const fileTypeSchema = z.string().refine(
  (value) => {
    return ALLOWED_FILE_TYPES.includes(value);
  },
  {
    message: 'Invalid file type',
  }
);


export const s3ResponseSchema = z.object({
  signedUrl: z.string(),
  getUrl: z.string(),
});
