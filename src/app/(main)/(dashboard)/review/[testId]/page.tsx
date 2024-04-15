import DashboardTitle from '@/components/DashboardTitle';
import { ReviewForm } from '@/components/form/ReviewForm';
import { FC } from 'react';

interface ReviewPageProps {
  params: {
    testId: string;
  };
}

const ReviewPage: FC<ReviewPageProps> = ({ params }) => {
  return (
    <>
      <DashboardTitle customTitle="Review" />
      <ReviewForm />
    </>
  );
};

export default ReviewPage;
