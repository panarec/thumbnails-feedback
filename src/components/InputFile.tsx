'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef, useState } from 'react';
import type { PutBlobResult } from '@vercel/blob';

export function InputFile() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(`/api/file?filename=${file.name}`, {
            method: 'POST',
            body: file,
          });

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </div>
  );
}
