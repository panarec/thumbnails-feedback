import { TestWithCommentsAndVotes } from '@/app/api/test/[testId]/route';
import Image from 'next/image';
import { FC } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { ChatBubbleIcon, HandIcon } from '@radix-ui/react-icons';
import { Separator } from './ui/separator';
import { Card, CardContent, CardHeader } from './ui/card';
import { formatDistanceToNow } from 'date-fns';
import { CircleUser } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider } from './ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

interface ThumbnailItemProps {
  thumbnail: TestWithCommentsAndVotes['thumbnails'][0];
}

export const ThumbnailItem: FC<ThumbnailItemProps> = ({ thumbnail }) => {
  return (
    <TooltipProvider delayDuration={500}>
      <div className="flex flex-col gap-3">
        <AspectRatio ratio={16 / 9} className="w-full h-full">
          <Image src={thumbnail.thumbnail_url} alt="thumbnail-preview-image" fill className="rounded-md object-cover" />
        </AspectRatio>
        <h2 className="text-xl">{thumbnail.title}</h2>
        <ul className="flex flex-row gap-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <li className="list-none text-2xl flex flex-row items-center gap-2">
                <HandIcon className="text-primary" />
                {thumbnail.votes.length}
              </li>
            </TooltipTrigger>
            <TooltipContent>Votes</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <li className="list-none text-2xl flex flex-row items-center gap-2">
                <ChatBubbleIcon className="text-primary" />
                {thumbnail.comments.length}
              </li>
            </TooltipTrigger>
            <TooltipContent>Comments</TooltipContent>
          </Tooltip>
        </ul>
        <Separator />
        {thumbnail.comments && thumbnail.comments.length > 0 && <h2>Comments:</h2>}
        {thumbnail.comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader className="flex flex-row items-center gap-2 ">
              <div>
                <CircleUser />
              </div>
              <div>
                <h3 className="text-sm text-primary">{comment.user.username}</h3>
                <h4 className="text-slate-300 text-xs italic">
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </h4>
              </div>
            </CardHeader>
            <CardContent>{comment.comment}</CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
};
