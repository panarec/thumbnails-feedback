import TestUploadSection from '@/components/TestUploadSection';
import NewTestForm from '@/components/form/NewTestForm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const NewTestPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/sign-in');
  }
  return (
    <div>
      <NewTestForm />
    </div>
  );
};

export default NewTestPage;
