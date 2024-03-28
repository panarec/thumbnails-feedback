'use client';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { ArrowRightIcon, ChatBubbleIcon, HandIcon, TimerIcon } from '@radix-ui/react-icons';
import { useTests } from '@/hooks/useTests';
import { useEffect, useState } from 'react';
import { TestItem } from './TestItem';

const TestsList = () => {
  const { tests, error, isLoading } = useTests();

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
  } else if (tests) {
    return (
      <div className="grid grid-cols-5 gap-5 mb-10">
        {tests.map((item) => (
          <TestItem key={item.id} test={item} />
        ))}
      </div>
    );
  }
};
export default TestsList;
