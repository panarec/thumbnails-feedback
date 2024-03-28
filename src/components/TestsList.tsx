'use client';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { ArrowRightIcon, ChatBubbleIcon, HandIcon, TimerIcon } from '@radix-ui/react-icons';
import { useTests } from '@/hooks/useTests';
import { useEffect, useState } from 'react';

const TestsList = () => {
  const { tests, error, isLoading } = useTests();
  const [votesCount, setVotesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    if (tests) {
      const votes = tests.map((item) => item?.thumbnails?.map((item) => item.votes.length));
      const comments = tests.map((item) => item?.thumbnails?.map((item) => item.comments.length));
      setVotesCount(votes.flat().reduce((a, b) => a + b, 0));
      setCommentsCount(comments.flat().reduce((a, b) => a + b, 0));
    }
  }, [tests]);

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
    console.log(tests);
    return (
      <div className="grid grid-cols-5 gap-5 mb-10">
        {tests.map((item) => (
          <Card key={item.id} className="shadow-sm">
            <CardHeader>
              <CardTitle>{item.test_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex flex-row gap-5">
                <span className="text-gray-500 flex flex-col items-center">
                  <HandIcon className='text-secondary' />
                  <span>{votesCount}</span>
                </span>
                <span className="text-gray-500 flex flex-col items-center">
                  <ChatBubbleIcon  className='text-secondary'  />
                  <span>{commentsCount}</span>
                </span>
                <span className="text-gray-500 flex flex-col items-center">
                  <TimerIcon  className='text-secondary'  />
                  <span>{item.test_duration}</span>
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
};
export default TestsList;
