import DashboardTitle from '@/components/DashboardTitle';
import NewTestForm from '@/components/form/NewTestForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Test',
};

const NewTestPage = async () => {
  return (
    <div>
      <DashboardTitle customTitle="New Test" />
      <NewTestForm />
    </div>
  );
};

export default NewTestPage;
