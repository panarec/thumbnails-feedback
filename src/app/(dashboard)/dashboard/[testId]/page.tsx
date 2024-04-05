'use client';
import { FC, useEffect, useState } from 'react';
import { useTestDetail } from '@/hooks/useTest';
import { Loading } from '@/components/ui/graphics/Loading';
import { ThumbnailItem } from '@/components/ThumbnailItem';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import DashboardTitle from '@/components/DashboardTitle';
import { add, format, isFuture } from 'date-fns';

interface TestPageProps {
  params: {
    testId: string;
  };
}

const TestPage: FC<TestPageProps> = ({ params }) => {
  const { test, error, isLoading } = useTestDetail(params.testId);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (test) {
      const isActive = isFuture(test.expiresAt);
      setIsActive(isActive);
    }
  }, [test]);

  if (isLoading)
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-1/4">
          <Loading />
        </div>
        <span>Getting your best thumbnails...</span>
      </div>
    );
  if (error) {
    return <div className="flex justify-center items-center">Something went wrong. Please try again later. </div>;
  }
  if (test)
    return (
      <>
        <DashboardTitle customTitle={test.test_name} />
        <div className="flex flex-row justify-between items-center mb-3">
          <Link href="/dashboard" className="flex flex-row items-center">
            <ArrowLeftIcon />
            Back
          </Link>
          <p className={`italic ${isActive ? 'text-green-600' : 'text-red-400'} text-xs`}>
            {isActive ? 'Active until: ' : 'Inactive from: '}
            {format(test.expiresAt, 'dd.MM.yyyy hh:mm aaa')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {test.thumbnails.map((thumbnail) => (
            <ThumbnailItem key={thumbnail.id} thumbnail={thumbnail} />
          ))}
        </div>
      </>
    );
};

export default TestPage;
