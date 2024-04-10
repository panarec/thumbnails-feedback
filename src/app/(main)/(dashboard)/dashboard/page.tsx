import DashboardTitle from '@/components/DashboardTitle';
import TestsList from '@/components/TestsList';

const DashboardPage = async () => {
  return (
    <>
      <DashboardTitle customTitle="Dashboard" />
      <TestsList />
    </>
  );
};

export default DashboardPage;
