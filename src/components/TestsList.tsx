'use client';
import { Skeleton } from './ui/skeleton';
import { useTests } from '@/hooks/useTests';
import { TestItem } from './TestItem';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { isFuture } from 'date-fns';

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
        <div className="flex flex-row gap-3 flex-wrap">
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
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Active">Active</TabsTrigger>
          <TabsTrigger value="Inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="All">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {tests.map((item) => (
              <TestItem key={item.id} test={item} onDelete={handleDeleteItem} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Active">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {tests
              .filter((item) => isFuture(item.expiresAt))
              .map((item) => (
                <TestItem key={item.id} test={item} onDelete={handleDeleteItem} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="Inactive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {tests
              .filter((item) => !isFuture(item.expiresAt))
              .map((item) => (
                <TestItem key={item.id} test={item} onDelete={handleDeleteItem} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    );
  } else {
    return (
      <div className="w-full flex items-center gap-3 flex-col">
        <h3 className=" text-xl sm:text-4xl flex justify-center items-center after:content-['\01F50D']  after:ml-2 ">
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
