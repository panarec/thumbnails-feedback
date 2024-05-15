import { AllTimeLeaderboardTable } from '@/components/AllTimeLeaderboardTable';
import { TypographyH1 } from '@/components/ui/h1';
import { Separator } from '@/components/ui/separator';

const LeaderboardPage = () => {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:px-10 mx-auto max-w-[900px] ">
      <div className="mt-10 flex flex-col items-center">
        <TypographyH1>Leaderboard</TypographyH1>
      </div>
      <Separator />

      <div>
        <p className="text-center">
          We value your contribution to the community! Here are the top 10 contributors of all time. Give them a round
          of applause 👏
        </p>
      </div>

      <div className="w-full flex flex-col items-center">
        <AllTimeLeaderboardTable />
      </div>
    </div>
  );
};

export default LeaderboardPage;
