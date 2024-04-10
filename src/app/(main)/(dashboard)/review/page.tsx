import DashboardTitle from '@/components/DashboardTitle';
import Reviews from '@/components/Reviews';

const ReviewPage = async () => {
  return (
    <div>
      <DashboardTitle customTitle="Review" />
      <Reviews />
    </div>
  );
};

export default ReviewPage;
