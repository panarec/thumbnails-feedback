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

export const formSchema = z.object({
  testName: z.string().min(1).max(100),
  testDuration: z.coerce.number().int().positive(),
  videoDescription: z.string().max(300).optional(),
  testItems: z.array(
    z.object({
      id: z.string(),
      videoName: z.string(),
      fileName: z.string(),
      file: z.any(),
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
    try {
      const filesUploadPromise = data.testItems.map(async (item) => {
        const { error, getUrl } = await s3Upload(item.file);

        if (error) {
          return;
        }

        item.file = getUrl;
      });

      await Promise.all(filesUploadPromise);

      fetch('/api/test', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          testItems: data.testItems.map((item) => ({
            videoName: item.videoName,
            file: item.file,
          })),
        }),
      });
    } catch (error) {
      console.error(error);
    }
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
            <ImageUpload id={item.id} index={index} key={index} />
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
        <div className="flex flex-row gap-3">
          <Button type="submit" className="my-5" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Creating...' : 'Create'}
          </Button>
          <Button type="button" className="my-5 bg-red-500" onClick={() => form.reset()}>
            Discard
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewTestForm;
