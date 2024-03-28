import DashboardTitle from '@/components/DashboardTitle';
import ReviewTest from '@/components/ReviewTest';

const ReviewPage = async () => {
  return (
    <div>
      <DashboardTitle customTitle="Review" />
      <ReviewTest />
    </div>
  );
};

export default ReviewPage;
