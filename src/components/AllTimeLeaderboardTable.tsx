'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export const AllTimeLeaderboardTable = () => {
  const { data, error, isLoading } = useLeaderboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log('data', data);
  return (
    <Table className="m-auto mt-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipContent>
            <ul>
              <li>Comments * 3</li>
              <li>Votes * 1</li>
            </ul>
          </TooltipContent>
          <TableCaption className="text-xs">
            Points are calculated based on the number of comments and votes that users provide on the thumbnails of
            other.{' '}
            <TooltipTrigger>
              <InfoCircledIcon className="w-4 h-4 inline" />
            </TooltipTrigger>
          </TableCaption>
        </Tooltip>
      </TooltipProvider>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead> Name</TableHead>
          <TableHead className="text-right w-[100px] ">Comments</TableHead>
          <TableHead className="text-right w-[100px]">Votes</TableHead>
          <TableHead className="text-right w-[100px]">Points</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data &&
          data?.map((item: any, index: any) => {
            console.log('this is data', data);
            return (
              <TableRow key={item.id}>
                {index === 0 && (
                  <TableCell className="font-medium">
                    <span className="text-3xl">🥇</span>
                  </TableCell>
                )}
                {index === 1 && (
                  <TableCell className="font-medium">
                    <span className="text-3xl">🥈</span>
                  </TableCell>
                )}
                {index === 2 && (
                  <TableCell className="font-medium">
                    <span className="text-3xl">🥉</span>
                  </TableCell>
                )}
                {index > 2 && <TableCell className="text-xl pl-6">{index + 1}</TableCell>}
                <TableCell>{item.username}</TableCell>
                <TableCell className="text-right">{item._count.comments}</TableCell>
                <TableCell className="text-right">{item._count.votes}</TableCell>
                <TableCell className="text-right">{item._count.comments * 3 + item._count.votes}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
