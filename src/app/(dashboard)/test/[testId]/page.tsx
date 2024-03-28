'use client';
import { FC } from 'react';
import { useTestDetail } from '@/hooks/useTest';
import { Loading } from '@/components/ui/graphics/Loading';
import { ThumbnailItem } from '@/components/ThumbnailItem';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import DashboardTitle from '@/components/DashboardTitle';

interface TestPageProps {
  params: {
    testId: string;
  };
}

const TestPage: FC<TestPageProps> = ({ params }) => {
  const { test, error, isLoading } = useTestDetail(params.testId);

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
        <Link href="/dashboard" className="flex flex-row items-center mb-3">
          <ArrowLeftIcon />
          Back
        </Link>
        <div className="grid grid-cols-2 gap-5">
          {test.thumbnails.map((thumbnail) => (
            <ThumbnailItem key={thumbnail.id} thumbnail={thumbnail} />
          ))}
        </div>
      </>
    );
};

export default TestPage;
