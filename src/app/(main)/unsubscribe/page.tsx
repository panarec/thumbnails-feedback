'use client';
import { Loading } from '@/components/ui/graphics/Loading';
import { useUnsubscribe } from '@/hooks/useUnsubscribe';
import { useSearchParams } from 'next/navigation';

const ActivatePage = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get('user');
  const { data, error, isLoading } = useUnsubscribe({ user });

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
  if (data) {
    return (
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-center px-8 py-48 lg:py-60">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <div className="min-h-full">
            <h1 className="text-3xl font-semibold">Unsubscribed</h1>
            <p>You have been successfully unsubscribed from our emails.</p>
          </div>
        </div>
      </section>
    );
  }
};

export default ActivatePage;
