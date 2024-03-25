'use client';

import { z } from 'zod';
import TestUploadSection from '../TestUploadSection';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { TypographyH3 } from '../ui/h3';
import { FileInput } from '../ui/file-input';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  testName: z.string().min(1).max(100),
  testDuration: z.coerce.number().int().positive(),
  videoDescription: z.string().max(300).optional(),
  testItems: z.array(
    z.object({
      id: z.string(),
      videoName: z.string(),
    })
  ),
});

const testItems = [
  {
    id: 'A.',
    videoName: '',
  },
  {
    id: 'B.',
    videoName: '',
  },
];

const NewTestForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testName: '',
      testDuration: 1,
      videoDescription: '',
      testItems: testItems,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="testName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test name:</FormLabel>
                <FormControl>
                  <Input placeholder="Name for this test unit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="testDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test duration:</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Duration in days" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {testItems.map((item, index) => (
            <div className="flex flex-col gap-3" key={item.id}>
              <div className="flex justify-center">
                <TypographyH3>{item.id}</TypographyH3>
              </div>
              <FileInput id={item.id} />
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
          ))}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="videoDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video description:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe content of this video" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <Button type="submit" className="my-5">
            Create test
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewTestForm;
