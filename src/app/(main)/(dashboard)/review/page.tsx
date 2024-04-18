import DashboardTitle from '@/components/DashboardTitle';
import Reviews from '@/components/Reviews';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Review',
};

const ReviewPage = async () => {
  return (
    <div>
      <DashboardTitle customTitle="Review" />
      <Reviews />
    </div>
  );
};

export default ReviewPage;
