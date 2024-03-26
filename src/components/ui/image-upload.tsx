'use client';
import { TypographyH3 } from './h3';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { useFormContext } from 'react-hook-form';
import { FC } from 'react';
import { FileInput } from './file-input';

interface ImageUploadProps {
  id: string;
  index: number;
}

const ImageUpload: FC<ImageUploadProps> = ({ id, index }) => {
  const context = useFormContext();

  return (
    <div className="flex flex-col gap-3" key={id}>
      <div className="flex justify-center">
        <TypographyH3>{id}</TypographyH3>
      </div>
      <FileInput id={id} index={index} />
      <FormField
        control={context.control}
        name={`testItems.${index}.videoName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Video title:</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Video title for this thumbnail" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ImageUpload;
