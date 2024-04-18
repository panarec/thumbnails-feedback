'use client';

import { z } from 'zod';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import ImageUpload from '../ui/image-upload';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';
import { useEffect, useState } from 'react';
import { CreateTestResponse } from '@/app/api/test/route';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { UpgradeButton } from '../ui/UpgradeButton';
import { useRouter, useSearchParams } from 'next/navigation';

export const formSchema = z.object({
  testName: z.string().min(3, 'Test name must contain at least 3 character(s)').max(20, 'Test name must contain at most 20 character(s)'),
  testDuration: z.coerce.number().int().positive(),
  videoDescription: z.string().max(300, 'Video description must contain at most 300 character(s)').optional(),
  testItems: z.array(
    z.object({
      id: z.string(),
      videoName: z.string().min(3, 'Video name must contain at least 3 character(s)').max(50, 'Video name must contain at most 50 character(s)'),
      file: z.any().refine((files) => !!files, 'Image is required.'),
    })
  ),
});

const testItems = [
  {
    id: 'A.',
    videoName: '',
    file: '',
  },
  {
    id: 'B.',
    videoName: '',
    file: '',
  },
];

const NewTestForm = () => {
  const { toast } = useToast();
  const [createTestResponse, setCreateTestResponse] = useState<CreateTestResponse | null>(null);
  const [formreseted, setformreseted] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultFormValues = searchParams.get('params')
    ? JSON.parse(searchParams.get('params') || '')
    : {
        testName: '',
        testDuration: 7,
        videoDescription: '',
        testItems: testItems,
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  const watch = form.watch;

  useEffect(() => {
    setUrl(window.location.origin + window.location.pathname + window.location.search);
  }, [window.location.origin, window.location.pathname, window.location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    const subscription = watch((value, { name, type }) => {
      params.set('params', JSON.stringify(value));
      router.push(`/new-test?${params.toString()}`);
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
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

      const body: any = await response.json();

      if (body?.error) {
        console.log(body.error);
        setOpenDialog(true);
        return;
      }

      setCreateTestResponse(body);
    } catch (error) {
      console.log(error);
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
    setformreseted(true);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  <FormLabel>Test duration&#40;days&#41;:</FormLabel>
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
                formreseted={formreseted}
                setformreseted={setformreseted}
              />
            ))}
            <div className="sm:col-span-2">
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
      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <DialogContent>
          <DialogHeader className="gap-5">
            <DialogTitle className="text-5xl after:content-['\01F97A'] after:ml-2">Oooops</DialogTitle>
            <DialogDescription>
              It looks like you have reached the maximum number of tests for your tier. Please upgrade your account to
              create more tests.
            </DialogDescription>
          </DialogHeader>
          <UpgradeButton successUrl={url} cancelUrl={url}>
            I don&apos;t want limits anymore!
          </UpgradeButton>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewTestForm;
