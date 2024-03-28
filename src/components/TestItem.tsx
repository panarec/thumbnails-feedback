import { ArrowRightIcon, ChatBubbleIcon, HandIcon, TimerIcon, TrashIcon } from '@radix-ui/react-icons';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './ui/card';
import { FC, use, useEffect, useState } from 'react';
import { TestWithCommentsIdsAndVotesIds } from '@/app/api/test/all/route';
import Link from 'next/link';
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';
import { Button } from './ui/button';
import { useSWRConfig } from 'swr';

interface TestItemProps {
  test: TestWithCommentsIdsAndVotesIds;
  onDelete: (id: string) => void;
}

export const TestItem: FC<TestItemProps> = ({ test, onDelete }) => {
  const [votesCount, setVotesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (test) {
      const votes = test?.thumbnails?.map((item) => item.votes.length);
      const comments = test?.thumbnails?.map((item) => item.comments.length);
      setVotesCount(votes.flat().reduce((a, b) => a + b, 0));
      setCommentsCount(comments.flat().reduce((a, b) => a + b, 0));
    }
  }, [test]);


  return (
    <Card
      key={test.id}
      className="shadow-sm relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <Button
          className="bg-transparent absolute right-5 top-5 hover:bg-red-100 rounded-full p-2 m-0 transition-all hover:cursor-pointer w-auto h-auto"
          onClick={() => onDelete(test.id)}
        >
          <TrashIcon className="text-destructive  w-5 h-5 " />
        </Button>
      )}
      <CardHeader>
        <CardTitle>{test.test_name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 mb-5">
          <AspectRatio ratio={16 / 9} className="w-full h-full">
            <Image
              src={test.thumbnails[0].thumbnail_url}
              alt="thumbnail-preview-image"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
          <AspectRatio ratio={16 / 9} className="w-full h-full">
            <Image
              src={test.thumbnails[1].thumbnail_url}
              alt="thumbnail-preview-image"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <CardDescription className="flex flex-row justify-center gap-5">
          <span className="text-gray-500 flex flex-col items-center">
            <HandIcon className="text-secondary" />
            <span>{votesCount}</span>
          </span>
          <span className="text-gray-500 flex flex-col items-center">
            <ChatBubbleIcon className="text-secondary" />
            <span>{commentsCount}</span>
          </span>
          <span className="text-gray-500 flex flex-col items-center">
            <TimerIcon className="text-secondary" />
            <span>{test.test_duration}</span>
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href={`/test/${test.id}`}
          className="text-primary flex flex-row justify-center w-full items-center hover:scale-90 transition-all "
        >
          View test <ArrowRightIcon />
        </Link>
      </CardFooter>
    </Card>
  );
};
