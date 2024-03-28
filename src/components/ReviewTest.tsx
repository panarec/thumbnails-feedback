'use client';

import { useReview } from '@/hooks/useReview';
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';

const ReviewTest = () => {
  const { review, error, isLoading } = useReview();

  console.log(review);  

  if (error) {
    return <div className="flex justify-center items-center">Something went wrong. Please try again later.</div>;
  }

  if (isLoading) {
    return <div>Is loading</div>;
  }

  if (review) {
    return (
      <div className="grid grid-cols-3">
        {review.thumbnails.map((thumbnail) => (
          <div key={thumbnail.id} className="flex flex-col gap-3">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={thumbnail.thumbnail_url}
                alt="thumbnail-preview-image"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
            <h3>{thumbnail.title}</h3>
          </div>
        ))}
      </div>
    );
  }

  if (!review) {
    return (
      <div className="w-full flex items-center gap-3 flex-col">
        <h3 className="text-4xl after:content-['\01F60E'] after:ml-2">No reviews needed</h3>
      </div>
    );
  }
};

export default ReviewTest;
