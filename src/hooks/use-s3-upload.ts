import { MAX_FILE_SIZE } from '@/config/image';
import { toast } from '@/components/ui/use-toast';
import { FileTooLargeError } from '@/lib/exceptions';

import { s3ResponseSchema } from '@/lib/validations/s3';
import { computeSHA256 } from '@/lib/utils';

interface UseS3UploadReturn {
  s3Upload: (file: File) => Promise<{ getUrl: string | null; error: boolean }>;
}

const uploadFile = async (file: File) => {
  try {
    const checksum = await computeSHA256(file);

    const res = await fetch('/api/file/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileType: file.type,
        fileSize: file.size,
        checksum: checksum,
      }),
    });

    const data = await res.json();

    const { signedUrl, getUrl } = s3ResponseSchema.parse(data);

    try {
      // Upload to S3
      await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
    } catch (error) {
      throw new FileTooLargeError();
    }

    return { getUrl };
  } catch (error) {
    if (error instanceof FileTooLargeError) {
      throw new FileTooLargeError();
    }

    throw new Error('Internal Server Error');
  }
};

export const useS3Upload = (): UseS3UploadReturn => {
  const s3Upload = async (file: File) => {
    try {
      if (file.size > MAX_FILE_SIZE) throw new FileTooLargeError();

      // Single file upload
      const singleFile = file as File;

      const { getUrl } = await uploadFile(singleFile);

      return { getUrl, error: false };
    } catch (error) {
      if (error instanceof FileTooLargeError) {
        toast({
          title: 'Image Too Large',
          description: error.message,
        });

        return { getUrl: null, error: true };
      }

      toast({
        title: 'Internal Server Error',
        description: 'There was an error uploading your image.',
      });

      return { getUrl: null, error: true };
    }
  };

  return { s3Upload };
};
