'use client';
import { buttonVariants } from '@/components/ui/button';
import { Loading } from '@/components/ui/graphics/Loading';
import { useActivate } from '@/hooks/useActivate';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ActivatePage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { data, error, isLoading } = useActivate({ token });

  if (isLoading) {
    return (
      <section className=" max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-center px-8 py-48 lg:py-60">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <div className="w-48 h-48">
            <Loading />
          </div>
          <div className="text-center w-full text-2xl">Loading...</div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-center px-8 py-48 lg:py-60">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <div className="min-h-full">Something went wrong. Please try again.</div>
        </div>
      </section>
    );
  }
  if (data.error) {
    return (
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-center px-8 py-48 lg:py-60">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <h1 className="text-3xl font-semibold">{data.error}</h1>
          <div className="w-full flex items-center justify-center">
            <Link href="/sign-in" className={buttonVariants()}>
              Sign in
            </Link>
          </div>
        </div>
      </section>
    );
  }
  if (data) {
    return (
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-center px-8 py-48 lg:py-60">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <div className="min-h-full">
            <h1 className="text-3xl font-semibold">Account activated</h1>
            <p>Your account has been activated. You can now sign in.</p>
          </div>
        </div>
      </section>
    );
  }
};

export default ActivatePage;
