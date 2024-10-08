import { ArrowRightIcon, ChatBubbleIcon, HandIcon, TimerIcon, TrashIcon } from '@radix-ui/react-icons';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './ui/card';
import { FC, useEffect, useState } from 'react';
import { TestWithCommentsIdsAndVotesIds } from '@/app/api/test/all/route';
import Link from 'next/link';
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';
import { differenceInDays, isFuture } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { getSession } from 'next-auth/react';
import { UpgradeButton } from './ui/UpgradeButton';

interface TestItemProps {
  test: TestWithCommentsIdsAndVotesIds;
  onDelete: (id: string) => void;
}

export const TestItem: FC<TestItemProps> = ({ test, onDelete }) => {
  const [votesCount, setVotesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const clientSession = getSession();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    clientSession.then((ses: any) => {
      setIsPremium(ses?.user.tier === 'premium');
    });
  }, [clientSession]);

  useEffect(() => {
    if (test) {
      const votes = test?.thumbnails?.map((item) => item.votes.length);
      const comments = test?.thumbnails?.map((item) => item.comments.length);
      setVotesCount(votes.flat().reduce((a, b) => a + b, 0));
      setCommentsCount(comments.flat().reduce((a, b) => a + b, 0));
      const isActive = isFuture(test.expiresAt);
      setIsActive(isActive);
    }
  }, [test]);

  return (
    <TooltipProvider delayDuration={500}>
      <Card
        key={test.id}
        className={`relative w-full h-full bg-white rounded-xl shadow-md transition-all hover:shadow-lg border-2 border-primary  ${
          isActive ? '' : 'opacity-40'
        }
        ${isHovered ? 'transform scale-105' : ''}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <div className="absolute top-5 right-5 bg-primary text-white rounded-full p-2 m-0 transition-all ease-in-out hover:cursor-pointer w-auto h-auto hover:scale-90">
                    <TrashIcon className="text-white w-5 h-5 " />
                  </div>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>

            {!isPremium ? (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Upgrade to premium</AlertDialogTitle>
                  <AlertDialogDescription>
                    You need to be a premium member to delete a test. Upgrade now to unlock this feature.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <UpgradeButton
                    successUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`}
                    cancelUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`}
                  >
                    Upgrade to premium
                  </UpgradeButton>
                </AlertDialogFooter>
              </AlertDialogContent>
            ) : (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your test and remove your data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(test.id)}>Yes</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        )}

        <CardHeader>
          <CardTitle className="break-words">{test.test_name}</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="grid grid-cols-2 gap-2 mb-5">
            <AspectRatio ratio={16 / 9} className="w-full h-full">
              <Image
                src={test.thumbnails[0].thumbnail_url}
                alt="thumbnail-preview-image"
                fill
                className="rounded-md object-cover shadow-md"
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="w-full h-full">
              <Image
                src={test.thumbnails[1].thumbnail_url}
                alt="thumbnail-preview-image"
                fill
                className="rounded-md object-cover shadow-md"
              />
            </AspectRatio>
          </div>
          <CardDescription className="flex flex-row justify-center gap-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-gray-500 flex flex-col items-center">
                  <HandIcon className="text-secondary" />
                  <span>{votesCount}</span>
                </span>
              </TooltipTrigger>
              <TooltipContent>Votes</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-gray-500 flex flex-col items-center">
                  <ChatBubbleIcon className="text-secondary" />
                  <span>{commentsCount}</span>
                </span>
              </TooltipTrigger>
              <TooltipContent>Comments</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-gray-500 flex flex-col items-center">
                  <TimerIcon className="text-secondary" />
                  <span>{Math.max(differenceInDays(test.expiresAt, new Date()) + 1, 0)}</span>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {isActive
                  ? `Remains active: ${differenceInDays(test.expiresAt, new Date()) + 1} day(s)`
                  : 'Test expired'}
              </TooltipContent>
            </Tooltip>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link
            href={`/dashboard/${test.id}`}
            className="text-primary flex flex-row justify-center w-full items-center hover:scale-90 transition-all "
          >
            See details <ArrowRightIcon />
          </Link>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};
