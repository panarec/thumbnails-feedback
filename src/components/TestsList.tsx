'use client';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { ArrowRightIcon, ChatBubbleIcon, HandIcon, TimerIcon } from '@radix-ui/react-icons';
import { Test } from '@prisma/client';

const TestsList = () => {
  const [data, setData] = useState<Test[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  try {
    useEffect(() => {
      fetch('/api/test/all')
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }, []);
  } catch (error) {
    console.error(error);
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
  } else if (data !== null) {
    return (
      <div className="grid grid-cols-5 gap-5 mb-10">
        {data.map((item) => (
          <Card key={item.id} className="shadow-sm">
            <CardHeader>
              <CardTitle>{item.test_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex flex-row gap-5">
                <span className="text-gray-500">
                  <HandIcon />
                  100
                </span>
                <span className="text-gray-500">
                  <ChatBubbleIcon />
                  100
                </span>
                <span className="text-gray-500">
                  <TimerIcon />
                  100
                </span>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link
                href={`/test/${item.id}`}
                className="text-primary flex flex-row justify-center items-center hover:scale-90 transition-all "
              >
                View test <ArrowRightIcon />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  return;
};
export default TestsList;
