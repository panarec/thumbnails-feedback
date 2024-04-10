import { buttonVariants } from '@/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="p-10">
      <Link href="/" className={buttonVariants()}>
        <ArrowBigLeft className="w-6 h-6" />
        Back to home
      </Link>
      <h1 className="text-2xl my-3">Policy for Thumbnail Feedbacks</h1>
      <p className="text-md font-sans font-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum amet accusantium et minus, quo ad velit
        reprehenderit totam harum id. Quisquam quam, tempore assumenda fuga rerum aut. Odit, non earum!
      </p>
    </div>
  );
}
