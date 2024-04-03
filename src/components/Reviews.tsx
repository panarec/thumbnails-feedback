'use client';

import { useReviews } from '@/hooks/useReviews';
import { buttonVariants } from './ui/button';
import { useReview } from '@/hooks/useReview';
import Link from 'next/link';
import { Loading } from './ui/graphics/Loading';

const Reviews = () => {
  const { reviewsCount, error, isLoading } = useReviews();

  if (error) {
    return <div className="flex justify-center items-center">Something went wrong. Please try again later.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-1/4">
          <Loading />
        </div>
        <span>Loading...</span>
      </div>
    );
  }

  if (reviewsCount && reviewsCount.count > 0) {
    return (
      <div className="w-full flex items-center gap-3 flex-col">
        <h3 className="text-4xl after:content-['\01F680'] after:ml-2">
          <span className="text-primary">{reviewsCount.count}</span> reviews needed
        </h3>
        <Link href={`/review/${reviewsCount.firstReview.id}`} className={buttonVariants()}>
          Start review
        </Link>
      </div>
    );
  }

  if (reviewsCount?.count === 0 || !reviewsCount) {
    return (
      <div className="w-full flex items-center gap-3 flex-col">
        <h3 className="text-4xl after:content-['\01F60E'] after:ml-2">No reviews needed</h3>
      </div>
    );
  }
};

export default Reviews;
