'use client';

import { Loading } from './ui/graphics/Loading';
import { ReviewForm } from './form/ReviewForm';
import { useReviews } from '@/hooks/useReviews';

const Reviews = () => {
  const { reviews, error, isLoading } = useReviews();

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
  if (reviews && reviews?.length > 0) {
    return <ReviewForm />;
  } else {
    return (
      <div className="w-full flex items-center gap-3 flex-col">
        <h3 className="sm:text-4xl after:content-['\01F60E'] after:ml-2">No reviews needed</h3>
      </div>
    );
  }
};

export default Reviews;
