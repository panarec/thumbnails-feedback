import { TestWithCommentsAndVotes } from '@/app/api/test/[testId]/route';
import { Thumbnail } from '@prisma/client';
import Image from 'next/image';
import { FC } from 'react';
import { AspectRatio } from './ui/aspect-ratio';

interface ThumbnailItemProps {
  thumbnail: TestWithCommentsAndVotes['thumbnails'][0];
}

export const ThumbnailItem: FC<ThumbnailItemProps> = ({ thumbnail }) => {
  return (
    <div className="flex flex-col gap-3">
      <AspectRatio ratio={16 / 9} className="w-full h-full">
        <Image src={thumbnail.thumbnail_url} alt="thumbnail-preview-image" fill className="rounded-md object-cover" />
      </AspectRatio>
      <h2 className="text-xl">{thumbnail.title}</h2>
      <span className="w-full border-b-2" />
      <h2 className="text-2xl">Votes: {thumbnail.votes.length}</h2>
      <h2>Comments: {thumbnail.comments.length}</h2>
      <ul>
        {thumbnail.comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>{comment.createdAt.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
