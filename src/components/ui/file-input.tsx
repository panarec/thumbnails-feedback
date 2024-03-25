'use client';

import { forwardRef, useReducer, useState, type ChangeEvent, type DragEvent, useEffect } from 'react';
// import { useToast } from '@/src/hooks/use-toast';
// import ImageUpload from '@/ui/image-upload';

// import { MAX_FILE_SIZE } from '@/config/image';
import { cn, validateFileType } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { AspectRatio } from './aspect-ratio';
import { set } from 'zod';
// import { Icons } from '../icons';

interface FileWithUrl {
  name: string;
  getUrl: string;
  size: number;
  error?: boolean | undefined;
}

// Reducer action(s)
const addFilesToInput = () => ({
  type: 'ADD_FILES_TO_INPUT' as const,
  payload: [] as FileWithUrl[],
});

type Action = ReturnType<typeof addFilesToInput>;
type State = FileWithUrl[];

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const FileInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [input, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'ADD_FILES_TO_INPUT': {
        // do not allow more than 5 files to be uploaded at once
        if (state.length + action.payload.length > 10) {
          //   toast({
          //     title: 'Too many files',
          //     description: 'You can only upload a maximum of 5 files at a time.',
          //   });
          return state;
        }

        return [...state, ...action.payload];
      }

      // You could extend this, for example to allow removing files
    }
  }, []);

  const noInput = !preview;

  // handle drag events
  const handleDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is selected with click
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const valid = validateFileType(e.target.files[0]);
      if (!valid) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a valid file type.',
        });
        return;
      }
      setSelectedFile(e.target.files[0]);
    }
  };

  // triggers when file is dropped
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer);
    // validate file type
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter((file) => validateFileType(file));
      if (files.length !== validFiles.length) {
        toast({
          title: 'Invalid file type',
          description: 'Only image files are allowed.',
        });
      }

      if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }
      setSelectedFile(e.dataTransfer.files[0]);

      setDragActive(false);

      e.dataTransfer.clearData();
    }
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <label
      htmlFor={props.id}
      className={cn(
        'group relative h-full flex flex-col items-center justify-center w-full aspect-video border-2 border-slate-300 border-dashed rounded-lg dark:border-gray-600 transition',
        { 'border-slate-400 bg-slate-200': dragActive },
        { 'dark:border-slate-400 dark:bg-slate-800': dragActive },
        { 'h-fit aspect-auto': !noInput },
        { 'items-start justify-start': !noInput },
        { 'dark:hover:border-gray-500 dark:hover:bg-slate-800': noInput }
      )}
    >
      <div
        className={cn('relative w-full h-full flex flex-col items-center justify-center', {
          'items-start': !noInput,
        })}
      >
        {noInput ? (
          <>
            <div
              className="absolute inset-0 cursor-pointer"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />

            <UploadIcon className="w-10 h-10" />

            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-red-600">Click</span> or
              <span className="font-semibold text-red-600"> drag and drop</span> to upload image
            </p>

            <input
              {...props}
              ref={ref}
              multiple
              onChange={handleChange}
              accept="image/jpeg, image/jpg, image/png"
              id={props.id}
              type="file"
              className="hidden"
            />
          </>
        ) : (
          <AspectRatio ratio={16 / 9} className="w-full h-full">
            {preview && <Image src={preview} alt="thumbnail-preview-image" fill className="rounded-md object-cover" />}
          </AspectRatio>
        )}
      </div>
    </label>
  );
});
FileInput.displayName = 'FileInput';

export { FileInput };
