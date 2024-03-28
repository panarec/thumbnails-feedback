'use client';
import { FC } from 'react';
import DasboardLayout from '../../(dashboard)/layout';
import { useTestDetail } from '@/hooks/useTest';
import { Loading } from '@/components/ui/graphics/Loading';
import { ThumbnailItem } from '@/components/ThumbnailItem';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

interface TestPageProps {
  params: {
    testId: string;
  };
}

const TestPage: FC<TestPageProps> = ({ params }) => {
  const { test, error, isLoading } = useTestDetail(params.testId);

  if (isLoading)
    return (
      <DasboardLayout title="Loading...">
        <div className="flex flex-col h-full items-center justify-center">
          <div className="w-1/4">
            <Loading />
          </div>
          <span>Getting your best thumbnails...</span>
        </div>
      </DasboardLayout>
    );
  if (error) {
    return (
      <DasboardLayout title="Error">
        <div className="flex justify-center items-center">Something went wrong. Please try again later. </div>
      </DasboardLayout>
    );
  }
  if (test)
    return (
      <DasboardLayout title={test?.test_name}>
        <Link href="/dashboard" className="flex flex-row items-center mb-3">
          <ArrowLeftIcon />
          Back
        </Link>
        <div className="grid grid-cols-2 gap-5">
          {test.thumbnails.map((thumbnail) => (
            <ThumbnailItem key={thumbnail.id} thumbnail={thumbnail} />
          ))}
        </div>
      </DasboardLayout>
    );
};

export default TestPage;
