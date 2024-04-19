import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center  justify-center flex-col gap-5 min-h-full">
      <h1 className="text-3xl">Test Not Found</h1>
      <Link href="/dashboard" className={buttonVariants()}>
        Back to dashboard
      </Link>
    </div>
  );
}
