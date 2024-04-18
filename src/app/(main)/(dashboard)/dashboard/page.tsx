import DashboardTitle from '@/components/DashboardTitle';
import TestsList from '@/components/TestsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = async () => {
  return (
    <>
      <DashboardTitle customTitle="Dashboard" />
      <TestsList />
    </>
  );
};

export default DashboardPage;
