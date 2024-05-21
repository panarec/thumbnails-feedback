import { AllTimeLeaderboardTable } from '@/components/AllTimeLeaderboardTable';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TypographyH1 } from '@/components/ui/h1';
import { Separator } from '@/components/ui/separator';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

const BlogPage = () => {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:px-32 mx-auto ">
      <div className="mt-10 flex flex-col items-center">
        <TypographyH1>Blog</TypographyH1>
      </div>
      <Separator />

      <div>
        <p className="text-center">
          Welcome to our blog! Here you will find the latest news about our platform, tutorials, and much more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        <Card>
          <CardHeader>
            <Image
              src="/How_to_Choose_the_Best_Thumbnail_for_Maximum_Views_on_YouTube.png"
              alt="audience looking at thumbnail"
              width={400}
              height={200}
              className="mb-2"
            />
            <CardTitle>How to Choose the Best Thumbnail for Maximum Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-sm font-sans">
              In this comprehensive guide to mastering YouTube, we explore how the right thumbnail can significantly
              boost viewer engagement and drive up video views.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Link
              href="/blog/how-to-choose-the-best-thumbnail-for-maximum-views"
              className="flex flex-row items-center gap-2"
            >
              Read More <ArrowRightIcon></ArrowRightIcon>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BlogPage;
