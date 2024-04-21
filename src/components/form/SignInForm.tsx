'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (searchParams.get('email')) {
      form.setValue('email', searchParams.get('email') as string);
    }
    if (searchParams.get('success')) {
      toast({
        title: 'Account created successfully.',
        description:
          'Please, chceck your email to verify your account. If you did not receive an email, please check your spam folder.',
        variant: 'success',
      });
    }
  }, []);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const signedIn = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (signedIn?.status !== 200) {
      toast({
        title: 'Error',
        description: signedIn?.error || 'An error occurred',
        variant: 'destructive',
      });
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  p-10 bg-blue-50 rounded-md">
        <div className="pb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        }
        <p className="text-center text-sm text-gray-600 mt-2">
          Don&apos;t have an account?&nbsp;
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
