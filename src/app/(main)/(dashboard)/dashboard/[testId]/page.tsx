'use client';
import { FC, useEffect, useState } from 'react';
import { useTestDetail } from '@/hooks/useTest';
import { Loading } from '@/components/ui/graphics/Loading';
import { ThumbnailItem } from '@/components/ThumbnailItem';
import Link from 'next/link';
import { ArrowLeftIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import DashboardTitle from '@/components/DashboardTitle';
import { add, format, isFuture } from 'date-fns';
import { compareSync } from 'bcrypt';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import { UpgradeButton } from '@/components/ui/UpgradeButton';
import { getSession } from 'next-auth/react';

interface TestPageProps {
  params: {
    testId: string;
  };
}

const TestPage: FC<TestPageProps> = ({ params }) => {
  const { test, error, isLoading } = useTestDetail(params.testId);
  const [isActive, setIsActive] = useState(false);
  const [url, setUrl] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const clientSession = getSession();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    clientSession.then((ses: any) => {
      setIsPremium(ses?.user.tier === 'premium');
    });
  }, [clientSession]);

  useEffect(() => {
    if (test) {
      const isActive = isFuture(test.expiresAt);
      const votesCountTotal = test.thumbnails
        .map((item) => item.votes.length)
        .flat()
        .reduce((a, b) => a + b, 0);
      setIsActive(isActive);
    }
  }, [test]);

  useEffect(() => {
    setUrl(window.location.origin + window.location.pathname + window.location.search);
  }, [window.location.origin, window.location.pathname, window.location.search]);

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
          {test.thumbnails
            .map((item) => item.votes.length)
            .flat()
            .reduce((a, b) => a + b, 0) >= 5 && !isPremium ? (
            <div className="flex text-destructive items-center gap-1">
              <button onClick={() => setOpenDialog(true)}>*Max votes reached</button>
              <InfoCircledIcon />
            </div>
          ) : (
            <p className={`italic ${isActive ? 'text-green-600' : 'text-red-400'} text-xs`}>
              {isActive ? 'Active until: ' : 'Inactive from: '}
              {format(test.expiresAt, 'dd.MM.yyyy hh:mm aaa')}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {test.thumbnails.map((thumbnail) => (
            <ThumbnailItem key={thumbnail.id} thumbnail={thumbnail} />
          ))}
        </div>
        <Dialog onOpenChange={setOpenDialog} open={openDialog}>
          <DialogContent>
            <DialogHeader className="gap-5">
              <DialogTitle className="text-5xl after:content-['\01F97A'] after:ml-2">Oooops</DialogTitle>
              <DialogDescription>
                It looks like you have reached the maximum number of votes for your tier. Please upgrade your account to
                remove this limit.
              </DialogDescription>
            </DialogHeader>
            <UpgradeButton successUrl={url} cancelUrl={url}>
              I don&apos;t want limits anymore!
            </UpgradeButton>
          </DialogContent>
        </Dialog>
      </>
    );
};

export default TestPage;
