'use client';

import { FC } from 'react';
import { FileInput } from '@/components/ui/file-input';
import { Input } from '@/components/ui/input';
import { TypographyH3 } from '@/components/ui/h3';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface TestUploadSectionProps {
  id: string;
  form: any;
  videoName: string;
  index: number;
}

const TestUploadSection: FC<TestUploadSectionProps> = ({ id, form, videoName, index }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center">
        <TypographyH3>{id}</TypographyH3>
      </div>
      <FileInput />
      <FormField
        control={form.control}
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

export default TestUploadSection;
