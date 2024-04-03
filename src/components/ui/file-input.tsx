'use client';

import { forwardRef, useState, type ChangeEvent, type DragEvent, useEffect } from 'react';
import { cn, validateFileType } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { AspectRatio } from './aspect-ratio';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { useFormContext } from 'react-hook-form';
import { MAX_FILE_SIZE } from '@/config/image';
import { get } from 'http';

interface FileWithUrl {
  name: string;
  getUrl: string;
  size: number;
  error?: boolean | undefined;
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  control?: any;
  index?: number;
}

const FileInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const { formState, setValue, control, getFieldState, resetField } = useFormContext();

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
          variant: 'destructive',
        });

        return;
      }
      const onlyOneFile = e.target.files.length === 1;
      if (!onlyOneFile) {
        toast({
          title: 'Invalid file count',
          description: 'Please upload only one file.',
          variant: 'destructive',
        });

        return;
      }
      if (e.target.files[0].size > MAX_FILE_SIZE) {
        toast({
          title: 'File too large',
          description: 'Please upload a file smaller than 2MB.',
          variant: 'destructive',
        });
        resetField(`testItems.${props.index}.file`);
        return;
      }
      setValue(`testItems.${props.index}.file`, e.target.files[0]);

      setSelectedFile(e.target.files[0]);
    }
  };

  // triggers when file is dropped
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    // validate file type
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter((file) => validateFileType(file));
      if (validFiles.length === 0) {
        toast({
          title: 'Invalid file type',
          description: 'Only image files are allowed.',
          variant: 'destructive',
        });
        return;
      }
      const onlyOneFile = e.dataTransfer.files.length === 1;
      if (!onlyOneFile) {
        toast({
          title: 'Invalid file count',
          description: 'Please upload only one file.',
          variant: 'destructive',
        });
        return;
      }
      if (files[0].size > MAX_FILE_SIZE) {
        toast({
          title: 'File too large',
          description: 'Please upload a file smaller than 2MB.',
          variant: 'destructive',
        });
        return;
      }

      if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }
      setSelectedFile(e.dataTransfer.files[0]);
      setValue(`testItems.${props.index}.file`, e.dataTransfer.files[0]);

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
  }, [selectedFile, formState]);

  useEffect(() => {
    if (Object.keys(formState.dirtyFields).length === 0) {
      setPreview(undefined);
      selectedFile && setSelectedFile(undefined);
    }
  }, [formState]);

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
              <span className="font-semibold text-primary">Click</span> or
              <span className="font-semibold text-primary"> drag and drop</span> to upload image &#40;2MB&#41;
            </p>

            <FormField
              control={control}
              name={`testItems.${props.index}.file`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...props}
                      ref={ref}
                      onChange={handleChange}
                      accept="image/jpeg, image/jpg, image/png"
                      id={props.id}
                      type="file"
                      className="hidden"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <AspectRatio ratio={16 / 9} className="w-full h-full">
            {preview && <Image src={preview} alt="thumbnail-preview-image" fill className="rounded-md object-cover" />}
            <div
              className="absolute inset-0 cursor-pointer"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
            <FormField
              control={control}
              name={`testItems.${props.index}.file`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...props}
                      ref={ref}
                      onChange={handleChange}
                      accept="image/jpeg, image/jpg, image/png"
                      id={props.id}
                      type="file"
                      className="hidden"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AspectRatio>
        )}
      </div>
    </label>
  );
});
FileInput.displayName = 'FileInput';

export { FileInput };
