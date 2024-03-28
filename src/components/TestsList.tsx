'use client';
import { Skeleton } from './ui/skeleton';
import { useTests } from '@/hooks/useTests';
import { TestItem } from './TestItem';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

const TestsList = () => {
  const { tests, error, isLoading, mutate } = useTests();
  const handleDeleteItem = async (id: string) => {
    const newTests = tests?.filter((item) => item.id !== id);
    mutate(newTests, false);
    try {
      await fetch(`/api/test/${id}`, {
        method: 'DELETE',
      });
      mutate();
    } catch (error) {
      mutate(tests, false);
    }
  };

  if (error) {
    return <div className="flex justify-center items-center">Something went wrong. Please try again later. </div>;
  }

  if (isLoading) {
    return (
      <>
        <div className="flex flex-row gap-3">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[250px]" />
              <Skeleton className="h-3 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3 ">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
              <Skeleton className="h-3 w-[200px]" />
            </div>
          </div>
        </div>
      </>
    );
  } else if (tests?.length) {
    return (
      <div className="grid grid-cols-5 gap-5 mb-10">
        {tests.map((item) => (
          <TestItem key={item.id} test={item} onDelete={handleDeleteItem} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-center gap-3 flex-col">
        <h3 className="text-4xl flex justify-center items-center after:content-['\01F50D']  after:ml-2 ">
          No tests found
        </h3>
        <Link href="/new-test" className={buttonVariants()}>
          Let&apos;s create one!
        </Link>
      </div>
    );
  }
};
export default TestsList;
