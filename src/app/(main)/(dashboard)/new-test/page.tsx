import DashboardTitle from '@/components/DashboardTitle';
import NewTestForm from '@/components/form/NewTestForm';

const NewTestPage = async () => {
  return (
    <div>
      <DashboardTitle customTitle="New Test" />
      <NewTestForm />
    </div>
  );
};

export default NewTestPage;
