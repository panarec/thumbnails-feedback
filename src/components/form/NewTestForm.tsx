'use client';

import { z } from 'zod';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import ImageUpload from '../ui/image-upload';
import { useS3Upload } from '@/hooks/use-s3-upload';
import Link from 'next/link';
import { toast, useToast } from '../ui/use-toast';
import { useState } from 'react';
import { Test } from '@prisma/client';
import { CreateTestResponse } from '@/app/api/test/route';

export const formSchema = z.object({
  testName: z.string().min(3, 'Test name must contain at least 3 character(s)').max(100),
  testDuration: z.coerce.number().int().positive(),
  videoDescription: z.string().max(300).optional(),
  testItems: z.array(
    z.object({
      id: z.string(),
      videoName: z.string().min(3, 'Video name must contain at least 3 character(s)').max(100),
      fileName: z.string(),
      file: z.any().refine((files) => !!files, 'Image is required.'),
    })
  ),
});

const testItems = [
  {
    id: 'A.',
    videoName: '',
    fileName: '',
    file: '',
  },
  {
    id: 'B.',
    videoName: '',
    fileName: '',
    file: '',
  },
];

const NewTestForm = () => {
  const { s3Upload } = useS3Upload();
  const { toast } = useToast();
  const [createTestResponse, setCreateTestResponse] = useState<CreateTestResponse | null>(null);
  const [formReseted, setFormReseted] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testName: '',
      testDuration: 7,
      videoDescription: '',
      testItems: testItems,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const filesUploadPromise = data.testItems.map(async (item) => {
        const { error, getUrl } = await s3Upload(item.file);

        if (error) {
          throw new Error('Failed to upload file');
        }

        item.file = getUrl;
      });

      await Promise.all(filesUploadPromise);

      const response = await fetch(`/api/test`, {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          testItems: data.testItems.map((item) => ({
            videoName: item.videoName,
            file: item.file,
          })),
        }),
      });

      if (!response.ok) {
        toast({
          title: 'Failed to create test',
          description: 'Please try again later.',
          variant: 'destructive',
        });
        throw new Error('Failed to create test');
      }

      const responseData = (await response.json()) as CreateTestResponse;
      setCreateTestResponse(responseData);
    } catch (error) {
      throw new Error('Failed to create test');
    }
  };

  if (form.formState.isSubmitSuccessful && createTestResponse) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-center">
          Test&nbsp;
          <Link href={`/dashboard/${createTestResponse.id}`} className="text-primary hover:underline">
            &quot;{createTestResponse?.test_name}&quot;
          </Link>
          &nbsp;has been created successfully!
        </h1>
        <p className="text-lg text-center">You can now add more tests or review existing ones.</p>
        <div className="flex flex-row gap-3">
          <Button className="mt-5" onClick={() => form.reset()}>
            Create another test
          </Button>
          <Link href="/dashboard">
            <Button className="mt-5" variant="outline">
              Go to dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const discardForm = () => {
    form.reset();
    setFormReseted(true);
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
            <ImageUpload
              id={item.id}
              index={index}
              key={index}
              formReseted={formReseted}
              setFormReseted={setFormReseted}
            />
          ))}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="videoDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video description &#40;optional&#41;:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe content of this video" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Button type="submit" className="my-5 bg-primary" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Creating...' : 'Create'}
          </Button>
          <Button
            type="button"
            className="my-5"
            variant="outline"
            onClick={discardForm}
            disabled={form.formState.isSubmitting}
          >
            Discard
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewTestForm;
